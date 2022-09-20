<script setup lang="ts">
import { onMounted, ref } from 'vue'

import {
  loadingController,
  InfiniteScrollCustomEvent,
  IonAvatar,
  IonBadge,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonToolbar,
} from '@ionic/vue'

import { Movie } from '@/interfaces/Movie'
import { ApiResult } from '@/interfaces/ApiResult'

const baseUrl = import.meta.env.VITE_BASE_URL as string
const apiKey = import.meta.env.VITE_API_KEY as string
const imageUrl = import.meta.env.VITE_IMAGES_URL as string

const getTopRatedMovies = async (page: number) => {
  const res = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`)
  const data: ApiResult = await res.json()
  return data
}

const movies = ref<Array<Movie>>()
const currentPage = ref(1)

onMounted(async () => {
  const data = await getTopRatedMovies(currentPage.value)
  movies.value = [...data.results]
})

async function loadMovies(event?: InfiniteScrollCustomEvent) {
  const loading = await loadingController.create({
    message: 'Loading...',
    spinner: 'bubbles',
  })

  await loading.present()

  const data = await getTopRatedMovies(currentPage.value)

  if (data) {
    loading.dismiss()
    movies.value?.push(...data.results)
    // complete the loading from infinite scroll
    event?.target.complete()
    // disable infinite scroll when we get to the last page
    if (event) {
      event.target.disabled = data.total_pages === currentPage.value
    }
  }
}

function loadMore(event: InfiniteScrollCustomEvent) {
  currentPage.value++
  loadMovies(event)
}
</script>

<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Trending Movies</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content :scroll-events="true">
    <ion-list>
      <ion-item button v-for="movie in movies" :href="`/movie/${movie.id}`">
        <ion-avatar slot="start">
          <img :src="imageUrl + '/w92/' + movie.poster_path" />
        </ion-avatar>
        <ion-label
          >{{ movie.title }}
          <p>{{ movie.release_date }}</p>
        </ion-label>

        <!-- slot = placement -->
        <ion-badge slot="end">{{ movie.vote_average }}</ion-badge>
      </ion-item>
    </ion-list>

    <ion-infinite-scroll @ionInfinite="loadMore($event)">
      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading..."></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </ion-content>
</template>

<style scoped></style>

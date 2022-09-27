<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonToolbar,
} from '@ionic/vue'
import { calendarOutline, cashOutline } from 'ionicons/icons'

import { Movie } from '../interfaces/Movie'

const baseUrl = import.meta.env.VITE_BASE_URL as string
const apiKey = import.meta.env.VITE_API_KEY as string
const imageUrl = import.meta.env.VITE_IMAGES_URL as string

const getMovieDetails = async (id: string) => {
  const res = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`)
  const data: Movie = await res.json()

  return data
}

const movie = ref<Movie>()
const route = useRoute()

onMounted(async () => {
  const data = await getMovieDetails(route.params.id as string)
  console.log('🚀 ~ file: MovieDetails.vue ~ line 42 ~ onMounted ~ data', data)

  movie.value = data
})

const budget = computed(() => {
  if (movie.value?.budget) {
    return new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      style: 'currency',
    }).format(movie.value.budget)
  }
  return movie.value?.budget
})

const releaseDate = computed(() => {
  if (movie.value) {
    return new Date(movie.value.release_date).toLocaleDateString('pt-BR')
  }
})

function openHomePage() {
  window.open(movie.value?.homepage)
}
</script>

<template>
  <ion-header>
    <ion-toolbar color="success">
      <ion-title>{{ movie?.title }}</ion-title>
      <ion-buttons slot="start">
        <!--! WTF IS THIS SHIT IONIC -->
        <ion-back-button default-href="/home"></ion-back-button>
        <ion-button router-link="/home">Back</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content full-screen="true">
    <ion-card v-if="movie">
      <img :src="imageUrl + '/w400/' + movie.poster_path" />

      <ion-card-header>
        <ion-card-title>{{ movie.title }}</ion-card-title>
        <ion-card-subtitle>{{ movie.tagline }}</ion-card-subtitle>
        <ion-text color="tertiary">
          <span v-for="genre in movie.genres">{{ genre.name }} {{ ' ' }}</span>
        </ion-text>
      </ion-card-header>

      <ion-card-content>
        <ion-label color="medium">{{ movie.overview }}</ion-label>

        <ion-item lines="none">
          <ion-icon :icon="calendarOutline" slot="start"></ion-icon>
          <ion-label>{{ releaseDate }}</ion-label>
        </ion-item>

        <ion-item lines="none">
          <ion-icon :icon="cashOutline" slot="start"></ion-icon>
          <ion-label>{{ budget }}</ion-label>
        </ion-item>
      </ion-card-content>
    </ion-card>
  </ion-content>

  <ion-footer v-if="movie?.homepage">
    <ion-button expand="full" @click="openHomePage()">Open HomePage</ion-button>
  </ion-footer>
</template>

<style scoped></style>

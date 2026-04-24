<script setup lang="ts">
import MovieCard from './MovieCard.vue'
import type { OmdbSearchItem } from '@/types/omdb'

defineProps<{
  movies: OmdbSearchItem[]
}>()
</script>

<template>
  <div class="grid">
    <MovieCard
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      class="grid-item"
    />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--space-lg);
}

.grid-item {
  animation: fade-up 0.4s var(--ease-out) both;
}

.grid-item:nth-child(1) { animation-delay: 0s; }
.grid-item:nth-child(2) { animation-delay: 0.04s; }
.grid-item:nth-child(3) { animation-delay: 0.08s; }
.grid-item:nth-child(4) { animation-delay: 0.12s; }
.grid-item:nth-child(5) { animation-delay: 0.16s; }
.grid-item:nth-child(6) { animation-delay: 0.2s; }
.grid-item:nth-child(7) { animation-delay: 0.24s; }
.grid-item:nth-child(8) { animation-delay: 0.28s; }
.grid-item:nth-child(9) { animation-delay: 0.32s; }
.grid-item:nth-child(10) { animation-delay: 0.36s; }

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

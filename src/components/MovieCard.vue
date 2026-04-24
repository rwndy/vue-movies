<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { OmdbSearchItem } from '@/types/omdb'

defineProps<{
  movie: OmdbSearchItem
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'movie-detail', params: { id: movie.imdbID } }"
    class="card"
  >
    <div class="card-poster">
      <img
        v-if="movie.Poster !== 'N/A'"
        :src="movie.Poster"
        :alt="movie.Title"
        class="card-image"
        loading="lazy"
      />
      <div v-else class="card-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
      <div class="card-overlay"></div>
    </div>
    <div class="card-info">
      <h3 class="card-title">{{ movie.Title }}</h3>
      <span class="card-year">{{ movie.Year }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  text-decoration: none;
  color: var(--color-text);
  box-shadow: var(--card-shadow);
  transition:
    transform var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out),
    border-color var(--duration-normal) var(--ease-out);
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--color-accent-soft);
}

.card:hover .card-overlay {
  opacity: 1;
}

.card-poster {
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: var(--color-background-mute);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-normal) var(--ease-out);
}

.card:hover .card-image {
  transform: scale(1.04);
}

.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}

.card-placeholder svg {
  width: 48px;
  height: 48px;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-out);
  pointer-events: none;
}

.card-info {
  padding: var(--space-md);
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-year {
  display: inline-block;
  margin-top: var(--space-xs);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}
</style>

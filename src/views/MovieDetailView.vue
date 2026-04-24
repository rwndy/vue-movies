<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  id: string
}>()

const store = useMoviesStore()

onMounted(() => store.fetchMovieDetail(props.id))
onUnmounted(() => store.clearDetail())
watch(() => props.id, (newId) => store.fetchMovieDetail(newId))

const posterUrl = (imdbId: string) =>
  `${import.meta.env.VITE_BASE_URL_POSTER}?apikey=${import.meta.env.VITE_API_KEY_OMDB}&i=${imdbId}`
</script>

<template>
  <main class="detail">
    <RouterLink to="/" class="back-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m15 18-6-6 6-6" />
      </svg>
      Back to search
    </RouterLink>

    <LoadingSpinner v-if="store.loadingDetail" />

    <ErrorMessage
      v-else-if="store.error"
      :message="store.error"
      @retry="store.fetchMovieDetail(id)"
    />

    <article v-else-if="store.currentMovie" class="movie">
      <div class="movie-poster">
        <img
          v-if="store.currentMovie.Poster !== 'N/A'"
          :src="posterUrl(store.currentMovie.imdbID)"
          :alt="store.currentMovie.Title"
          class="poster-image"
          @error="($event.target as HTMLImageElement).src = store.currentMovie!.Poster"
        />
        <div v-else class="poster-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="2" width="20" height="20" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
      </div>

      <div class="movie-content">
        <header class="movie-header">
          <h1 class="movie-title">{{ store.currentMovie.Title }}</h1>
          <div class="movie-meta">
            <span v-if="store.currentMovie.Year">{{ store.currentMovie.Year }}</span>
            <span v-if="store.currentMovie.Rated" class="meta-badge">{{ store.currentMovie.Rated }}</span>
            <span v-if="store.currentMovie.Runtime">{{ store.currentMovie.Runtime }}</span>
          </div>
        </header>

        <div v-if="store.currentMovie.Genre" class="genre-tags">
          <span
            v-for="genre in store.currentMovie.Genre.split(', ')"
            :key="genre"
            class="genre-tag"
          >
            {{ genre }}
          </span>
        </div>

        <div v-if="store.currentMovie.Ratings.length" class="ratings">
          <div
            v-for="rating in store.currentMovie.Ratings"
            :key="rating.Source"
            class="rating"
          >
            <span class="rating-value">{{ rating.Value }}</span>
            <span class="rating-source">{{ rating.Source }}</span>
          </div>
        </div>

        <p v-if="store.currentMovie.Plot" class="movie-plot">{{ store.currentMovie.Plot }}</p>

        <dl class="movie-details">
          <template v-if="store.currentMovie.Director && store.currentMovie.Director !== 'N/A'">
            <dt>Director</dt>
            <dd>{{ store.currentMovie.Director }}</dd>
          </template>
          <template v-if="store.currentMovie.Writer && store.currentMovie.Writer !== 'N/A'">
            <dt>Writer</dt>
            <dd>{{ store.currentMovie.Writer }}</dd>
          </template>
          <template v-if="store.currentMovie.Actors && store.currentMovie.Actors !== 'N/A'">
            <dt>Cast</dt>
            <dd>{{ store.currentMovie.Actors }}</dd>
          </template>
          <template v-if="store.currentMovie.BoxOffice && store.currentMovie.BoxOffice !== 'N/A'">
            <dt>Box Office</dt>
            <dd>{{ store.currentMovie.BoxOffice }}</dd>
          </template>
          <template v-if="store.currentMovie.Awards && store.currentMovie.Awards !== 'N/A'">
            <dt>Awards</dt>
            <dd>{{ store.currentMovie.Awards }}</dd>
          </template>
        </dl>
      </div>
    </article>
  </main>
</template>

<style scoped>
.detail {
  padding-top: var(--space-md);
  animation: fade-in 0.4s var(--ease-out);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.875rem;
  color: var(--color-text-muted);
  text-decoration: none;
  margin-bottom: var(--space-xl);
  transition: color var(--duration-fast) var(--ease-out);
}

.back-link svg {
  width: 18px;
  height: 18px;
}

.back-link:hover {
  color: var(--color-accent);
}

.movie {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

@media (min-width: 768px) {
  .movie {
    flex-direction: row;
    gap: var(--space-2xl);
  }
}

.movie-poster {
  flex-shrink: 0;
  width: 100%;
  max-width: 340px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .movie-poster {
    width: 300px;
    margin: 0;
  }
}

.poster-image {
  width: 100%;
  border-radius: var(--radius-md);
  box-shadow: var(--card-shadow-hover);
}

.poster-placeholder {
  aspect-ratio: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background-mute);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
}

.poster-placeholder svg {
  width: 64px;
  height: 64px;
}

.movie-content {
  flex: 1;
  min-width: 0;
}

.movie-header {
  margin-bottom: var(--space-lg);
}

.movie-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin-bottom: var(--space-sm);
}

.movie-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.meta-badge {
  padding: 2px 8px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  letter-spacing: 0.04em;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.genre-tag {
  padding: 4px 12px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.ratings {
  display: flex;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
  padding: var(--space-lg);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
}

.rating {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.rating-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading);
  font-variant-numeric: tabular-nums;
}

.rating-source {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  max-width: 100px;
  line-height: 1.3;
}

.movie-plot {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: var(--space-xl);
}

.movie-details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-sm) var(--space-lg);
  font-size: 0.9rem;
}

.movie-details dt {
  color: var(--color-text-muted);
  font-weight: 500;
}

.movie-details dd {
  color: var(--color-text);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

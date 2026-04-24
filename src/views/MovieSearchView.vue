<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
import SearchBar from '@/components/SearchBar.vue'
import MovieGrid from '@/components/MovieGrid.vue'
import PaginationControls from '@/components/PaginationControls.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const store = useMoviesStore()

function handleSearch(query: string) {
  store.searchMovies(query)
}
</script>

<template>
  <main class="search-view">
    <div class="hero">
      <h2 class="hero-title">Discover Movies</h2>
      <p class="hero-subtitle">Search thousands of titles from the OMDB database</p>
    </div>

    <SearchBar :initial-query="store.query" @search="handleSearch" />

    <LoadingSpinner v-if="store.loading" />

    <ErrorMessage
      v-else-if="store.error"
      :message="store.error"
      @retry="handleSearch(store.query)"
    />

    <template v-else-if="store.hasResults">
      <p class="results-count">
        {{ store.totalResults }} results for
        <span class="results-query">"{{ store.query }}"</span>
      </p>
      <MovieGrid :movies="store.movies" />
      <PaginationControls
        v-if="store.totalPages > 1"
        :current-page="store.currentPage"
        :total-pages="store.totalPages"
        @page-change="store.goToPage"
      />
    </template>

    <div v-else-if="!store.query" class="empty">
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
        <path d="m15.5 14.5-.1.1a6.5 6.5 0 1 1 1.1-1.1l.1-.1 4.5 4.5-1 1-4.6-4.4Z" />
      </svg>
      <p>Search for a movie to get started</p>
    </div>
  </main>
</template>

<style scoped>
.search-view {
  padding-top: var(--space-lg);
}

.hero {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.hero-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-sm);
}

.hero-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

.results-count {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
}

.results-query {
  color: var(--color-accent);
}

.empty {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--color-text-muted);
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-md);
  opacity: 0.4;
}

.empty p {
  font-size: 0.95rem;
}
</style>

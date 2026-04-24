import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { omdbService } from '@/lib/OmdbService'
import type { OmdbSearchItem, OmdbMovieDetail } from '@/types/omdb'
import type { ApiError } from '@/lib/HttpClient'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<OmdbSearchItem[]>([])
  const currentMovie = ref<OmdbMovieDetail | null>(null)
  const query = ref('')
  const currentPage = ref(1)
  const totalResults = ref(0)
  const loading = ref(false)
  const loadingDetail = ref(false)
  const error = ref<string | null>(null)

  const totalPages = computed(() => Math.ceil(totalResults.value / 10))
  const hasResults = computed(() => movies.value.length > 0)

  async function searchMovies(searchQuery: string, page: number = 1) {
    loading.value = true
    error.value = null

    try {
      const response = await omdbService.searchMovies(searchQuery, page)
      movies.value = response.Search
      query.value = searchQuery
      currentPage.value = page
      totalResults.value = parseInt(response.totalResults, 10)
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
      movies.value = []
      totalResults.value = 0
    } finally {
      loading.value = false
    }
  }

  async function fetchMovieDetail(imdbId: string) {
    loadingDetail.value = true
    error.value = null

    try {
      currentMovie.value = await omdbService.getMovieDetail(imdbId)
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
    } finally {
      loadingDetail.value = false
    }
  }

  function clearDetail() {
    currentMovie.value = null
  }

  function goToPage(page: number) {
    searchMovies(query.value, page)
  }

  return {
    movies,
    currentMovie,
    query,
    currentPage,
    totalResults,
    loading,
    loadingDetail,
    error,
    totalPages,
    hasResults,
    searchMovies,
    fetchMovieDetail,
    clearDetail,
    goToPage,
  }
})

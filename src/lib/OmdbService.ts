import { HttpClient, type ApiError } from './HttpClient'
import type { OmdbSearchResponse, OmdbMovieDetail } from '@/types/omdb'

class OmdbService extends HttpClient {
  constructor() {
    super(import.meta.env.VITE_BASE_URL, {
      params: { apikey: import.meta.env.VITE_API_KEY_OMDB },
    })
  }

  async searchMovies(query: string, page: number = 1): Promise<OmdbSearchResponse> {
    const { data } = await this.http.get<OmdbSearchResponse>('', {
      params: { s: query, page, type: 'movie' },
    })

    if (data.Response !== 'True') {
      throw {
        status: 200,
        message: data.Error ?? 'Unknown error',
        code: 'OMDB_ERROR',
      } satisfies ApiError
    }

    return data
  }

  async getMovieDetail(imdbId: string): Promise<OmdbMovieDetail> {
    const { data } = await this.http.get<OmdbMovieDetail>('', {
      params: { i: imdbId },
    })

    if (data.Response !== 'True') {
      throw {
        status: 200,
        message: (data as unknown as { Error?: string }).Error ?? 'Movie not found',
        code: 'OMDB_ERROR',
      } satisfies ApiError
    }

    return data
  }
}

export const omdbService = new OmdbService()

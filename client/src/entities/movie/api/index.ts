import { fetchData } from '@/shared/api'
import { MovieType } from '../types'

type GetMovieResponseType = {
  data: MovieType[]
  total: number
  hasMore: boolean
}

export const getMovie = async (
  search: string,
  offset: number,
  limit: number,
  signal?: AbortSignal,
): Promise<GetMovieResponseType> => {
  const params = {
    search,
    offset: offset.toString(),
    limit: limit.toString(),
  }

  return await fetchData<GetMovieResponseType>({
    endpoint: 'list',
    // TODO: env
    baseUrl: 'https://job-test-projects.vercel.app/api',
    signal,
    params,
  })
}

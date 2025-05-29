import { ApiResponseType, fetchData } from '@/shared/api'
import { PersonType } from '../types'

export const getPeople = async (
  search = '',
  page = 1,
  signal?: AbortSignal,
): Promise<ApiResponseType<PersonType>> => {
  return await fetchData<ApiResponseType<PersonType>>({
    endpoint: 'people',
    params: { search: search, page: String(page) },
    signal,
  })
}

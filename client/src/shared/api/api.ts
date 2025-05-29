export type ApiResponseType<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

type FetchDataType = {
  endpoint: string
  params?: Record<string, string | number>
  signal?: AbortSignal
  baseUrl?: string
}

export const fetchData = async <T>({
  endpoint,
  baseUrl = 'https://swapi.py4e.com/api',
  params = {},
  signal,
}: FetchDataType): Promise<T> => {
  try {
    const url = new URL(`${baseUrl}/${endpoint}`)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString())
    })

    const response = await fetch(url, { signal })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API fetch error:', error)
    throw error
  }
}

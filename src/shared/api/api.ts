const BASE_URL = 'https://swapi.py4e.com/api'

export type ApiResponseType<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const fetchData = async <T>(
  endpoint: string,
  params: Record<string, string>,
  signal?: AbortSignal,
): Promise<T> => {
  try {
    const url = new URL(`${BASE_URL}/${endpoint}`)
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    )

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

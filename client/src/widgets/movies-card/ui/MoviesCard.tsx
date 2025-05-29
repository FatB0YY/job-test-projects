import { LIMIT, MoviesList, MovieType } from '@/entities/movie'
import { getMovie } from '@/entities/movie/api'
import { SearchInput } from '@/features/search-input'
import {
  FilterValueObj,
  FilterValueObjKeys,
  TodosFilter,
} from '@/features/todos-filter'
import { EntryStatusObj, EntryStatusObjKeys } from '@/shared/constants'
import { useDebounce, useInfiniteScroll } from '@/shared/hooks'
import { Button, Divider, Icon } from '@/shared/ui'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import styles from './MoviesCard.module.css'

export const MoviesCard: FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<EntryStatusObjKeys>(EntryStatusObj.INIT)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState<FilterValueObjKeys>(FilterValueObj.ALL)
  /* selectedMovies - POST-запрос на сервер в будущем */
  const [selectedMovies, setSelectedMovies] = useState<MovieType[]>([])

  const fetchMovie = useCallback(
    async (search: string, page: number, controller?: AbortController) => {
      setStatus(EntryStatusObj.LOADING)

      const offset = (page - 1) * LIMIT

      try {
        const res = await getMovie(search, offset, LIMIT, controller?.signal)

        setMovies((prev) => (page === 1 ? res.data : [...prev, ...res.data]))
        setTotal(res.total)
        setStatus(EntryStatusObj.SUCCESS)
      } catch {
        if (controller?.signal.aborted) return
        setStatus(EntryStatusObj.ERROR)
      }
    },
    [],
  )

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const debouncedHandleSearchChange = useDebounce(handleSearchChange, 300)

  const loadMore = () => {
    const loadedCount = movies.length
    if (loadedCount < total) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handleToggleComplete = useCallback((selectedMovie: MovieType) => {
    /* PATCH-запрос на сервер в будущем */
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === selectedMovie.id
          ? { ...movie, isCompleted: !movie.isCompleted }
          : movie,
      ),
    )
    /* POST-запрос на сервер в будущем */
    setSelectedMovies((prev) =>
      prev.find((m) => m.id === selectedMovie.id)
        ? prev
        : [...prev, selectedMovie],
    )
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchMovie(searchQuery, currentPage, controller)

    return () => {
      controller.abort()
    }
  }, [fetchMovie, searchQuery, currentPage])

  const isInitialLoad = status === EntryStatusObj.LOADING && movies.length === 0
  const hasMore = movies.length < total

  const setLoadMoreCbRef = useInfiniteScroll({
    loadMore,
    hasMore,
    status,
  })

  /* POST-запрос на сервер в будущем с query-параметром */
  const filteredTodos = useMemo(() => {
    return movies.filter((movie) => {
      const isActive = !movie.isCompleted
      const isCompleted = movie.isCompleted

      if (filter === FilterValueObj.ALL) return true
      if (filter === FilterValueObj.ACTIVE) return isActive
      if (filter === FilterValueObj.COMPLETED) return isCompleted

      return true
    })
  }, [movies, filter])

  const resultsCount = total ? `${total} movies` : null

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <SearchInput
          onSearchChange={debouncedHandleSearchChange}
          placeholder="Искать фильмы"
        />
      </div>

      {status === EntryStatusObj.ERROR ? (
        <p className={classNames(styles.errorMessage, 'system-typo-100')}>
          Произошла ошибка при загрузке данных.
        </p>
      ) : (
        <>
          <p className={classNames(styles.resultsCount, 'system-typo-200')}>
            {resultsCount}
          </p>

          {isInitialLoad ? (
            <div className={styles.wrapperLoader}>
              <Icon
                size={32}
                color="var(--system-color-action-500)"
                name="Preloader"
              />
            </div>
          ) : (
            <>
              <MoviesList
                onChange={handleToggleComplete}
                setLoadMoreCbRef={setLoadMoreCbRef}
                movies={filteredTodos}
              />

              <Divider />

              {/* Фильтры */}
              <section className={styles.wrapperFilters}>
                <TodosFilter activeFilter={filter} onChange={setFilter} />
                <Button
                  size="100"
                  variant="danger"
                  onClick={() => setMovies([])}
                >
                  Удалить все
                </Button>
              </section>
            </>
          )}

          {hasMore && (
            <Button
              loading={status === EntryStatusObj.LOADING}
              disabled={status === EntryStatusObj.LOADING || !hasMore}
              onClick={loadMore}
            >
              Показать ещё
            </Button>
          )}
        </>
      )}
    </div>
  )
}

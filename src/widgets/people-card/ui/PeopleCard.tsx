import { PeopleList, PersonType, getPeople } from '@/entities/person'
import { SearchInput } from '@/features/search-input'
import { ApiResponseType } from '@/shared/api'
import { EntryStatusObj, EntryStatusObjKeys } from '@/shared/constants'
import { useDebounce, useInfiniteScroll } from '@/shared/hooks'
import { Button, Icon } from '@/shared/ui'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useState } from 'react'
import styles from './PeopleCard.module.css'

export const PeopleCard: FC = () => {
  const [response, setResponse] = useState<ApiResponseType<PersonType>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [status, setStatus] = useState<EntryStatusObjKeys>(EntryStatusObj.INIT)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchPeople = useCallback(
    async (search: string, page: number, controller?: AbortController) => {
      setStatus(EntryStatusObj.LOADING)

      try {
        const res = await getPeople(search, page, controller?.signal)
        setResponse((prev) => ({
          ...res,
          results: page === 1 ? res.results : [...prev.results, ...res.results],
        }))
        setStatus(EntryStatusObj.SUCCESS)
      } catch {
        if (controller?.signal.aborted) {
          return
        }
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
    if (response.next) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    fetchPeople(searchQuery, currentPage, controller)

    return () => {
      controller.abort()
    }
  }, [fetchPeople, searchQuery, currentPage])

  const isInitialLoad =
    status === EntryStatusObj.LOADING && response.results.length === 0
  const resultsCount = response.count ? `${response.count} результатов` : null

  const setLoadMoreCbRef = useInfiniteScroll({
    loadMore,
    hasMore: Boolean(response.next),
    status,
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <SearchInput
          onSearchChange={debouncedHandleSearchChange}
          placeholder="Искать героев"
        />
      </div>

      {status === EntryStatusObj.ERROR ? (
        <p className={classNames(styles.errorMessage, 'system-typo-100')}>
          Произошла ошибка при загрузке данных. Попробуйте позже или включите
          VPN.
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
            <PeopleList
              setLoadMoreCbRef={setLoadMoreCbRef}
              people={response.results}
            />
          )}

          {response.next && (
            <Button
              loading={status === EntryStatusObj.LOADING}
              disabled={status === EntryStatusObj.LOADING || !response.next}
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

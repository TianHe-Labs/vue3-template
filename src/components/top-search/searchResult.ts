import type { Ref, VNodeChild } from 'vue'
import { DataTableColumns, PaginationInfo, useLoadingBar } from 'naive-ui'

interface Pagination {
  page: number
  pageSize: number
  itemCount: number
  prefix: (info: PaginationInfo) => VNodeChild
  onUpdatePage: (page: number) => void
}

interface SearchResultCtx<T> {
  loading: Ref<boolean>
  renderData: Ref<T[]>
  pagination: Pagination
  fetchData: () => Promise<void>
  onInputEnterKeyup: (event: KeyboardEvent) => Promise<void>
  resetPagination: () => void
}

const searchResultSymbol = Symbol('SEARCH_RESULT')

export function provideSearchResult<T>(
  queryKeyword: Ref<string>
): SearchResultCtx<T> {
  const resultTableColumns: DataTableColumns<T> = []

  const { query } = useRoute()

  const loading = ref<boolean>(false)
  const renderData = ref([])
  const pagination = reactive<Pagination>({
    page: Number(query.page) || 1,
    pageSize: 15,
    itemCount: 0,
    prefix: (info: PaginationInfo) => {
      return h(
        'div',
        {},
        `共 ${info.itemCount} 条记录 - 当前页 ${renderData.value.length} 条`
      )
      // 解决 naiveui 带来的问题：只有一条记录时，endIndedx=1(startIndex=0)
    },
    onUpdatePage: async (page: number) => {
      pagination.page = page
      await handlers.fetchData()
      router.push({ query: { page } })
    },
  })

  const router = useRouter()
  const loadingBar = useLoadingBar()

  const handlers = {
    async fetchData() {
      loading.value = true
      loadingBar.start()
      try {
        const { data } = await axios.post(
          'api/search',
          {
            keyword: queryKeyword.value,
          },
          {
            params: {
              page: pagination.page,
              rows: pagination.pageSize,
            },
          }
        )
        const { meta, payload } = data
        pagination.itemCount = meta?.total
        renderData.value = payload
        loadingBar.finish()
      } catch (err) {
        // pass
        loadingBar.error()
      } finally {
        loading.value = false
      }
    },
    async onInputEnterKeyup(event: KeyboardEvent): Promise<void> {
      // 拦截回车事件
      if (event.target !== event.currentTarget) return
      if (event.shiftKey || event.key !== 'Enter') return
      event.stopPropagation()
      event.preventDefault()
      // 回车事件处理
      handlers.resetPagination()
      await handlers.fetchData()
    },
    // 重置分页信息，如更改检索条件时，页码重置
    resetPagination() {
      // router.push({ name: 'Search', query: undefined })
      pagination.page = 1
    },
  }

  provide(searchResultSymbol, {
    resultTableColumns,
    loading,
    renderData,
    pagination,
    ...handlers,
  })

  return {
    loading,
    renderData,
    pagination,
    ...handlers,
  }
}

export function useSearchResult<T>(): SearchResultCtx<T> {
  return inject(searchResultSymbol) as SearchResultCtx<T>
}

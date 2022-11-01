import type { Ref, VNodeChild } from 'vue'
import {
  DataTableColumns,
  PaginationInfo,
  useMessage,
  useLoadingBar,
} from 'naive-ui'

interface Pagination {
  page: number
  pageSize: number
  itemCount: number
  prefix: (info: PaginationInfo) => VNodeChild
  onUpdatePage: (page: number) => void
}

interface SearchResultCtx<T> {
  resultTableLoading: Ref<boolean>
  resultTableColumns: DataTableColumns<T>
  resultTableData: Ref<T[]>
  pagination: Pagination
  fetchSearchResult: () => Promise<void>
  onInputEnterKeyup: (event: KeyboardEvent) => Promise<void>
  resetPagination: () => void
}

const searchResultSymbol = Symbol()

export function provideSearchResult<T = XXX>(
  queryKeyword: Ref<string>
): SearchResultCtx<T> {
  const resultTableColumns: DataTableColumns<T> = []

  const { query } = useRoute()

  const resultTableLoading = ref<boolean>(false)
  const resultTableData = ref([])
  const pagination = reactive<Pagination>({
    page: Number(query.page) || 1,
    pageSize: 15,
    itemCount: 0,
    prefix: (info: PaginationInfo) => {
      return h(
        'div',
        {},
        `共 ${info.itemCount} 条记录 - 当前页 ${resultTableData.value.length} 条`
      )
      // 解决 naiveui 带来的问题：只有一条记录时，endIndedx=1(startIndex=0)
    },
    onUpdatePage: async (page: number) => {
      pagination.page = page
      await handlers.fetchSearchResult()
      router.push({ query: { page } })
    },
  })

  const router = useRouter()
  const messageCtx = useMessage()
  const loadingBar = useLoadingBar()

  const handlers = {
    async fetchSearchResult() {
      resultTableLoading.value = true
      loadingBar.start()
      try {
        const { /* status, */ data } = await axios.get<AxiosResData>(
          `${import.meta.env.BASE_URL}api/search`,
          {
            params: {
              page: pagination.page,
              rows: pagination.pageSize,
              keyword: queryKeyword.value,
            },
          }
        )
        const { state, meta, payload } = data
        if (state === 800) {
          pagination.itemCount = meta?.total
          resultTableData.value = payload
        }
        loadingBar.finish()
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if ((err.response?.data as AxiosResData)?.state) {
            const { state, msg } = err.response?.data as AxiosResData
            messageCtx.error(`[${state}]${msg}`)
          } else {
            messageCtx.error(`[${err.response?.status}]${err.message}`)
          }
        } else {
          messageCtx.error('[908]应用服务异常，请联系管理员！')
        }
        loadingBar.error()
      }
      resultTableLoading.value = false
    },
    async onInputEnterKeyup(event: KeyboardEvent): Promise<void> {
      // 拦截回车事件
      if (event.target !== event.currentTarget) return
      if (event.shiftKey || event.key !== 'Enter') return
      event.stopPropagation()
      event.preventDefault()
      // 回车事件处理
      handlers.resetPagination()
      await handlers.fetchSearchResult()
    },
    // 重置分页信息，如更改检索条件时，页码重置
    resetPagination() {
      // router.push({ name: 'Search', query: undefined })
      pagination.page = 1
    },
  }

  provide(searchResultSymbol, {
    resultTableColumns,
    resultTableLoading,
    resultTableData,
    pagination,
    ...handlers,
  })

  return {
    resultTableColumns,
    resultTableLoading,
    resultTableData,
    pagination,
    ...handlers,
  }
}

export function useSearchResult<T = XXX>(): SearchResultCtx<T> {
  return inject(searchResultSymbol) as SearchResultCtx<T>
}

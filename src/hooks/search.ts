import type { Ref } from 'vue'
import type { DataTableColumns, PaginationInfo } from 'naive-ui'
import { useLoadingBar } from 'naive-ui'

interface SearchState<T> {
  loading: Ref<boolean>
  queryKeyword: Ref<string>
  renderData: Ref<T[]>
  pagination: Pagination
  fetchData: () => Promise<void>
  onInputKeyup: (event: KeyboardEvent) => Promise<void>
  resetPagination: () => void
}

const searchSymbol = Symbol('SEARCH')

export function provideSearch<T>(): SearchState<T> {
  const resultTableColumns: DataTableColumns<T> = []

  const router = useRouter()
  const route = useRoute()
  const loadingBar = useLoadingBar()

  const loading = ref<boolean>(false)
  const searchParams = reactive({
    queryKeyword: '',
  })
  const renderData = ref([])
  const pagination = reactive<Pagination>({
    page: Number(route.query.page) || 1,
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
      await fetchData()
      router.push({ query: { page } })
    },
  })

  const fetchData = async () => {
    loading.value = true
    loadingBar.start()
    try {
      const { data } = await axios.post(
        'api/search',
        {
          ...searchParams,
        },
        {
          params: {
            page: pagination.page,
            rows: pagination.pageSize,
          },
        }
      )
      pagination.itemCount = data.total
      renderData.value = data.list
      loadingBar.finish()
    } catch (err) {
      loadingBar.error()
    } finally {
      loading.value = false
    }
  }
  const onInputKeyup = async (event: KeyboardEvent) => {
    // 拦截回车事件
    if (event.target !== event.currentTarget) return
    if (event.shiftKey || event.key !== 'Enter') return
    event.stopPropagation()
    event.preventDefault()
    // 回车事件处理
    router.push({ name: 'Search' })
    resetPagination()
    await fetchData()
  }
  // 重置分页信息，如更改检索条件时，页码重置
  const resetPagination = () => {
    // router.push({ name: 'Search', query: undefined })
    pagination.page = 1
  }

  provide(searchSymbol, {
    resultTableColumns,
    loading,
    renderData,
    pagination,
    fetchData,
    onInputKeyup,
    resetPagination,
  })

  return {
    loading,
    ...toRefs(searchParams),
    renderData,
    pagination,
    fetchData,
    onInputKeyup,
    resetPagination,
  }
}

export function useSearch<T>(): SearchState<T> {
  return inject(searchSymbol) as SearchState<T>
}

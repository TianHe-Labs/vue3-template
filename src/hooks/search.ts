import { h, inject, provide, reactive, ref, toRefs, type Ref } from 'vue'
import type { DataTableColumns, PaginationInfo } from 'naive-ui'
import { useLoadingBar } from 'naive-ui'

interface SearchState<T> {
  loading: Ref<boolean>
  queryKeyword: Ref<string>
  renderData: Ref<T[]>
  pagination: Pagination
  fetchData: () => Promise<void>
  onEnterSearch: () => Promise<void>
  resetPagination: () => void
}

const searchSymbol = Symbol('SEARCH')

export function provideSearch<T>(): SearchState<T> {
  const renderTableColumns: DataTableColumns<T> = []

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
    pageSize: Number(route.query.pageSize) || 1,
    itemCount: 0,
    prefix: (info: PaginationInfo) => {
      return h(
        'div',
        {},
        `共 ${info.itemCount} 条记录 - 当前页 ${renderData.value.length} 条`
      )
    },
    onUpdatePage: async (page: number) => {
      pagination.page = page
      await fetchData()
      router.push({ query: { ...route.query, page } })
    },
    onUpdatePageSize: async (pageSize: number) => {
      pagination.page = 1
      pagination.pageSize = pageSize
      await fetchData()
      router.push({ query: { ...route.query, page: 1, pageSize } })
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

  const onEnterSearch = async () => {
    router.push({ name: 'Search' })
    resetPagination()
    await fetchData()
  }
  // 重置分页信息，如更改检索条件时，页码重置
  const resetPagination = () => {
    pagination.page = 1
    router.push({ query: { ...route.query, page: 1 } })
  }

  provide(searchSymbol, {
    renderTableColumns,
    loading,
    renderData,
    pagination,
    fetchData,
    onEnterSearch,
    resetPagination,
  })

  return {
    loading,
    ...toRefs(searchParams),
    renderData,
    pagination,
    fetchData,
    onEnterSearch,
    resetPagination,
  }
}

export function useSearch<T>(): SearchState<T> {
  return inject(searchSymbol) as SearchState<T>
}

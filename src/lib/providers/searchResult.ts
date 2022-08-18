import type { Ref, VNodeChild } from 'vue'
import { RouterLink } from 'vue-router'
import {
  DataTableColumns,
  PaginationInfo,
  NTag,
  NButton,
  useMessage,
  useLoadingBar,
} from 'naive-ui'
import {
  domainStatus,
  domainStatusColor,
  domainCate,
  domainCateColor,
} from '@/lib/mappings'

const searchResultSymbol = Symbol()

interface Pagination {
  page: number
  pageSize: number
  itemCount: number
  prefix: (info: PaginationInfo) => VNodeChild
  onUpdatePage: (page: number) => void
}

interface SearchResultCtx {
  resultTableColumns: DataTableColumns<Domain>
  resultTableLoading: Ref<boolean>
  resultTableData: Ref<Domain[]>
  pagination: Pagination
  fetchSearchResult: () => Promise<void>
  onInputEnterKeyup: (event: KeyboardEvent) => Promise<void>
  resetPagination: () => void
}

export function provideSearchResult(
  queryKeyword: Ref<string>,
  selectedStatus: Ref<string>,
  selectedCate: Ref<string>
): SearchResultCtx {
  const resultTableColumns: DataTableColumns<Domain> = [
    {
      title: '域名',
      key: 'domain',
      className: 'font-semibold',
    },
    {
      title: '域名状态',
      key: 'domain_status',
      render: (rowData: Domain) => {
        return h(
          NTag,
          { type: domainStatusColor[rowData.domain_status], size: 'small' },
          { default: () => domainStatus[rowData.domain_status] }
        )
      },
    },
    {
      title: '内容分类',
      key: 'classification',
      render: (rowData: Domain) => {
        return h(
          NTag,
          {
            type:
              domainCateColor[rowData.snapshot.classification.type] ||
              'default',
            size: 'small',
          },
          {
            default: () =>
              domainCate[rowData.snapshot.classification.type] ||
              rowData.snapshot.classification.type,
          }
        )
      },
    },
    {
      title: 'ICP 备案',
      key: 'icp',
      render: (rowData: Domain) => {
        if (rowData.icp.service_licence) {
          return h('div', { class: 'flex items-center gap-2' }, [
            h(
              NTag,
              { type: 'primary', size: 'small' },
              { default: () => rowData.icp.unit_type }
            ),
            h('span', {}, rowData.icp.unit_name),
          ])
        } else {
          return h(NTag, { type: 'error' }, { default: () => '未备案' })
        }
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: (rowData: Domain) => {
        return h(
          RouterLink,
          { to: { name: 'Detail', params: { domainKey: rowData.domain } } },
          {
            default: () =>
              h(
                NButton,
                { size: 'small' },
                {
                  default: () => '查看详情',
                }
              ),
          }
        )
      },
    },
  ]

  const { query } = useRoute()

  const resultTableLoading = ref<boolean>(false)
  const resultTableData = ref<Domain[]>([])
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
          '/api/search',
          {
            params: {
              page: pagination.page,
              rows: pagination.pageSize,
              status: selectedStatus.value,
              illegal_type: selectedCate.value,
              domain: queryKeyword.value,
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

export function useSearchResult(): SearchResultCtx {
  return inject(searchResultSymbol) as SearchResultCtx
}

import type { Ref } from 'vue'

const searchConditionSymbol = Symbol()

interface SearchConditionCtx {
  queryKeyword: Ref<string>
  selectedStatus: Ref<string>
  selectedCate: Ref<string>
  statusOptions: RadioOption[]
  cateOptions: RadioOption[]
  resetSearchCondition: () => void
}

export function provideSearchCondition(): SearchConditionCtx {
  const queryKeyword = ref<string>('')
  const selectedStatus = ref<string>('')
  const selectedCate = ref<string>('')

  const statusOptions: RadioOption[] = [
    {
      label: '即将过期',
      value: 'expiring',
    },
    {
      label: '已过期',
      value: 'expired',
    },
    {
      label: '已抢注',
      value: 'occupied',
    },
  ]
  const cateOptions: RadioOption[] = [
    {
      label: '不违规',
      value: 'no',
    },
    {
      label: '色情',
      value: 'erotic',
    },
    {
      label: '赌博',
      value: 'gambling',
    },
  ]

  const handlers = {
    resetSearchCondition() {
      selectedStatus.value = ''
      selectedCate.value = ''
    },
  }

  provide(searchConditionSymbol, {
    queryKeyword,
    selectedStatus,
    selectedCate,
    statusOptions,
    cateOptions,
    ...handlers,
  })

  return {
    queryKeyword,
    selectedStatus,
    selectedCate,
    statusOptions,
    cateOptions,
    ...handlers,
  }
}

export function useSearchCondition(): SearchConditionCtx {
  return inject(searchConditionSymbol) as SearchConditionCtx
}

import type { Ref } from 'vue'

const searchConditionSymbol = Symbol()

interface SearchConditionCtx {
  queryKeyword: Ref<string>
  resetSearchCondition: () => void
}

export function provideSearchCondition(): SearchConditionCtx {
  const queryKeyword = ref<string>('')

  const handlers = {
    resetSearchCondition() {
      // pass
    },
  }

  provide(searchConditionSymbol, {
    queryKeyword,
    ...handlers,
  })

  return {
    queryKeyword,
    ...handlers,
  }
}

export function useSearchCondition(): SearchConditionCtx {
  return inject(searchConditionSymbol) as SearchConditionCtx
}

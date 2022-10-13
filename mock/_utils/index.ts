import Mock from 'mockjs'

export function responseSuccess(payload: Recordable, meta = {}) {
  return Mock.mock({
    state: 800,
    payload,
    meta,
  })
}

export function responseError(state = 900, msg = '错误') {
  return Mock.mock({
    state,
    msg,
  })
}

export function genPagedItems<T>(item: T, total: number, page = 1, rows = 10) {
  total = Number(total)
  page = Number(page)
  rows = Number(rows)
  const firstIndex = (page - 1) * rows
  const lastIndex = Math.min(firstIndex + rows, total)
  const foundItems: T[] = []
  for (let index = firstIndex; index < lastIndex; index++) {
    foundItems.push({ ...item })
  }
  return foundItems
}

export function genCateStats<T>(item: T, length = 10) {
  const cateStats: T[] = []
  for (let i = 0; i < length; i++) {
    cateStats.push({ ...item })
  }
  return cateStats
}

export function sortByTime<T extends Recordable>(
  items: T[],
  orderBy = 'datetime',
  order: 'DESC' | 'ASC' = 'DESC'
) {
  const orderNum = order === 'DESC' ? [1, -1] : [-1, 1]
  const returnItems = [...items]
  returnItems.sort((a, b) =>
    new Date(a[orderBy]) > new Date(b[orderBy]) ? orderNum[0] : orderNum[0]
  )
  return returnItems
}

export function genRandom(min: number, max: number) {
  return Math.trunc(Math.random() * (max - min) + min)
}

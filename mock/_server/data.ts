// https://github.com/lavyun/better-mock
import Mock from 'better-mock'
import qs from 'query-string'
import { setupMock, responseSuccess } from '../_utils'

const _data = Mock.mock({
  'list|100': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
    },
  ],
})

setupMock({
  setup() {
    // 统计
    Mock.mock(new RegExp('/api/stats'), () => {
      const total = Mock.Random.natural(3000, 5000)
      return responseSuccess({
        total,
      })
    })
    // 检索
    Mock.mock(new RegExp('/api/search'), (req: MockRequest) => {
      const { page = 1, pageSize = 10 } = qs.parseUrl(req.url).query
      const p = page as number
      const ps = pageSize as number
      return responseSuccess({
        list: _data.list.slice((p - 1) * ps, p * ps),
        total: 100,
      })
    })
  },
})

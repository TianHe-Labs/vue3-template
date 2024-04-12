// https://github.com/lavyun/better-mock
import Mock from 'better-mock'
import qs from 'query-string'
import { setupMock, successResponseWrap } from '../_utils'

const _data = Mock.mock({
  'list|38': [
    {
      'id|8': /[A-Z][a-z][0-9]/,
      'name|4-8': /[A-Z]/,
      'count|2-3': /[0-9]/,
      'status|1': ['online', 'offline'],
      createdAt: Mock.Random.datetime(),
    },
  ],
})

setupMock({
  setup() {
    // 数据检索
    Mock.mock(new RegExp('/api/data/search'), (req: MockRequest) => {
      const { page = 1, pageSize = 10 } = qs.parseUrl(req.url).query
      const p = Number(page),
        ps = Number(pageSize)
      return successResponseWrap({
        total: 38,
        list: _data.list.slice(ps * (p - 1), ps * p),
      })
    })
  },
})

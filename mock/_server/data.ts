// https://github.com/lavyun/better-mock
import Mock from 'better-mock'
import qs from 'query-string'
import { setupMock, responseSuccess } from '../_utils'

const _data = Mock.mock({
  'list|100': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      domain: Mock.Random.domain(),
      'record_id|15': /[0-9]/,
      record_bureau: `${Mock.Random.province()}${Mock.Random.city()}网安大队`,
      unit_type: [
        '个人',
        '事业单位',
        '企业单位',
        '司法鉴定所',
        '国防军队',
        '基金会',
        '境外驻华机构',
        '大中院校',
        '律师事务所',
        '政府机构',
        '民办非企业',
        '社会团体',
      ],
      unit_name: Mock.Random.cname(),
      website_main_domain: Mock.Random.domain(),
      website_second_domain: Mock.Random.domain(),
      website_name: Mock.Random.cname(),
      'website_type|1': ['非交互式', '交互式'],
      record_time: Mock.Random.datetime(),
    },
  ],
})

setupMock({
  setup() {
    // 统计
    Mock.mock(new RegExp('/api/stats'), () => {
      const total = Mock.Random.natural(3000, 5000)
      const onRecord = Mock.Random.natural(500, 1200)
      return responseSuccess({
        total,
        onRecord,
        noRecord: total - onRecord,
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

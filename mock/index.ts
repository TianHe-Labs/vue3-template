import Mock from 'better-mock'

import './_server/user'
import './_server/search'

Mock.setup({
  timeout: '600-1000',
})

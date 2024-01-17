import Mock from 'better-mock'

import './_server/user'
import './_server/data'

Mock.setup({
  timeout: '600-1000',
})

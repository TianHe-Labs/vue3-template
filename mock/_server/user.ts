// https://github.com/lavyun/better-mock
import Mock from 'better-mock'
import { setupMock, responseSuccess, responseFailure } from '../_utils'

const _users = [
  {
    username: 'nist',
    password: 'nslab321',
    roles: ['admin'],
  },
]

const _tokens = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo',
}

setupMock({
  setup() {
    // 登录认证
    Mock.mock(new RegExp('/api/auth'), (req: MockRequest) => {
      const { username, password } = JSON.parse(req.body as string)
      const foundItem = _users.find(
        (u) => u.username === username && u.password === password
      )
      if (foundItem) {
        return responseSuccess(_tokens)
      } else {
        return responseFailure(901, '用户名或密码错误！')
      }
    })

    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), (req: MockRequest) => {
      const { token } = req.headers as any
      if (token === _tokens.access_token) {
        const { username, roles } = _users[0]
        return responseSuccess({ username, roles })
      } else {
        return responseFailure(901, '用户名或密码错误！')
      }
    })
  },
})

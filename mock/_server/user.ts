// https://github.com/lavyun/better-mock
import Mock from 'better-mock'
import { setupMock, successResponseWrap, failureResponseWrap } from '../_utils'

const _users = [
  {
    username: 'admin',
    password: 'nslab321',
    role: 'admin',
  },
]

const _tokens = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo',
}

setupMock({
  setup() {
    // 登录认证
    Mock.mock(new RegExp('/api/user/auth'), (req: MockRequest) => {
      const { username, password } = JSON.parse(req.body as string)
      const foundItem = _users.find(
        (u) => u.username === username && u.password === password
      )
      if (foundItem) {
        return successResponseWrap(_tokens)
      } else {
        return failureResponseWrap(900, '用户名或密码错误！')
      }
    })

    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), (req: MockRequest) => {
      const token = (req.headers as any)?.Authorization.replace('Bearer ', '')
      if (token === _tokens.accessToken) {
        return successResponseWrap(_users[0])
      } else {
        return failureResponseWrap(900, '用户名或密码错误！')
      }
    })
  },
})

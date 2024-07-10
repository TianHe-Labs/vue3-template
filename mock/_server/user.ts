// https://github.com/lavyun/better-mock
import Mock from 'better-mock'
import { setupMock, successResponseWrap, failureResponseWrap } from '../_utils'
import { USERROLE } from '@/store/modules/user/types'

const _users = [
  {
    username: 'admin',
    password: 'nslab321',
    role: USERROLE.ADMIN,
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo',
  },
]

setupMock({
  setup() {
    // 登录认证
    Mock.mock(new RegExp('/api/user/auth'), (req: MockRequest) => {
      const { username, password } = JSON.parse(req.body as string)
      const foundItem = _users.find(
        (u) => u.username === username && u.password === password
      )
      if (foundItem) {
        const { accessToken, refreshToken } = foundItem
        return successResponseWrap({ accessToken, refreshToken })
      } else {
        return failureResponseWrap('用户名或密码错误！')
      }
    })

    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), (req: MockRequest) => {
      const token = (req.headers as any)?.Authorization.replace('Bearer ', '')
      const foundItem = _users.find((u) => u.accessToken === token)
      if (foundItem) {
        const { username, role } = foundItem
        return successResponseWrap({ username, role })
      } else {
        return failureResponseWrap('用户名或密码错误！')
      }
    })
  },
})

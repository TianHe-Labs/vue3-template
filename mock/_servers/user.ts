import { MockMethod } from 'vite-plugin-mock'
import { responseError, responseSuccess } from '../_utils'

enum RoleGroupEnum {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VISITOR = 'visitor',
}

const _users = [
  {
    username: 'nist',
    password: 'nslab321',
    permissions: [RoleGroupEnum.ADMIN],
  },
]

export default [
  {
    url: '/mock/auth',
    method: 'post',
    timeout: 1200,
    response: (opt: { body: Recordable }) => {
      const { username, password } = opt.body
      const foundItem = _users.find(
        (u) => u.username === username && u.password === password
      )

      if (foundItem) {
        const { permissions } = foundItem
        const access_token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo'
        const refresh_token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo'
        return responseSuccess({
          username,
          permissions,
          access_token,
          refresh_token,
        })
      } else {
        return responseError(901, '用户名或密码错误！')
      }
    },
  },
] as MockMethod[]

// https://vite-plugin-mock-dev-server.netlify.app/
import { defineMock } from 'vite-plugin-mock-dev-server'
import { responseSuccess, responseFailure } from './_util'

enum RoleEnum {
  SUPER = 'super',
  ADMIN = 'admin',
  COMMON = 'common',
}

const _users = [
  {
    username: 'nist',
    password: 'nslab321',
    roles: [RoleEnum.ADMIN],
  },
]

const _tokens = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc3QifQ.95aGaCg7ovpUWSpoZdCoam6Mvr-vE374VjMfthTpKPo',
}

export default defineMock([
  {
    // enable: false,
    url: '/api/auth',
    method: 'POST',
    body: (req) => {
      const { username, password } = req.body
      const foundItem = _users.find(
        (u) => u.username === username && u.password === password
      )
      if (foundItem) {
        return responseSuccess(_tokens)
      } else {
        return responseFailure(901, '用户名或密码错误！')
      }
    },
  },
  {
    // enable: false,
    url: '/api/user/info',
    method: 'GET',
    body: (req) => {
      const { token } = req.headers
      if (token === _tokens.access_token) {
        const { username, roles } = _users[0]
        return responseSuccess({ username, roles })
      } else {
        return responseFailure(901, '用户名或密码错误！')
      }
    },
  },
])

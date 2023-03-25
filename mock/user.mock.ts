import { MockHandler } from 'vite-plugin-mock-server'
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

const userMocks: MockHandler[] = [
  {
    // enable: false,
    pattern: '/api/auth',
    method: 'POST',
    handle: async (req, res) => {
      let bodyRaw = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          bodyRaw += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      const { username, password } = JSON.parse(bodyRaw)
      const foundItem = _users.find(
        (u) => u.username === username && u.password === password
      )
      res.setHeader('Content-Type', 'application/json')
      if (foundItem) {
        res.end(JSON.stringify(responseSuccess(_tokens)))
      } else {
        res.end(JSON.stringify(responseFailure(901, '用户名或密码错误！')))
      }
    },
  },
  {
    // enable: false,
    pattern: '/api/user/info',
    method: 'GET',
    handle: (req, res) => {
      const { token } = req.headers
      if (token === _tokens.access_token) {
        const { username, roles } = _users[0]
        res.end(JSON.stringify(responseSuccess({ username, roles })))
      } else {
        res.end(JSON.stringify(responseFailure(901, '用户名或密码错误！')))
      }
    },
  },
]

export default userMocks

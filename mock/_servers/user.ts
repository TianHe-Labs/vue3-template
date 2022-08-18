import { MockMethod } from 'vite-plugin-mock'
import { jwtGenerator, responseError, responseSuccess } from '../_utils'

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
        const access_token = jwtGenerator({ username })
        const refresh_token = jwtGenerator({ username })
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
    /* rawResponse: async (req, res) => {
      let reqBodyData = '';
      await new Promise(resolve => {
        req.on('data', chunk => {
          reqBodyData += chunk;
        });
        req.on('end', () => resolve(undefined));
      });
      const { username, password } = JSON.parse(reqBodyData);
      const foundItem = _users.find(
        u => u.username === username && u.password === password,
      );

      if (foundItem) {
        const { permissions } = foundItem;
        const access_token = jwtGenerator({ username });
        const refresh_token = jwtGenerator({ username });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify(
            responseSuccess({
              username,
              permissions,
              access_token,
              refresh_token,
            }),
          ),
        );
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseError(901, '用户名或密码错误！')));
      }
    },*/
  },
] as MockMethod[]

# Vue 3 Template on NaiveUI & UnoCSS

## NaiveUI

- **Doc**: [Naive UI](https://www.naiveui.com/zh-CN/os-theme/docs/introduction)

## UnoCSS

- **presetUno**: [Uno](https://unocss.dev/presets/uno)

- **presetAttributify**: [Attributify](https://unocss.dev/presets/attributify)

- **presetWebFonts**: [Web Fonts](https://unocss.dev/presets/web-fonts)

- **presetIcons**: [Icons](https://unocss.dev/presets/icons), [Iconify](https://icon-sets.iconify.design/)

  ```html
  <!-- example -->

  <n-icon class="i-solar:box-bold-duotone" />
  <!-- n-icon is naiveui built-in component, i- is prefix -->
  ```

## Features

- **User Authentication**: api/user, store/user

- **User Permission**: router/guard, hooks/permission

- **Rich icon library**: UnoCSS/Iconify

  ```html
  <!-- example -->

  <n-icon class="i-solar:box-bold-duotone" />
  <!-- n-icon is naiveui built-in component, i- is prefix -->
  ```

- **Responsive**: CSS(UnoCSS Variants), JS(@vueuse/core useBreakpoints, provide in App.vue)

  ```js
  // App.vue
  const breakpoints = useBreakpoints(breakpointsTailwind);
  provide('breakpoints', breakpoints);

  // child component
  const breakpoints = inject('breakpoints') as any;
  ```

- **Theme Mode**: light mode & dark mode, combining Arco Design with UnoCSS ensures consistency

  ```html
  <!-- [light:]<class name> -->
  <div text-primary></div>
  <div light:text-primary></div>

  <!-- dark:<class name> -->
  <div dark:text-primary></div>
  ```

- **Instant On-demand Atomic CSS**: UnoCSS(Attributify supported)

- **Mock Data**: mockjs

- **Auto Lint**: hucky, lint-staged, _code lint_(eslint, prettier, stylelint), _commit lint_(commmitlint)

- **CI/CD**: Github Actions

## Folder Structure

- **.github/workflows**

- **.husky**: `pre-comment(lint-staged)`, `commit-msg`([Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/))

- **config**: [Vite Config](https://cn.vitejs.dev/config/) (Current: Vite@^^4.2.1 installed)

- **mock**: mock data in development

- **src**

  - **assets**: static files, eg: `json`, `image`, `video`

  - **components**: common components, inclues some global components(index.ts)

  - **hooks**: common hooks, eg: `chart-option`, `loading`, `logout`, `permission`

  - **layouts**: common layout components

  - **pages**: Vue3 page

  - **plugins**: eg: `axios`, `emitter`

  - **router**: `routes`, `global route guard`

  - **store**: global data store, eg: `app`(theme, ...), `tab-bar`(multi page), `user`(login, userinfo, ...), `oss`(ali oss sts)

  - **utils**: tool function, eg: `formatX`(preset dayjs), `hasX`, `isY`, `canZ`, `transformA`, `index`(Unclassifiable fragmentary functions & Unified entry for various types of functions)

  - **styles**: `css`, `less`

  - **App.vue**: Vue3 entry

  - **main.ts**: entry

  - **settings.json**: app settings (only accessible in development)

- **types**: global type definition, eg: env.d.ts

  ```ts
  // env.d.ts
  interface ImportMetaEnv {
    readonly VITE_API_BASE: string
    readonly VITE_APP_NAME: string
    readonly VITE_APP_DESC: string
    readonly VITE_APP_COPR: string
    readonly VITE_DEV_PROXY: string[][]
  }
  ```

- **.env**: common environment, .env.development only in development(_gitignore_), .env.production only in production(_gitignore_)

- **.eslintignore**

- **.eslintrc**: eslint config

- **.gitignore**

- **.prettierignore**

- **.prettierrc.js**: prettier config

- **commitlint.config.js**: commitlint config (husky/commit-msg)

- **docker.nginx.template**

- **Dockerfile**

- **index.html**: entry

- **package.json**: package

- **package-lock.yaml**: pnpm

- **tsconfig.json**: Typescript

- **uno.config.ts**: UnoCSS

- **vercel.json**: Vercel config

## CI/CD Based On Github Actions and Coolify

Dokcer ci/cd `.github/workflows/docker-deploy.yml`
add some variables and secrets in repo settings

```yml
# secrets
COOLIFY_WEBHOOK: # coolify deploy webhook
COOLIFY_TOKEN: # coolify auth token
```

Host ci/cd `.github/workflows/host-deploy.yml`
add some variables and secrets in repo settings

```yml
# variables
APP_NAME: # app name used to deployed subpath
# secrets
REMOTE_HOST: # ip address of the remote server
REMOTE_USER: # user access to the remote server
PRIVATE_KEY: # private key access to the remote server with pubkey authentication
```

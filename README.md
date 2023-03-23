# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## CI/CD Based On Github Actions

1. CI Host

The CI/CD config is `.github/workflows/ci-host.yml`, you should add some secrets used by the CI/CD config, in Github repo settings

```yml
REMOTE_HOST: # ip address of the remote server

REMOTE_USER: # user access to the remote server

PRIVATE_KEY: # private key access to the remote server with pubkey authentication
```

What's more, you also need to modify the top `env` variables to your own configs in the ci config file

```yml
env:
  REMOTE_USER: root # user of remote host

  REMOTE_PATH: /var/www/xxxx # your expected target path used by nginx

  BASE_URL: # when deploying in sub path (https://cn.vitejs.dev/config/shared-options.html#base)
```

2. CI AliOSS

```yml
OSS_ACCESS_KEY_ID:

OSS_ACCESS_KEY_SECRET:
```

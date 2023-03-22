// https://github.com/vbenjs/vite-plugin-html
import { loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default function htmlPlugin() {
  return createHtmlPlugin({
    minify: process.env.NODE_ENV === 'production', // minify when build
    inject: {
      data: {
        title: loadEnv(process.env.NODE_ENV, process.cwd()).VITE_APP_NAME,
      },
    },
  })
}

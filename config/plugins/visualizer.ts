// https://github.com/btd/rollup-plugin-visualizer
import visualizer from 'rollup-plugin-visualizer'

export default function visualizerPlugin() {
  if (process.env.REPORT) {
    return visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  }
  return []
}

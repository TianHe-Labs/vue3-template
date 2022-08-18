import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// https://github.com/vbenjs/vite-plugin-mock

// Import your mock .ts files one by one
// If you use vite.mock.config.ts, just import the file directly
// You can use the import.meta.globEager function to import all

const modules = import.meta.globEager('./_servers/**/*.ts')

const mockModules: unknown[] = []

Object.keys(modules).forEach((key) => {
  mockModules.push(...modules[key].default)
})

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}

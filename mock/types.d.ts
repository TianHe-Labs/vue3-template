interface SetupMock {
  enable?: boolean
  setup: () => void
}

interface MockRequest {
  url: string
  type: string
  headers: Headers
  body?: string
}

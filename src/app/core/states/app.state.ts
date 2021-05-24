interface RoutingData {
  url: string,
  params: {
    [key: string]: any
  },
  query: {
    [key: string]: any
  },
}

export type RoutingState = {
  state: RoutingData,
  navigationId: number
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoutingState } from '../states';

export interface NavigationEvent {
  id: number
  url: string
  urlAfterRedirects: string,
  params?: {},
  queryParams?: {}
}

const initialState: RoutingState = {
  state: {
    url: '',
    params: {},
    query: {}
  },
  navigationId: -1
}

export const isNavigationEvent = (data: any): data is NavigationEvent => {
  if (
    data.hasOwnProperty('url')
    && data.hasOwnProperty('id')
    && data.hasOwnProperty('urlAfterRedirects')
    && Object.keys(data).length <= 5
  ) return true
  return false
}


const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    routerNavigated: (state: RoutingState, action: PayloadAction<NavigationEvent>) => {
      const { id, ...rest } = action.payload
      const newState = {
        ...state,
        ...rest,
        navigationId: id
      }
      return newState
    }
  }
})

export const { routerNavigated } = routerSlice.actions
export const routerReducer = routerSlice.reducer

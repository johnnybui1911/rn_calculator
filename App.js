import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Screen from './src/Screen'
import reducer from './src/reducer'

const stores = createStore(reducer)

export default function App() {
  return (
    <Provider store={stores}>
      <Screen />
    </Provider>
  )
}

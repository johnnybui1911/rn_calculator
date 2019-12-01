import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import configureMockStore from 'redux-mock-store'
import { initialState } from '../reducer'
import { pressEqual, pressNumber, pressOperator, pressDot, pressClear } from '../actions'
import { EQUAL_PRESS, NUMBER_PRESS, OPERATOR_PRESS, DOT_PRESS, CLEAR_PRESS } from '../constants'

// Create a mock store
const mockStore = configureMockStore([])
let store
describe('Action Creators', () => {
  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('creates NUMBER_PRESS when press number ', () => {
    store.dispatch(pressNumber(1))
    expect(store.getActions()).toContainEqual({ type: NUMBER_PRESS, inputValue: 1 })
  })

  it('creates OPERATOR_PRESS when press operator ', () => {
    const selectedSymbol = '+'
    store.dispatch(pressOperator(selectedSymbol))
    expect(store.getActions()).toContainEqual({ type: OPERATOR_PRESS, selectedSymbol: '+' })
  })

  it('creates EQUAL_PRESS when press equals "=" ', () => {
    store.dispatch(pressEqual())
    expect(store.getActions()).toContainEqual({ type: EQUAL_PRESS })
  })

  it('creates DOT_PRESS when press dot "." ', () => {
    store.dispatch(pressDot())
    expect(store.getActions()).toContainEqual({ type: DOT_PRESS })
  })

  it('creates CLEAR_PRESS when press clear "C" ', () => {
    store.dispatch(pressClear())
    expect(store.getActions()).toContainEqual({ type: CLEAR_PRESS })
  })
})

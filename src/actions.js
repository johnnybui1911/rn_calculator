import { NUMBER_PRESS, OPERATOR_PRESS, EQUAL_PRESS, CLEAR_PRESS, DOT_PRESS } from './constants'

export const pressNumber = inputValue => {
  return { type: NUMBER_PRESS, inputValue }
}

export const pressOperator = selectedSymbol => {
  return { type: OPERATOR_PRESS, selectedSymbol }
}

export const pressEqual = () => {
  return { type: EQUAL_PRESS }
}

export const pressClear = () => {
  return { type: CLEAR_PRESS }
}

export const pressDot = () => {
  return { type: DOT_PRESS }
}

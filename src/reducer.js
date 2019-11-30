import { combineReducers } from 'redux'
import { format } from 'mathjs'
import { NUMBER_PRESS, OPERATOR_PRESS, EQUAL_PRESS, CLEAR_PRESS, DOT_PRESS } from './constants'

const initialState = {
  inputValue: '0',
  outputValue: '',
  selectedSymbol: null,
  hasDot: false
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case NUMBER_PRESS: {
      const { selectedSymbol, outputValue, hasDot } = state
      const prevInputValue = state.inputValue
      const lastIdSymbol = selectedSymbol ? prevInputValue.lastIndexOf(selectedSymbol) : -1
      const lastInput = prevInputValue.slice(lastIdSymbol + 1, prevInputValue.length)
      if (lastInput.indexOf('e') < 0 && lastInput.replace(/\D/g, '').length >= 9) {
        return state
      }
      // if (outputValue && !selectedSymbol && !hasDot) {
      //   return {
      //     ...state,
      //     outputValue: '',
      //     inputValue: String(action.inputValue)
      //   }
      // }
      return {
        ...state,
        outputValue: '',
        inputValue:
          prevInputValue === '0' || (outputValue && !selectedSymbol && !hasDot)
            ? String(action.inputValue)
            : prevInputValue + action.inputValue
      }
    }

    case OPERATOR_PRESS: {
      const { selectedSymbol } = action
      let { inputValue } = state
      const prevSelectedSymbol = state.selectedSymbol
      if (prevSelectedSymbol !== selectedSymbol) {
        const condition = prevSelectedSymbol && inputValue.slice(-1) === prevSelectedSymbol
        inputValue = condition ? inputValue.slice(0, inputValue.length - 1) : inputValue
        return {
          ...state,
          hasDot: false,
          selectedSymbol,
          inputValue: inputValue + selectedSymbol
        }
      } else {
        if (inputValue.slice(-1) !== selectedSymbol) {
          return {
            ...state,
            hasDot: false,
            selectedSymbol,
            inputValue: inputValue + selectedSymbol
          }
        }
        return state
      }
    }

    case EQUAL_PRESS: {
      let { inputValue, selectedSymbol } = state
      if (!selectedSymbol) {
        return { ...state, outputValue: inputValue, hasDot: false }
      }
      if (inputValue.slice(-1) === selectedSymbol) {
        inputValue = inputValue.substring(0, inputValue.lastIndexOf(selectedSymbol))
      }
      let outputValue = format(eval(inputValue), { precision: 9, upperExp: 9, lowerExp: -9 })
      outputValue =
        outputValue.length > 9 && outputValue.indexOf('e') > -1 ? parseFloat(outputValue).toPrecision(6) : outputValue
      outputValue = outputValue === 'Infinity' || outputValue === 'NaN' ? 'Error' : outputValue
      return {
        ...state,
        hasDot: false,
        selectedSymbol: null,
        inputValue: outputValue,
        outputValue
      }
    }

    case DOT_PRESS: {
      const { selectedSymbol, outputValue } = state
      if (outputValue && !selectedSymbol) {
        return {
          ...state,
          hasDot: !state.hasDot,
          inputValue: '0.',
          outputValue: ''
        }
      }
      return state.hasDot
        ? state
        : {
            ...state,
            hasDot: !state.hasDot,
            inputValue: state.inputValue.slice(-1) === '.' ? state.inputValue : state.inputValue + '.',
            outputValue: ''
          }
    }

    case CLEAR_PRESS: {
      return initialState
    }

    default:
      return state
  }
}

export default combineReducers({ rootReducer })

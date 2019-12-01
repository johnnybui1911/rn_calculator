import { NUMBER_PRESS, OPERATOR_PRESS, EQUAL_PRESS, CLEAR_PRESS, DOT_PRESS, MAX_SIZE_DISPLAY, formatResult } from './constants'

export const initialState = {
  inputValue: '0',
  outputValue: '',
  selectedSymbol: null,
  hasDot: false
}
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case NUMBER_PRESS: {
      const { selectedSymbol, outputValue, hasDot } = state
      const prevInputValue = state.inputValue
      const lastIdSymbol = selectedSymbol ? prevInputValue.lastIndexOf(selectedSymbol) : -1
      const lastInput = prevInputValue.slice(lastIdSymbol + 1, prevInputValue.length)
      // input out of upper bound -> no changes
      if (lastInput.indexOf('e') < 0 && lastInput.replace(/\D/g, '').length >= MAX_SIZE_DISPLAY && !outputValue) {
        return state
      }
      // user press number input
      return {
        ...state,
        outputValue: '',
        inputValue:
          prevInputValue === '0' || (outputValue && !selectedSymbol && !hasDot) // previous input is 0 or input is the output from the last operation
            ? String(action.inputValue)
            : prevInputValue + action.inputValue
      }
    }

    case OPERATOR_PRESS: {
      const { selectedSymbol } = action
      let { inputValue } = state
      const prevSelectedSymbol = state.selectedSymbol
      // user press multiple different operators continuously -> use the last one
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
        // user press multiple similar operators in one long operation right after press input number (ex: 1+2+3+4)
        if (inputValue.slice(-1) !== selectedSymbol) {
          return {
            ...state,
            hasDot: false,
            selectedSymbol,
            inputValue: inputValue + selectedSymbol
          }
        }
        // user press multiple similar operators continuously  -> no changes
        return state
      }
    }

    case EQUAL_PRESS: {
      let { inputValue, selectedSymbol } = state
      // user press "=" before press operator "+,-,*,/" -> return the last input
      if (!selectedSymbol) {
        return { ...state, outputValue: inputValue, hasDot: false }
      }
      // user press "=" after press operator "+,-,*,/" -> calculate the result
      let outputValue = eval(inputValue.slice(-1) === selectedSymbol ? inputValue.slice(0, -1) : inputValue)
      outputValue = formatResult(outputValue)
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
      //user press "." after press "="
      if (outputValue && !selectedSymbol) {
        return {
          ...state,
          hasDot: true,
          inputValue: '0.',
          outputValue: ''
        }
      }
      return state.hasDot //user press "." after already press "."
        ? state
        : {
            // user press "." first time
            ...state,
            hasDot: true,
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

export default rootReducer

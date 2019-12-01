import rootReducer, { initialState } from '../reducer'
import { NUMBER_PRESS, EQUAL_PRESS, OPERATOR_PRESS, DOT_PRESS, CLEAR_PRESS } from '../constants'

describe('Root Reducer', () => {
  describe('INITIAL_STATE', () => {
    it('is correct', () => {
      const action = { type: 'DUMMY_ACTION' }

      expect(rootReducer(undefined, action)).toEqual(initialState)
    })
  })

  describe('NUMBER_PRESS', () => {
    const action = { type: NUMBER_PRESS, inputValue: 1 }
    let state, expectedState

    it('should insert input number into inputValue', () => {
      expectedState = {
        ...initialState,
        inputValue: '1'
      }
      expect(rootReducer(undefined, action)).toEqual(expectedState)
    })

    it('should not update state', () => {
      state = {
        ...initialState,
        inputValue: '999999999'
      }
      expect(rootReducer(state, action)).toEqual(state)
    })

    it('should insert input number into inputValue after the operator', () => {
      state = {
        ...initialState,
        selectedSymbol: '+',
        inputValue: '1+'
      }
      expectedState = {
        ...state,
        inputValue: '1+1'
      }
      expect(rootReducer(state, action)).toEqual(expectedState)
    })

    it('should reset state and update only inputValue to input number', () => {
      state = {
        ...initialState,
        inputValue: '10',
        outputValue: '10'
      }
      expectedState = {
        ...initialState,
        inputValue: '1'
      }
      expect(rootReducer(state, action)).toEqual(expectedState)
    })
  })

  describe('OPERATOR_PRESS', () => {
    const action = { type: OPERATOR_PRESS, selectedSymbol: '+' }
    const actionMinus = { type: OPERATOR_PRESS, selectedSymbol: '-' }

    let state, expectedState

    it('should insert selected operator into inputValue and assign to selectedSymbol', () => {
      state = {
        ...initialState,
        inputValue: '1'
      }

      expectedState = {
        ...initialState,
        selectedSymbol: '+',
        inputValue: '1+'
      }
      expect(rootReducer(state, action)).toEqual(expectedState)
    })

    it('should not update state', () => {
      state = {
        ...initialState,
        selectedSymbol: '+',
        inputValue: '1+'
      }
      expect(rootReducer(state, action)).toEqual(state)
    })

    it('should replace the last operator by new operator', () => {
      state = {
        ...initialState,
        selectedSymbol: '+',
        inputValue: '1+'
      }
      expectedState = {
        ...state,
        selectedSymbol: '-',
        inputValue: '1-'
      }
      expect(rootReducer(state, actionMinus)).toEqual(expectedState)
    })

    it('should insert selected operator into inputValue without updating selectedSymbol', () => {
      state = {
        ...initialState,
        selectedSymbol: '+',
        inputValue: '1+2'
      }
      expectedState = {
        ...state,
        inputValue: '1+2+'
      }
      expect(rootReducer(state, action)).toEqual(expectedState)
    })
  })

  describe('EQUAL_PRESS', () => {
    const action = { type: EQUAL_PRESS }
    let state, expectedState

    it('should calculate the outputValue', () => {
      state = {
        ...initialState,
        selectedSymbol: '+',
        inputValue: '1+3'
      }
      expectedState = {
        ...initialState,
        selectedSymbol: null,
        inputValue: '4',
        outputValue: '4'
      }

      expect(rootReducer(state, action)).toEqual(expectedState)
    })

    it('should change outputValue to the last inputValue', () => {
      state = {
        ...initialState,
        inputValue: '4'
      }
      expectedState = {
        ...state,
        inputValue: '4',
        outputValue: '4'
      }

      expect(rootReducer(state, action)).toEqual(expectedState)
    })

    it('should delete last operator and update correct outputValue', () => {
      state = {
        ...initialState,
        selectedSymbol: '+',
        inputValue: '1+4+'
      }
      expectedState = {
        ...state,
        selectedSymbol: null,
        inputValue: '5',
        outputValue: '5'
      }

      expect(rootReducer(state, action)).toEqual(expectedState)
    })
  })

  describe('DOT_PRESS', () => {
    const action = { type: DOT_PRESS }
    let state, expectedState

    it('should insert "." into inputValue and make hasDot be true', () => {
      state = {
        ...initialState,
        inputValue: '1'
      }
      expectedState = {
        ...state,
        hasDot: true,
        inputValue: '1.'
      }
      expect(rootReducer(state, action)).toEqual(expectedState)
    })

    it('should not update state', () => {
      state = {
        ...initialState,
        hasDot: true,
        inputValue: '1.'
      }
      expectedState = state

      expect(rootReducer(state, action)).toEqual(expectedState)
    })

    it('should reset state with new inputValue "0." and make hasDot be true', () => {
      state = {
        ...initialState,
        inputValue: '5',
        outputValue: '5'
      }
      expectedState = {
        ...state,
        inputValue: '0.',
        outputValue: '',
        hasDot: true
      }
      expect(rootReducer(state, action)).toEqual(expectedState)
    })
  })

  describe('CLEAR_PRESS', () => {
    it('should reset state to initialState', () => {
      const action = { type: CLEAR_PRESS }
      const state = {
        ...initialState,
        selectedSymbol: null,
        inputValue: '4',
        outputValue: '4'
      }
      const expectedState = initialState

      expect(rootReducer(state, action)).toEqual(expectedState)
    })
  })
})

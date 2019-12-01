import { formatDisplayOutput, formatResult } from '../constants'

describe('constants', () => {
  it('should render correct value', () => {
    let inputValue = '-9'
    let outputValue = '-9'
    expect(formatDisplayOutput(inputValue, outputValue)).toBe(outputValue)

    inputValue = '1+2-3*'
    outputValue = ''
    expect(formatDisplayOutput(inputValue, outputValue)).toBe('3')

    outputValue = '999999'
    expect(formatDisplayOutput(outputValue, outputValue)).toBe('999,999')

    outputValue = 'Error'
    expect(formatDisplayOutput(outputValue, outputValue)).toBe('Error')
  })
})

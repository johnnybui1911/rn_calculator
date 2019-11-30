import numeral from 'numeral'
import { format } from 'mathjs'

export const palletes = {
  WHITE: '#fff',
  BUTTON_COLOR: '#d9d9d9'
}
export const inputButtons = {
  operators: ['/', '*', '+', '-', '='],
  numbers: [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ['C', 0, '.']
  ]
}
export const NUMBER_PRESS = 'NUMBER_PRESS'
export const OPERATOR_PRESS = 'OPERATOR_PRESS'
export const CLEAR_PRESS = 'CLEAR_PRESS'
export const DOT_PRESS = 'DOT_PRESS'
export const EQUAL_PRESS = 'EQUAL_PRESS'
export const MAX_SIZE_DISPLAY = 9
export const FONT_THRESHOLD = 6
export const REGEX = /[+*\/-]/g
export const LARGE_FONT = 88

export const formatResult = outputValue => {
  let formatOuput = ''
  formatOuput = format(outputValue, {
    precision: 9,
    upperExp: 9,
    lowerExp: -9
  })
  formatOuput =
    formatOuput.length > MAX_SIZE_DISPLAY && formatOuput.indexOf('e') > -1 ? parseFloat(formatOuput).toPrecision(FONT_THRESHOLD) : formatOuput
  formatOuput = formatOuput === 'Infinity' || formatOuput === 'NaN' ? 'Error' : formatOuput

  return formatOuput
}

export const formatDisplayOutput = (inputValue, outputValue) => {
  let displayValue = ''
  if (outputValue) {
    displayValue = outputValue
  } else {
    const replaceStr = inputValue.replace(REGEX, '|')
    const stringSplit = replaceStr.split('|')
    const lastSplitNull = stringSplit[stringSplit.length - 1] === ''
    displayValue = lastSplitNull ? stringSplit[stringSplit.length - 2] : stringSplit[stringSplit.length - 1]
  }
  const displaySplit = displayValue.split('.')
  const formatSplit = displaySplit[0] === 'Error' ? displaySplit[0] : numeral(displaySplit[0]).format('0,0')
  displayValue = displaySplit.length === 2 ? formatSplit + '.' + displaySplit[1] : formatSplit
  displayValue = displayValue.charAt(0) === '.' ? 0 + displayValue : displayValue
  return displayValue
}

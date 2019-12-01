import numeral from 'numeral'
import { format } from 'mathjs'

export const pallete = {
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
export const LARGE_FONT = 88
export const formatString = (outputValue, threshold) =>
  format(outputValue, {
    precision: threshold,
    upperExp: threshold,
    lowerExp: -threshold
  })

export const formatResult = outputValue => {
  let formatOuput = ''
  formatOuput = formatString(outputValue, MAX_SIZE_DISPLAY)
  formatOuput = formatOuput.length > MAX_SIZE_DISPLAY ? formatString(parseFloat(formatOuput), FONT_THRESHOLD) : formatOuput
  // recheck for case: 0.000*** -> the precision not fix to threhold size
  formatOuput = formatOuput.replace(/\D/g, '').length > MAX_SIZE_DISPLAY ? formatString(parseFloat(formatOuput), FONT_THRESHOLD - 2) : formatOuput
  formatOuput = formatOuput === 'Infinity' || formatOuput === 'NaN' ? 'Error' : formatOuput
  return formatOuput
}

export const formatDisplayOutput = (inputValue, outputValue) => {
  let displayValue = ''
  if (outputValue) {
    displayValue = outputValue
  } else {
    const replaceStr = inputValue.replace(/[+*\/-]/g, '|')
    const stringSplit = replaceStr.split('|')
    const lastSplitNull = stringSplit[stringSplit.length - 1] === ''
    displayValue = lastSplitNull ? stringSplit[stringSplit.length - 2] : stringSplit[stringSplit.length - 1]
  }

  const displaySplit = displayValue.split('.')
  let formatSplit = displaySplit[0]
  formatSplit = formatSplit.indexOf('e') > -1 || formatSplit === 'Error' ? formatSplit : numeral(displaySplit[0]).format('0,0')
  displayValue = displaySplit.length === 2 ? formatSplit + '.' + displaySplit[1] : formatSplit
  displayValue = displayValue.charAt(0) === '.' ? 0 + displayValue : displayValue
  return displayValue
}

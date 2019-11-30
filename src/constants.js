import numeral from 'numeral'

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

export const REGEX = /[+*\/-]/g
export const LARGE_FONT = 88

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

import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import Button from './Button'
import { inputButtons, LARGE_FONT, formatDisplayOutput, MAX_SIZE_DISPLAY, FONT_THRESHOLD } from './constants'
import styles from './styles'

export const Screen = ({ rootReducer }) => {
  const { inputValue, outputValue } = rootReducer
  const displayValue = formatDisplayOutput(inputValue, outputValue)
  const displayLength = displayValue.length > MAX_SIZE_DISPLAY ? MAX_SIZE_DISPLAY + 1 : displayValue.length // check length of display value
  const fontSize = displayLength > FONT_THRESHOLD ? LARGE_FONT - (displayLength % FONT_THRESHOLD) * 10 : LARGE_FONT // decrease fontSize when length > threshold

  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* Display Screen */}
      <View style={styles.displayContainer}>
        <Text style={[styles.output, { fontSize }]}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.numberButtonConatiner}>
          {inputButtons.numbers.map((row, index) => {
            return (
              // Numbers Buttons and "C", "." Buttons
              <View key={index} style={{ flex: 1, flexDirection: 'row' }}>
                {row.map(item => (
                  <Button key={item} item={item} />
                ))}
              </View>
            )
          })}
        </View>
        <View style={styles.operatorButtonConatiner}>
          <View style={{ flex: 1 }}>
            {inputButtons.operators.map(item => (
              // Operators Button  + - * /
              <Button key={item} item={item} isOperator />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
const mapStateToProps = state => ({
  rootReducer: state
})
export default connect(mapStateToProps)(Screen)

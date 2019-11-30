import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { inputButtons, LARGE_FONT, formatDisplayOutput } from './constants'
import styles from './styles'
import Button from './Button'

const Screen = ({ rootReducer }) => {
  const { inputValue, outputValue } = rootReducer

  const displayValue = formatDisplayOutput(inputValue, outputValue)
  const displayLength = displayValue.length > 9 ? 10 : displayValue.length
  const fontSize = displayLength > 6 ? LARGE_FONT - (displayLength % 6) * 10 : LARGE_FONT

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.displayContainer}>
        <Text style={[styles.output, { fontSize }]}>{displayValue}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.numberButtonConatiner}>
          {inputButtons.numbers.map((row, index) => {
            return (
              <View key={index} style={{ flex: 1, flexDirection: 'row' }}>
                {row.map(item => (
                  <Button key={item} item={item} isOperator />
                ))}
              </View>
            )
          })}
        </View>
        <View style={styles.operatorButtonConatiner}>
          <View style={{ flex: 1 }}>
            {inputButtons.operators.map(item => (
              <Button key={item} item={item} />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
const mapStateToProps = state => ({
  rootReducer: state.rootReducer
})
export default connect(mapStateToProps)(Screen)

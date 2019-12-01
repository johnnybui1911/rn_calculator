import { StyleSheet } from 'react-native'
import { pallete } from './constants'

export default StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: pallete.WHITE },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 12
  },
  buttonContainer: { flex: 1, flexDirection: 'row' },
  numberButtonConatiner: { flex: 3, paddingLeft: 6, paddingVertical: 6 },
  operatorButtonConatiner: { flex: 1, padding: 6 },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: pallete.BUTTON_COLOR,
    margin: 6,
    borderRadius: 6
  },
  output: { fontSize: 88 },
  input: { fontSize: 24 }
})

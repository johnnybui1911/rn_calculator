import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { initialState } from '../reducer'
import { Screen } from '../Screen'

const mockState = {
  inputValue: '999999999',
  outputValue: '999999999',
  selectedSymbol: null,
  hasDot: false
}

describe('Screen Rendering', () => {
  let component = shallow(<Screen rootReducer={initialState} />)
  it('should match to snapshot', () => {
    expect(toJson(component)).toMatchSnapshot('Default Font Snapshot')
  })

  component = shallow(<Screen rootReducer={mockState} />)
  it('should match to snapshot with mock state', () => {
    expect(toJson(component)).toMatchSnapshot('Small Font Snapshot')
  })
})

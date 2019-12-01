import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Button } from '../Button'

describe('Button', () => {
  describe('Button Rendering', () => {
    const mockData = {
      item: 1,
      isOperator: true
    }
    let wrapper = shallow(<Button {...mockData} />)
    it('should match to snapshot', () => {
      expect(toJson(wrapper)).toMatchSnapshot()
    })
  })

  let [pressNumber, pressEqual, pressClear, pressOperator, pressDot] = new Array(5).fill(jest.fn())
  describe('Button Interaction Dispatch Action', () => {
    let props

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call the press number function', () => {
      props = {
        item: 1,
        isOperator: true,
        pressNumber
      }
      wrapper = shallow(<Button {...props} />)
      const render = wrapper.find('TouchableOpacity').first()
      render.props().onPress()
      expect(pressNumber).toHaveBeenCalled()
      expect(pressNumber).toHaveBeenCalledTimes(1)
      expect(pressNumber).toHaveBeenCalledWith(1)
    })

    it('should call the press operator function', () => {
      const operator = '+'
      props = {
        item: operator,
        isOperator: false,
        pressOperator
      }
      wrapper = shallow(<Button {...props} />)
      const render = wrapper.find('TouchableOpacity').first()
      render.props().onPress()
      expect(pressOperator).toHaveBeenCalled()
      expect(pressOperator).toHaveBeenCalledTimes(1)
      expect(pressOperator).toHaveBeenCalledWith(operator)
    })

    it('should call the press equal function', () => {
      props = {
        item: '=',
        isOperator: false,
        pressEqual
      }
      wrapper = shallow(<Button {...props} />)
      const render = wrapper.find('TouchableOpacity').first()
      render.props().onPress()
      expect(pressEqual).toHaveBeenCalled()
      expect(pressEqual).toHaveBeenCalledTimes(1)
    })

    it('should call the press clear function', () => {
      props = {
        item: 'C',
        isOperator: false,
        pressClear
      }
      wrapper = shallow(<Button {...props} />)
      const render = wrapper.find('TouchableOpacity').first()
      render.props().onPress()
      expect(pressClear).toHaveBeenCalled()
      expect(pressClear).toHaveBeenCalledTimes(1)
    })

    it('should call the press dot function', () => {
      props = {
        item: '.',
        isOperator: false,
        pressDot
      }
      wrapper = shallow(<Button {...props} />)
      const render = wrapper.find('TouchableOpacity').first()
      render.props().onPress()
      expect(pressDot).toHaveBeenCalled()
      expect(pressDot).toHaveBeenCalledTimes(1)
    })
  })
})

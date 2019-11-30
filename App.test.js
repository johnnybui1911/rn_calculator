import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<App />)
      expect(component).toMatchSnapshot()
    })
  })
})

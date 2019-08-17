import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import { IntlProvider } from 'react-intl'
import AddFeedModal, {
  IAddFeedModalProps,
  IAddFeedModalState,
} from '../components/AddFeedModal'
import { intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('AddFeedModal Testing', () => {
  jest.useFakeTimers()
  jest.setTimeout(20 * 1000)
  const mockProps: IAddFeedModalProps = {
    onCancel: jest.fn(),
    onOk: jest.fn(),
    visible: true,
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount(<AddFeedModal {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    const componet = wrapper.getWrappingComponent()
    wrapper.setProps({
      visible: false,
    })
    wrapper.setProps({
      visible: true,
    })
    componet.setState({
      feedUrl: 'http://www.ruanyifeng.com/blog/atom.xml',
    })
    wrapper.find('input').simulate('change')
    wrapper.find('button.ant-btn-primary').simulate('click')
    const state = componet.state() as IAddFeedModalState
    expect(state.feedUrl).toBe('http://www.ruanyifeng.com/blog/atom.xml')
  })

  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(<AddFeedModal {...mockProps} />, {
      wrappingComponent: IntlProvider,
      wrappingComponentProps: intlProviderProps,
    })
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})

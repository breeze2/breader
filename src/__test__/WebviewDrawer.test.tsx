import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import WebviewDrawer, {
  IWebviewDrawerProps,
  IWebviewDrawerState,
} from '../components/WebviewDrawer'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('WebviewDrawer Testing', () => {
  jest.useFakeTimers()
  const mockProps: IWebviewDrawerProps = {
    onClose: jest.fn(),
    src: 'https://github.com',
    visible: true,
    width: 100,
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount(
      <WebviewDrawer {...mockProps} />
    ) as Enzyme.ReactWrapper<
      IWebviewDrawerProps,
      IWebviewDrawerState,
      WebviewDrawer
    >
    wrapper.instance().handleDrawerClose({})
    wrapper.instance().makeWebView(mockProps.src)
    wrapper.instance().showProgressBar()
    wrapper.instance().hideProgressBar()
  })

  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(<WebviewDrawer {...mockProps} />)
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})

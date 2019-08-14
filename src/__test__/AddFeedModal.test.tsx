import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import AddFeedModal, { IAddFeedModalProps } from '../components/AddFeedModal'
import { intl } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('AddFeedModal Testing', () => {
  jest.setTimeout(10 * 1000)
  const propsMock: IAddFeedModalProps = {
    onCancel: jest.fn(),
    onOk: jest.fn(),
    visible: true,
  }

  it('dom testing', () => {
    const wrapper = Enzyme.mount(<AddFeedModal {...propsMock} />, {
      context: { intl },
    })
    const instance = wrapper.find(AddFeedModal)
    wrapper.setProps({
      visible: false,
    })
    wrapper.setProps({
      visible: true,
    })
    instance.setState({
      feedUrl: 'http://www.ruanyifeng.com/blog/atom.xml',
    })
    wrapper.find('input').simulate('change')
    wrapper.find('button.ant-btn-primary').simulate('click')
    expect(instance.state().feedUrl).toBe(
      'http://www.ruanyifeng.com/blog/atom.xml'
    )
  })

  it('snapshot testing', () => {
    const wrapper = Enzyme.mount(<AddFeedModal {...propsMock} />, {
      context: { intl },
    })
    const tree = EnzymeToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})

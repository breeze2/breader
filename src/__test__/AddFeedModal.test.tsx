import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import { IntlProvider } from 'react-intl'
import TestRenderer from 'react-test-renderer'
import AddFeedModal, {
    IAddFeedModalProps,
} from '../components/AddFeedModal'
import { intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('AddFeedModal Testing', () => {
    const propsMock: IAddFeedModalProps = {
        onCancel: jest.fn(),
        onOk: jest.fn(),
        visible: true,
    }

    it('dom testing', () => {
        const wrapper = Enzyme.mount(
            <IntlProvider {...intlProviderProps}>
                <AddFeedModal {...propsMock} />
            </IntlProvider>
        )
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
        const wrapper = Enzyme.mount(
            <IntlProvider {...intlProviderProps}>
                <AddFeedModal {...propsMock} />
            </IntlProvider>
        )
        const tree = EnzymeToJson(wrapper)
        expect(tree).toMatchSnapshot()
    })
})

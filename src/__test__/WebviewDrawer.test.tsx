import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import WebviewDrawer, { IWebviewDrawerProps } from '../components/WebviewDrawer'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('WebviewDrawer Testing', () => {
    const propsMock: IWebviewDrawerProps = {
        onClose: jest.fn(),
        src: 'https://github.com',
        visible: true,
        width: 100,
    }

    it('dom testing', () => {
        const wrapper = Enzyme.mount(<WebviewDrawer {...propsMock} />)
        // wrapper.find('.drawer-header-left').simulate('click')
        wrapper.setProps({
            visible: false,
        })
    })

    it('snapshot testing', () => {
        const wrapper = Enzyme.mount(<WebviewDrawer {...propsMock} />)
        const tree = EnzymeToJson(wrapper)
        expect(tree).toMatchSnapshot()
    })
})

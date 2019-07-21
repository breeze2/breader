import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import ReactDOM from 'react-dom'
import WebviewDrawer, { IWebviewDrawerProps } from '../components/WebviewDrawer'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('WebviewDrawer Testing', () => {
    const propsMock: IWebviewDrawerProps = {
        onClose: jest.fn(),
        src: 'https://github.com',
        visible: true,
        width: 100,
    }

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<WebviewDrawer {...propsMock} />, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('react tree snapshot testing', () => {
        const component = Enzyme.mount(<WebviewDrawer {...propsMock} />)
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})

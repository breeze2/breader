import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import ReactDOM from 'react-dom'
import ProgressBar, { IProgressBarProps } from '../components/ProgressBar'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ProgressBar Testing', () => {
    const porpsMock: IProgressBarProps = {
        max: 80,
        time: 2,
    }

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ProgressBar {...porpsMock} />, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('react tree snapshot testing', () => {
        const component = Enzyme.mount(<ProgressBar {...porpsMock} />)
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})

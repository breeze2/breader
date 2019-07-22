import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import React from 'react'
import { InjectedIntlProps, IntlProvider } from 'react-intl'
import AddFeedModal, {
    IAddFeedModalProps,
    IAddFeedModalState,
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
        const component = Enzyme.mount(
            <IntlProvider {...intlProviderProps}>
                <AddFeedModal {...propsMock} />
            </IntlProvider>
        )
    })

    it('snapshot testing', () => {
        const component = Enzyme.mount(
            <IntlProvider {...intlProviderProps}>
                <AddFeedModal {...propsMock} />
            </IntlProvider>
        )
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})

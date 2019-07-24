import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import { ISettingsModalProps } from '../components/SettingsModal'
import SettingsModal from '../containers/SettingsModal'
import store from '../redux'
import { IFeed } from '../schemas'
import { intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('SettingsModal Testing', () => {
    const propsMock: ISettingsModalProps = {
        asyncDeleteFeeds: jest.fn(),
        feeds: Immutable.List<IFeed>([]),
        language: 'en-US',
        onClose: jest.fn(),
        onLanguageChange: jest.fn(),
        setLanguage: jest.fn(),
        visible: true,
    }

    it('dom testing', () => {
        const wrapper = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <SettingsModal {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
    })

    it('snapshot testing', () => {
        const wrapper = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <SettingsModal {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
        const tree = EnzymeToJson(wrapper)
        expect(tree).toMatchSnapshot()
    })
})

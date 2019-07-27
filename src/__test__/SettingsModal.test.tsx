import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import SettingsModalBase, {
    ISettingsModalOwnProps,
    ISettingsModalProps,
} from '../components/SettingsModal'
import SettingsModal from '../containers/SettingsModal'
import store from '../redux'
import { IFeed } from '../schemas'
import { feed, intl, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('SettingsModal Testing', () => {

    it('dom testing', () => {
        const propsMock: ISettingsModalProps = {
            asyncDeleteFeeds: jest.fn(),
            feeds: Immutable.List<IFeed>([feed]),
            language: 'en-US',
            onClose: jest.fn(),
            onLanguageChange: jest.fn(),
            setLanguage: jest.fn(),
            visible: true,
        }
        const wrapper = Enzyme.mount(
            <SettingsModalBase {...propsMock} />,
            { context: { intl } }
        )
        wrapper.setProps({
            visible: false,
        })
        wrapper.setProps({
            visible: true,
        })
        wrapper.setState({
            allFeeds: [feed],
            needDeletedIds: [feed._id],
        })
        wrapper.update()
    })

    it('snapshot testing', () => {
        const propsMock: ISettingsModalOwnProps = {
            onClose: jest.fn(),
            onLanguageChange: jest.fn(),
            visible: true,
        }
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

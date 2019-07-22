import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import { IAppMenuProps } from '../components/AppMenu'
import AppMenu from '../containers/AppMenu'
import store from '../redux'
import { IFeed } from '../schemas'
import { feedProps, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('AppMenu Testing', () => {
    const propsMock: IAppMenuProps = {
        asyncFetchArticles: jest.fn(),
        asyncFetchFeeds: jest.fn(),
        asyncParseFeed: jest.fn(),
        asyncSelectMenuKey: jest.fn(),
        asyncUpdateFeeds: jest.fn(),
        setFeedFavicon: jest.fn(),
        setIsCreatingFeed: jest.fn(),
        setIsFetchingArticles: jest.fn(),
        setIsUpdatingFeeds: jest.fn(),
        updateOnlineStatus: jest.fn(),

        feeds: Immutable.List<IFeed>([feedProps]),
        feedsMap: Immutable.Map<IFeed>({
            [feedProps._id]: feedProps,
        }),
        isCreatingFeed: false,
        isUpdatingFeeds: false,
        onlineStatus: false,
        selectedMenuKey: 'ALL_ITEMS',
    }

    it('dom testing', () => {
        const component = Enzyme.shallow(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <AppMenu {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
    })

    // it('snapshot testing', () => {
    //     const component = Enzyme.mount(
    //         <ReduxProvider store={store}>
    //             <IntlProvider {...intlProviderProps}>
    //                 <AppMenu {...propsMock} />
    //             </IntlProvider>
    //         </ReduxProvider>
    //     )
    //     const tree = EnzymeToJson(component)
    //     expect(tree).toMatchSnapshot()
    // })
})

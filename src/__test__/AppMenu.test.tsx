import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import TestRenderer from 'react-test-renderer'
import AppMenu from '../containers/AppMenu'
import { setFeedsAction, updateOnlineStatusAction } from '../redux/actions'
import { feed, intlProviderProps, store } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('AppMenu Testing', () => {
    const dispatch = store.dispatch

    it('dom testing', () => {
        const wrapper = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <AppMenu />
                </IntlProvider>
            </ReduxProvider>
        )
        dispatch(setFeedsAction([feed]))
        dispatch(updateOnlineStatusAction())
        wrapper.update()
        const instance = wrapper.find(AppMenu)
        // instance.find('.feed-title').first().simulate('click')
        instance.find('.add-rss').first().simulate('click')
        wrapper.unmount()
    })

    it('snapshot testing', () => {
        const renderer = TestRenderer.create(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <AppMenu />
                </IntlProvider>
            </ReduxProvider>
        )
        const tree = renderer.toJSON()
        // expect(tree).toMatchSnapshot()
    })
})

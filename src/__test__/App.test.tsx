import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import React from 'react'
import App, { IAppProps, IAppState } from '../App'
import store from '../redux'
import { setArticlesAction, setCurrentArticleAction, setFeedsAction } from '../redux/actions'
import { article, feed } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('App Testing', () => {

    it('dom testing', () => {
        const wrapper = Enzyme.mount<
            React.Component,
            IAppProps,
            IAppState
        >(<App />)
        wrapper.setState({
            isSettingsModalVisible: true,
        })
        wrapper.setState({
            language: 'zh-CN',
        })
        store.dispatch(setFeedsAction([feed]))
        store.dispatch(setArticlesAction([article]))
        store.dispatch(setCurrentArticleAction(article))

        expect(wrapper.state().isSettingsModalVisible).toBe(true)
        expect(wrapper.state().language).toBe('zh-CN')

    })
})

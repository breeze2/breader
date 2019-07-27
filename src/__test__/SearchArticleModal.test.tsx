import { Input } from 'antd'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import { IntlProvider } from 'react-intl'
import { Provider as ReduxProvider } from 'react-redux'
import SearchArticleModalBase, {
    ISearchArticleModalOwnProps,
    ISearchArticleModalProps,
} from '../components/SearchArticleModal'
import SearchArticleModal from '../containers/SearchArticleModal'
import store from '../redux'
import { IArticle } from '../schemas'
import { article, intl, intlProviderProps } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('SearchArticleModal Testing', () => {

    // it('renders without crashing', () => {
    //     const div = document.createElement('div')
    //     ReactDOM.render(
    //         <IntlProvider {...intlProviderProps} >
    //             <SearchArticleModal {...propsMock} />
    //         </IntlProvider>,
    //         div
    //     )
    //     ReactDOM.unmountComponentAtNode(div)
    // })

    it('dom testing', () => {
        const propsMock: ISearchArticleModalProps = {
            articles: Immutable.List<IArticle>([article]),
            onCancel: jest.fn(),
            onItemChoose: jest.fn(),
            visible: true,
        }
        const wrapper = Enzyme.mount(
            <SearchArticleModalBase {...propsMock} />,
            {context: {intl}}
        )
        wrapper.setProps({
            visible: false,
        })
        wrapper.setProps({
            visible: true,
        })
        wrapper.update()
        wrapper.find('input').simulate('change')
        wrapper.setState({
            keywords: 'article title',
        })
        wrapper.setState({
            matchedArticles: Immutable.List<IArticle>([article]),
        })
    })

    it('snapshot testing', () => {
        const propsMock: ISearchArticleModalOwnProps = {
            onCancel: jest.fn(),
            onItemChoose: jest.fn(),
            visible: true,
        }
        const component = Enzyme.mount(
            <ReduxProvider store={store}>
                <IntlProvider {...intlProviderProps}>
                    <SearchArticleModal {...propsMock} />
                </IntlProvider>
            </ReduxProvider>
        )
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})

import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import SearchArticleModal, {
    ISearchArticleModalProps,
} from '../components/SearchArticleModal'
import { IArticle } from '../schemas'
import { article, intl } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('SearchArticleModal Testing', () => {
    const propsMock: ISearchArticleModalProps = {
        articles: Immutable.List<IArticle>([article]),
        onCancel: jest.fn(),
        onItemChoose: jest.fn(),
        visible: true,
    }

    it('dom testing', () => {
        const wrapper = Enzyme.mount(
            <SearchArticleModal {...propsMock} />,
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
        const component = Enzyme.mount(
            <SearchArticleModal {...propsMock} />,
            { context: { intl } }
        )
        const tree = EnzymeToJson(component)
        expect(tree).toMatchSnapshot()
    })
})

import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import EnzymeToJson from 'enzyme-to-json'
import Immutable from 'immutable'
import React from 'react'
import ArticleItem, { IArticleItemProps } from '../components/ArticleItem'
import { IFeed } from '../schemas'
import { feed, intl } from './MockData'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe('ArticleItem Testing', () => {
    const propsMock: IArticleItemProps = {
        author: 'Author',
        feedId: feed._id,
        feedsMap: Immutable.Map<IFeed>({[feed._id]: feed}),
        guid: 'guid',
        key: 1,
        summary: 'summary',
        time: 1563726737427,
        title: 'Title',
    }

    it('dom testing', () => {
        const wrapper = Enzyme.shallow<
            React.Component,
            IArticleItemProps
        >(<ArticleItem {...propsMock} />, {
            context: { intl },
        })
        expect(wrapper.props().author).toBe('Author')
    })

    it('snapshot testing', () => {
        const wrapper = Enzyme.mount(<ArticleItem {...propsMock} />, {
            context: { intl },
        })
        const tree = EnzymeToJson(wrapper)
        // expect(tree).toMatchSnapshot()
    })
})

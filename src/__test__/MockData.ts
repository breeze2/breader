import { createIntl, createIntlCache } from 'react-intl'
import { messages } from '../locales'
import { IArticle, IFeed } from '../schemas'

const cache = createIntlCache()

export const domNode = document.createElement('div')
document.body.appendChild(domNode)

export const intlProviderProps = {
  defaultLocale: 'en-US',
  locale: 'en-US',
  messages: messages['en-US'],
}
export const intl = createIntl(intlProviderProps, cache)

export const feed: IFeed = {
  _id: 'https://breeze2.github.io/blog/atom.xml',
  _rev: '2-0af48b1987682ae7d7128fecbd0feb4a',
  author: 'Linyifeng',
  categories: [],
  createTime: 1575123471750,
  deleteTime: 0,
  description: '林柏格',
  etag: '5d91672a-72e58"',
  favicon: 'https://breeze2.github.io/favicon.ico',
  generator: 'Hexo (http://hexo.io/)',
  language: '',
  link: 'https://breeze2.github.io/blog/',
  publishTime: 1569810157082,
  time: 1569810157082,
  title: 'Lin Blog',
  url: 'https://breeze2.github.io/blog/atom.xml',
}

export const article: IArticle = {
  _id: 'https://breeze2.github.io/blog/scheme-refresh-timeliness-cache.html',
  _rev: '2-d02f6ea35c34e71d79d98e08df251181',
  author: 'Linyifeng',
  categories: [],
  comments: 'article comments',
  createTime: 1575123478266,
  deleteTime: 0,
  description: 'article description',
  enclosures: [],
  feedId: 'https://breeze2.github.io/blog/atom.xml',
  image: '',
  isStarred: false,
  isUnread: true,
  link: 'https://breeze2.github.io/blog/scheme-refresh-timeliness-cache.html',
  originLink: '',
  publishTime: 1515403382000,
  summary: 'article summary',
  time: 1569810157086,
  title: '动态更新时效性缓存的一个解决方案',
}

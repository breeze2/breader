import { IntlProvider } from 'react-intl'
import { messages } from '../locales'
import { IArticle, IFeed } from '../schemas'

export const intlProviderProps: IntlProvider.Props = {
  locale: 'en-US',
  messages: messages['en-US'],
}

const intlProvider = new IntlProvider(intlProviderProps, {})
export const intl = intlProvider.getChildContext().intl

export const feed: IFeed = {
  _id: 'http://www.ruanyifeng.com/blog/atom.xml',
  _rev: '5-55772bf2b4d4b74608a60ac3480334e4',
  author: 'ruanyifeng',
  categories: [],
  createTime: 1563686468437,
  deleteTime: 0,
  description: "Ruan YiFeng's Blog",
  etag: '"11d86-58e2cc1eab031"',
  favicon: 'http://www.ruanyifeng.com/favicon.ico',
  generator: 'Movable Type 5.2.2 (http://www.sixapart.com/movabletype/)',
  language: '',
  link: 'http://www.ruanyifeng.com/blog/',
  publishTime: 1563697765000,
  time: 1563697765000,
  title: '阮一峰的网络日志',
  url: 'http://www.ruanyifeng.com/blog/atom.xml',
}

export const article: IArticle = {
  _id: 'tag:www.ruanyifeng.com,2019:/blog//1.2100',
  _rev: '5-ff6fc450616071a8f7d022b7532e85aa',
  author: 'ruanyifeng',
  categories: [],
  comments: 'article comments',
  createTime: 1563697765000,
  deleteTime: 0,
  description: 'article description',
  enclosures: [],
  feedId: 'http://www.ruanyifeng.com/blog/atom.xml',
  image: '',
  isDayFirst: true,
  isStarred: false,
  isUnread: false,
  link: 'http://www.ruanyifeng.com/blog/2019/07/weekly-issue-65.html',
  originLink: '',
  publishTime: 1563697765000,
  summary: 'article summary',
  time: 1563697765000,
  title: 'article title',
}

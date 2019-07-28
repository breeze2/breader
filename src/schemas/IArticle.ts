import { Enclosure } from 'feedparser'

export interface IArticle {
    _id: string
    _rev: string
    author: string
    categories: string[]
    comments: string
    createTime: number
    deleteTime: number
    description: string
    enclosures: Enclosure[]
    feedId: string
    image: string
    index?: number
    isDayFirst?: boolean
    isStarred: boolean
    isUnread: boolean
    link: string
    originLink: string
    publishTime: number
    summary: string
    time: number
    title: string
}

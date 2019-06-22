import { IArticle } from './IArticle'
export interface IFeed {
    id?: number
    title?: string
    link: string
    url: string
    date?: Date
    date_time?: string
    etag?: string
    description?: string
    favicon?: string
    summary?: string
    deleted_at?: number
    articles?: IArticle[]
}

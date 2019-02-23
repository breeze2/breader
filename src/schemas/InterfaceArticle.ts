export default interface InterfaceFeedArtilce {
    author: string
    // categories?: string[]
    // comments?: string
    created_at?: number
    date: string
    feedId?: number
    time: string
    description?: string
    // enclosures?: InterfaceFeedEnclosure[]
    guid: string
    // image?: InterfaceFeedImage
    is_starred?: number
    is_unread?: number
    link: string
    // origlink?: string
    // permalink?: string
    // pubdate: string
    // source?: InterfaceFeedSource
    summary: string
    title: string
    updated_at?: number
};

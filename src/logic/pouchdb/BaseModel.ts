import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind)

export default class BaseModel<Type> {
    private _db: PouchDB.Database<Type>
    private _createIndexResponseMap: {[indexName: string]: Promise<PouchDB.Find.CreateIndexResponse<Type>>}
    public constructor(name: string, createIndexOptionsList: PouchDB.Find.CreateIndexOptions[]) {
        this._db = new PouchDB<Type>(name, { adapter: 'idb' })
        this._createIndexResponseMap = {}
        createIndexOptionsList.forEach(options => {
            const indexName = options.index.name ? options.index.name : options.index.fields.toString()
            options.index.name = indexName
            this._createIndexResponseMap[indexName] = this.createIndex(options)
        })
    }
    public get(id: string) {
        return this._db.get(id)
    }
    public put(doc: Type) {
        return this._db.put(doc)
    }
    public post(doc: Type) {
        return this._db.post(doc)
    }
    public batchPost(docs: Type[]) {
        return this._db.bulkDocs(docs)
    }
    public batchGet(options: PouchDB.Core.BulkGetOptions) {
        return this._db.bulkGet(options);
    }
    public createIndex(options: PouchDB.Find.CreateIndexOptions) {
        return this._db.createIndex(options)
    }
    public async beforeFind(options: PouchDB.Find.FindRequest<Type>, indexNames: string[]) {
        const responses: Array<Promise<PouchDB.Find.CreateIndexResponse<Type>>> = []
        indexNames.forEach(indexName => {
            if (this._createIndexResponseMap[indexName]) {
                responses.push(this._createIndexResponseMap[indexName])
            }
        })
        return Promise.all(responses)
    }
    public async find(options: PouchDB.Find.FindRequest<Type>, indexNames: string[]) {
        await this.beforeFind(options, indexNames)
        const result = this._db.find(options)
        return result
    }
    // public async findOne(query: PouchDB.Find.Selector, sorts: Array<(string | { [propName: string]: "asc" | "desc" })> | undefined, indexNames: string[]) {
    //     const result = await this.find({
    //         limit: 1,
    //         selector: query,
    //         sort: sorts,
    //     }, indexNames)
    //     if (result.docs.length) {
    //         return result.docs[0] as Type
    //     }
    //     return null
    // }
    // public async findAll(query: PouchDB.Find.Selector, sorts: Array<(string | { [propName: string]: "asc" | "desc" })> | undefined, indexName: string[]) {
    //     const result = await this.find({
    //         selector: query,
    //         sort: sorts,
    //     }, indexName)
    //     return result.docs as Type[]
    // }
}

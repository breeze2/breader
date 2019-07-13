import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind)

export default class BaseModel<Type> {
    private _db: PouchDB.Database<Type>
    private _createIndexResponseList: Array<Promise<PouchDB.Find.CreateIndexResponse<Type>>>
    public constructor(name: string, createIndexOptionsList: PouchDB.Find.CreateIndexOptions[]) {
        this._db = new PouchDB<Type>(name, { adapter: 'idb' })
        this._createIndexResponseList = []
        createIndexOptionsList.forEach(options => {
            this._createIndexResponseList.push(this.createIndex(options))
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
    public all(options?: PouchDB.Core.AllDocsWithKeyOptions | PouchDB.Core.AllDocsOptions | PouchDB.Core.AllDocsWithKeysOptions | PouchDB.Core.AllDocsWithinRangeOptions) {
        return this._db.allDocs(options)
    }
    public createIndex(options: PouchDB.Find.CreateIndexOptions) {
        return this._db.createIndex(options)
    }
    public async beforeFind(options: PouchDB.Find.FindRequest<Type>) {
        return Promise.all(this._createIndexResponseList)
    }
    public async find(options: PouchDB.Find.FindRequest<Type>) {
        await this.beforeFind(options)
        const result = this._db.find(options)
        return result
    }
}

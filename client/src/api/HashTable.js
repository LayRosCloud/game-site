import index from './index'
class HashTable{
    static #collection = [];

    static addToCollection(key, item) {
        this.#collection[key] = item;
    }

    static getCollection() {
        return this.#collection;
    }
    static getValue(key){
        return this.#collection[key]
    }
}

export default HashTable
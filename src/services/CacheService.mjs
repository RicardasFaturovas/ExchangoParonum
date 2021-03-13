export class LRUCache {
    constructor() {
        this.max = 2;
        this.cacheStorage = new Map();
    }

    get(key) {
        let value = this.cacheStorage.get(key);
        if (value) {
            this.cacheStorage.delete(key);
            this.cacheStorage.set(key, value);
        }
        return value;
    }

    set(key, value) {
        if (this.cacheStorage.has(key)) {
            this.cacheStorage.delete(key);
        }
        else if (this.cacheStorage.size == this.max) {
            this.cacheStorage.delete(this.getFirst());
        }
        this.cacheStorage.set(key, value);
    }

    getFirst() {
        return this.cacheStorage.keys().next().value;
    }
}
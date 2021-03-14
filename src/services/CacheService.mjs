import { CACHE_MAX_CAPACITY } from '../config/serverConfig.mjs';

export class LRUCache {
    constructor() {
        this.max = CACHE_MAX_CAPACITY;
        this.cacheStorage = new Map();
    }

    getValue(key) {
        let value = this.cacheStorage.get(key);
        if (value) {
            this.cacheStorage.delete(key);
            this.cacheStorage.set(key, value);
        }
        return value;
    }

    setValue(key, value) {
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
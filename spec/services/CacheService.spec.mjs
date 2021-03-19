import { LRUCache } from '../../src/services/CacheService.mjs';

describe('CacheService', () => {
    let lruCache;

    beforeEach(() => {
        const maxCapacity = 2;
        lruCache = new LRUCache(maxCapacity);
    });

    describe('getValue', () => {
        it('should return value if it exists in cache', () => {
            lruCache.setValue('test', 1);
            const result = lruCache.getValue('test');

            expect(result).toBe(1);
        });
    });

    describe('setValue', () => {
        it('should set new value if old value exists', () => {
            lruCache.setValue('test', 1);
            lruCache.setValue('test', 2);
            const result = lruCache.getValue('test');

            expect(result).toBe(2);
        });

        it('should remove least recently used value when capacity is maxed ', () => {
            lruCache.setValue('test', 1);
            lruCache.setValue('test2', 2);
            lruCache.setValue('test3', 2);

            const removedResult = lruCache.getValue('test');
            const result = lruCache.getValue('test2');

            expect(removedResult).toBeUndefined();
            expect(result).toBe(2);
        });

        it('should remove least recently used value when capacity is maxed and a value has been used', () => {
            lruCache.setValue('test', 1);
            lruCache.setValue('test2', 2);
            lruCache.getValue('test');
            lruCache.setValue('test3', 3);

            const result = lruCache.getValue('test');
            const removedResult = lruCache.getValue('test2');

            expect(result).toBe(1);
            expect(removedResult).toBeUndefined();

        });
    });
});
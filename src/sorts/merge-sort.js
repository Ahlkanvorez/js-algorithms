const funnel = (lessThan = (a, b) => a < b) => {
    const lesser = (a, b) => lessThan(a.result.value, b.result.value) ? a : b;
    return function* (lists) {
        // Only work with non-empty lists.
        lists = lists.filter(a => a.length > 0);

        // Keep a record of the lists which still have values.
        const nonEmptyLists = new Set(lists);

        // Associate each list with its iterator.
        lists = lists.map(list => ({
            list,
            iterator: list[Symbol.iterator]()
        }));

        // Use a WeakMap because references needn't be maintained after this
        // computation is completed.
        const cache = new WeakMap();

        const toFirstValues = ({ list, iterator }) => (cache.has(list)
            ? { list, result: cache.get(list) }
            : { list, result: cache.set(list, iterator.next()).get(list) });
        const notDone = ({ list, result: { value, done } }) => {
            if (done) {
                nonEmptyLists.delete(list);
            }
            return !done && value !== undefined;
        };

        // Continue yielding values until there are no more iterators with
        // values remaining.
        while (nonEmptyLists.size > 0) {
            lists = lists
                .filter(({ list, iterator }) => nonEmptyLists.has(list));
            const vals = lists.map(toFirstValues).filter(notDone);
            if (vals && vals.length > 0) {
                const min = vals.reduce(lesser);

                // Un-cache the least value, so that it is not considered in the
                // next round.
                cache.delete(min.list);
                yield min.result.value;
            }
        }
    };
};

const partition = (n = 2) => list => {
    let parts = [];
    let N = Math.ceil(list.length / n);
    for (let i = 0; N * i < list.length; ++i) {
        parts.push(list.slice(N * i, N * (i + 1)));
    }
    return parts;
};

const merge = (lessThan = (a, b) => a < b) =>
    lists => [ ...funnel(lessThan)(lists) ];

function sort (n = 2) {
    const split = partition(n);
    return function sortWithCmp (lessThan = (a, b) => a < b) {
        const mergeParts = merge(lessThan);
        return function sort (data) {
            return (data.length === 1)
                    ? data
                    : mergeParts(split(data).map(sort));
        };
    }
}

export { sort, merge, partition, funnel };
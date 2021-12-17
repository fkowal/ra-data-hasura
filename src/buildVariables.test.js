import buildVariables from './buildVariables';

test('buildVariables', () => {
    let filter = buildVariables(undefined)({ type: { fields: [] } }, 'GET_LIST', {
        filter: {
            'a#b#c': ['v1'],
            'col@like': 'v2',
            'd#e@ilike,f@similar': 'v3'
        },
        pagination: {
            perPage: 8,
            page: 2
        },
        sort: {
            field: 'sort_by_field',
            order: 'DESC'
        }
    });
    expect(filter).toEqual({
        where: {
            _and: [
                { a: { b: { c: { _in: ['v1'] } } } },
                { col: { like: '%v2%' } },
            ],
            _or: [
                { d: { e: { ilike: '%v3%' } } },
                { f: { similar: 'v3' } }
            ]
        },
        limit: 8,
        offset: 8,
        order_by: { sort_by_field: 'desc'}
    })
});

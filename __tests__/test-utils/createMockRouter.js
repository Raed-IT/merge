export const createMockRouter = (overrides) => ({
    basePath: '',
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
    },
    isFallback: false,
    ...overrides,
});
// اختبار بسيط للتأكد من أن Jest يعمل بشكل صحيح
test('dummy test', () => {
    expect(true).toBe(true);
});
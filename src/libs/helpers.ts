export function isAccessor<T>(value: unknown): value is () => T {
    return typeof value === 'function';
}

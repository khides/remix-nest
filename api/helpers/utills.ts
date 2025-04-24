export async function promiseAll<T extends readonly unknown[]>(
    values: readonly [...{ [K in keyof T]: Promise<T[K]> }]
): Promise<T> {
    return Promise.all(values) as Promise<T>;
}

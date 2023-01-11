
export const notEmptyArray =
	<T>(arr: (T | undefined | null)[]): T[] => arr.filter((it: T | null | undefined) => it) as T[]

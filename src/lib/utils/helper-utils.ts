export function splitString(str: string, delimiter: string): string[] {
	if (!str) return [];
	if (!delimiter) return [str];
	return str.split(delimiter);
}

export function transformPathToTitle(path: string): string {
	const segments = splitString(path, '-').join(' ');
	return segments;
}

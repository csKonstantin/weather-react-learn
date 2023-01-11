export const emailRegex = /^[^@]+@[^@]+$/ // eslint-disable-line
export const emailListRegex = /^[^@,]+@[^@,]+(,[^@,]+@[^@,]+)*$/ // eslint-disable-line

export function getEmailsFromString(str: string): string[] {
	if (!str) return []

	const parts = str.trim().split(',')

	return parts.filter(p => emailRegex.test(p))
}

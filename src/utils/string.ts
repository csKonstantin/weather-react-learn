export const SPECIAL_SYMBOLS_REGEX = /[$&+,:;=?@#|'<>.\-^*()%![\]{}_±§~`"/]+/g

export const getInitials = (str: string) => {
	const clearStr = str.replace(SPECIAL_SYMBOLS_REGEX, '').replace(/[\s]+/g, ' ').trim().toUpperCase()

  if (!clearStr) return ''

  const words = clearStr.split(' ')

	return `${words[0][0]}${words[1]?.[0] || ''}`
}

export const getValueList = (str: string, sep: string = ',') => str.split(sep).map(v => v.trim())

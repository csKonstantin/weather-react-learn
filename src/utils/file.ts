const sizes = [
	'Bytes',
	'Kb',
	'Mb',
	'Gb',
	'Tb',
]

export const bytesToSize = (bytes: number): string => {
  if (bytes === 0) return `0 ${sizes[0]}`

  const sizeIdx = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = Math.round(bytes / Math.pow(1024, sizeIdx))

  return `${size} ${sizes[sizeIdx]}`
}

export const guessFileType = (name: string) => {
	const ext = name.split('.').pop()

	return ext || 'default'
}


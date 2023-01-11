export const saveKey = (key: string, value: any) => {
  try {
    const serializedValue = JSON.stringify(value)

    global.localStorage?.setItem(key, serializedValue)
  } catch (error) {
    console.log(error)
  }
}

export const loadKey = (key: string): any => {
  try {
    const serializedValue = global.localStorage?.getItem(key)

    return serializedValue && JSON.parse(serializedValue)
  } catch (error) {
    return undefined
  }
}

export const removeKey = (key: string) => global.localStorage?.removeItem(key)

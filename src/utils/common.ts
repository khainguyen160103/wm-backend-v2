export const arrayToMap = <T extends object>(
  array: T[] = [],
  mapFunction: (
    item: T,
    index?: number,
    result?: { [x: string]: any; [y: number]: any }
  ) => { key: string | number; value: any } | void
) => {
  const result: any = {}
  for (let index = 0; index < array.length; index++) {
    const r = mapFunction(array[index], index, result)
    if (r) {
      const { key, value } = r
      if (key !== undefined) result[key] = value
    }
  }
  return result
}

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

export function randomString(max): string {
  return Math.random().toString(36).slice(-max)
}

export function randomColor(): string {
  const colors = ['#2980b9', '#2ecc71', '#1abc9c', '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#9b59b6', '#34495e']
  return colors[Math.floor(Math.random() * colors.length)]
}

type GroupedType<T> = { [key: string]: T[] }

function groupBy<T, K extends keyof T>(data: T[], key: K): GroupedType<T> {
  return data.reduce<GroupedType<T>>((acc, item:any) => {
    const groupKey = item[key] 

    if (!acc[groupKey]) {
      acc[groupKey] = []
    }

    acc[groupKey].push(item)
    return acc
  }, {})
}
export default groupBy
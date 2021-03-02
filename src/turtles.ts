export const TURTLES = "turtle::"

export function prepareTurtlesQuery(data: any, fieldName: any, turtleName: any): Object {
  let turtle: any = {}
  if (fieldName === turtleName) {
    return turtle;
  }
  let {keys, values } = JSON.parse(data[turtleName].value)
  keys.forEach((e: string, i: number) => turtle[e] = values[i])
  return turtle;
}
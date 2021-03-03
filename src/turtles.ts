import { Turtle } from "./types";

export const TURTLES = "turtle::"

export function prepareTurtlesQuery(data: any, fieldName: any, turtleName: any, queryResponse: any): Object {
  let turtles: Turtle = {
    dimension: {},
    measure: {},
    data: []
  }
  if (fieldName === turtleName) {
    return turtles;
  }
  let turtleField = queryResponse.fields.measure_like.filter((e: any) => e.is_turtle )[0]
  let turtleDimension = turtleField.turtle_dimension

  turtles.dimension.label = turtleDimension.label
  turtles.dimension.name = turtleDimension.name.replace('.', '_')
  turtles.dimension.isTimeframe = turtleDimension.isTimeframe

  turtles.measure.name = turtleField.name
  turtles.measure.label = turtleField.label

  let { keys, values } = data[turtleName]._parsed
  keys.forEach((e: string, i: number) => { 
    turtles.data.push({
      [turtleDimension.name.replace('.', '_')]: e,
      [turtleName]: values[i] 
    })
  })

  return turtles;
}
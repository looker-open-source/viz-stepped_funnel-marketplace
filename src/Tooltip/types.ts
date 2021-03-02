import { Chunk } from "../types"

export interface TooltipState {
  datum?: Chunk
  type?: any
  visible: boolean
  x: number
  y: number
}

export const defaultTooltipState: TooltipState = {
  datum: undefined,
  type: "default",
  visible: false,
  x: 0,
  y: 0,
}

export interface TooltipField {
  datum: Chunk,
  fields: { 
    [key: string]: String 
  };
}




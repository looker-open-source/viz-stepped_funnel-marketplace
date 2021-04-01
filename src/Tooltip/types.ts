import { Chunk } from "../types"


export interface TooltipState {
  datum?: Chunk
  visible: boolean
  x: number
  y: number
}

export const defaultTooltipState: TooltipState = {
  datum: undefined,
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




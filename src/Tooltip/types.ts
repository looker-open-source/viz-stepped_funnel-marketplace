import { Chunk, VisConfig } from "../types"

export interface TooltipState {
  datum?: Chunk
  chartType: string
  scale?: string
  visible: boolean
  x: number
  y: number
}

export const defaultTooltipState: TooltipState = {
  chartType: "default",
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




import styled from "styled-components"
import {Chunk, VisConfig} from "../../types"

export interface LeftAxisContainerProps {
  width: number
}

export interface RightAxisContainerProps {
  width: number
}

export interface LeftAxisProps {
  data: Chunk[]
  config: VisConfig
  element: HTMLElement
  width: number
  stepHeight: number
}

export interface RightAxisProps {
  data: Chunk[]
  config: VisConfig
  element: HTMLElement
  width: number
  stepHeight: number
}

export interface AxisContainerProps {
  height: number
}

export const LeftAxisContainer = styled.div`
  height: 100%;
  width: ${(props: LeftAxisContainerProps) => props.width * 100}%;
  float: left;
`

export const AxisSubLabel = styled.span`
  display: table-cell; 
  vertical-align: middle;
  // TODO: Label Scale option
  font-size: 0.9em;
  color: rgb(149, 149, 149);
`

export const AxisContainer = styled.div`
  text-align: center;
  display: table; 
  overflow: hidden;
  float: left;
  margin: 0;
  width: 100%;
  height: ${(props: AxisContainerProps) => props.height}px;
`

export const RightAxisContainer = styled.div`
  height: 100%;
  width: ${(props: RightAxisContainerProps) => props.width * 100}%;
  float: left;
`

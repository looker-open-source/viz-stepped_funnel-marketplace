import { Chunk, Link, VisConfig } from "../types"
import styled from "styled-components"

export const ChartWrapper = styled.div`
  height: 100%;
  font-family: Roboto;
`
export const FunnelStepWrapper = styled.div`
  width: 100%;
  display: inline-block;
  height: ${(props: FunnelStepWrapperProps) => props.height}px;
`
export const FunnelStep = styled.div`
  margin: auto;
  // TODO: Step border size option
  border: 3px solid white;
  width: ${(props: FunnelStepProps) => props.width * 100}%;
  height: ${(props: FunnelStepProps) => props.height}px;
  background: ${(props: FunnelStepProps) => props.color};
  text-align: center;
  display: table; 
  overflow: hidden;
  :hover {
    filter: brightness(80%);
  }
`
export const FunnelStepContents = styled.span`
  display: table-cell; 
  vertical-align: middle;
  font-size: ${(props: FunnelStepContentsProps) => props.font_size}em;
  // TODO: Labels > Color Label Toggle > Color Label
  color: ${(props: FunnelStepContentsProps) => props.color};
`
export const Chart = styled.div`
  height: 100%;
  width: ${(props: ChartProps) => props.width * 100}%;
  float: left;
`
export const FunnelStepOuterContents = styled.span`
  overflow: hidden;
  // TODO: Label Scale option
  font-size: ${(props: FunnelStepOuterContentsProps) => props.font_size}em;
  // TODO: Labels > Color Label Toggle > Color Label
  color: ${(props: FunnelStepOuterContentsProps) => props.color};
  position: absolute;
  left: 50%;
  z-index: -1;
  padding-left: ${(props: FunnelStepOuterContentsProps) => (props.padding * 100)}%;
  top: ${(props: FunnelStepOuterContentsProps) => (props.bottom)}px;
`

export interface FunnelChartProps {
  data: Chunk[]
  config: VisConfig
  element: HTMLElement
  openDrillMenu?: (options: { links: Link[], event: object }) => void
}

export interface FunnelStepProps {
  color: string
  width: number
  height: number
}

export interface FunnelStepWrapperProps {
  height: number
}

export interface ChartProps {
  width: number
}

export interface FunnelStepContentsProps {
  color: string
  font_size: number
}

export interface FunnelStepOuterContentsProps extends FunnelStepContentsProps {
  padding: number
  bottom: number
}
  
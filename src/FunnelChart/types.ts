import React, { useRef, useLayoutEffect, useState } from "react"
import { Chunk, Link, VisConfig } from "../types"
import { } from "../utils"
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
  // TODOing: Label Scale option, labels not implemented, need to test
  font-size: ${(props: FunnelStepContentsProps) => props.font_size}em;

  // font-size: 2em;
  // TODO: Labels > Color Label Toggle > Color Label
  color: ${(props: FunnelStepContentsProps) => props.color};
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
export const LeftAxis = styled.div`
  height: 100%;
  width: 10%;
  float: left;
`
export const RightAxis = styled.div`
  height: 100%;
  width: 10%;
  float: left;
`
export const Chart = styled.div`
  height: 100%;
  width: 80%;
  float: left;
`
export const AxisLabel = styled.span`
  display: table-cell; 
  vertical-align: middle;
  // TODO: Label Scale option
  font-size: 0.9em;
  color: rgb(149, 149, 149);
`
export const FunnelStepOuterContents = styled.span`
  overflow: hidden;
  // TODO: Label Scale option
  font-size: 3em;
  // TODO: Labels > Color Label Toggle > Color Label
  color: ${(props: FunnelStepOuterContentsProps) => props.color} em;
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

export interface AxisContainerProps {
  height: number
}

export interface FunnelStepContentsProps {
  color: string
  font_size: number
}

export interface FunnelStepOuterContentsProps extends FunnelStepContentsProps {
  padding: number
  bottom: number
}
  

import React, { useRef, useLayoutEffect, useState } from "react"
import { Chunk, Link, VisConfig } from "../types"
import { } from "../utils"
import styled from "styled-components"

export const ChartWrapper = styled.div`
  height: 100%;
  font-family: Roboto;
`
export const FunnelStepWrapper = styled.span`
  width: 100%;
`
export const FunnelStep = styled.div`
  margin: auto;
  // TODO: Step border size option
  border: 3px solid white;
  width: ${(props: FunnelStepProps) => props.width * 100}%;
  min-height: ${(props: FunnelStepProps) => props.heightShare * 100}%;
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
  // font-size: ${(props: FunnelStepContentsProps) => props.font_size}em;

  font-size: 2em;
  // TODO: Labels > Color Label Toggle > Color Label
  color: ${(props: FunnelStepContentsProps) => props.color};
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
  padding-left: ${(props: FunnelStepOuterContentsProps) => (props.padding * 100) * 0.75}%;
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
  heightShare: number
}

export interface FunnelStepWrapperProps {
}

export interface FunnelStepContentsProps {
  color: string
  font_size: number
}

export interface FunnelStepOuterContentsProps extends FunnelStepContentsProps {
  padding: number
  bottom: number
}
  

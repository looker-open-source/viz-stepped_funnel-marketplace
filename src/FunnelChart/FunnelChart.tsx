/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import React, { useRef, useLayoutEffect, useState } from "react"
import { FunnelChartProps, FunnelStep, FunnelStepContents, FunnelStepOuterContents, FunnelStepWrapper, ChartWrapper, AxisContainer, AxisSubLabel, LeftAxis, Chart, RightAxis } from "./types"
import { Chunk } from "../types"
import { VizzyTooltip } from "../VizzyUtils/VizzyTooltip"
import { getChartText, getAxisLabel } from "./utils"
import styled from "styled-components"

export interface TooltipProps {
  x: number
  y: number
  content: string
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ 
  data,
  config,
  element,
  openDrillMenu,
 }) => {
  const [ tooltip, setTooltip ] = useState<TooltipProps | undefined>(undefined)
  let stepHeight = 1 / data.length * element.getBoundingClientRect().height
  let funnelColors = config.bar_colors && config.bar_reverse_colors ? config.bar_colors.reverse() : config.bar_colors
  return (
    <ChartWrapper>
      <LeftAxis>
        {config.label_left_axis && config.left_axis_label !== "" && getAxisLabel(config.left_axis_label, "left", element.getBoundingClientRect().height).element}
        {data.map((d: Chunk, i: number) => {
        return (
          <AxisContainer height={stepHeight + (i * 2)}><AxisSubLabel>{d.label}</AxisSubLabel></AxisContainer>
        )
      })}</LeftAxis>
      <Chart>{data.map((d: Chunk, i: number) => {
        let stepWidthPct = d.percent_container || 0
        let stepWidth = element.getBoundingClientRect().width * stepWidthPct
        let stepText = getChartText(d.percent_rendered, config.font_size)
        let textWidth = stepText.width
        // outerStepTextY = begin of step Y + half of step Y - quarter of text height
        let outerStepTextY = (stepHeight * i + (stepHeight / 2) - (stepText.height / 5))
        let textWithin = textWidth < stepWidth ? true : false
        return (
        <FunnelStepWrapper height={stepHeight}>
          <FunnelStep 
            color={funnelColors[i]}
            width={stepWidthPct - 0.02}
            height={stepHeight}
            onMouseMove={(e)=>{setTooltip({x: e.clientX + 10, y: e.clientY, content: d.label +": "+d.rendered+" ("+d.percent_rendered+")"})}}
            onMouseLeave={(e)=>{setTooltip(undefined)}}
            onClick={(e: any)=>{
              // @ts-ignore
              openDrillMenu({
                links: d.links || [],
                event: e,
              });
            }}
          >
            {textWithin && <FunnelStepContents font_size={config.font_size} color={"#FFF"}>{stepText.element}</FunnelStepContents>}
          </FunnelStep>
          {!textWithin && <FunnelStepOuterContents font_size={config.font_size} color={funnelColors[i]} padding={stepWidthPct/2} bottom={outerStepTextY}>{stepText.element}</FunnelStepOuterContents>}
        </FunnelStepWrapper>
        )
      })}</Chart>
      <RightAxis>
      {config.label_right_axis && config.right_axis_label !== "" && getAxisLabel(config.right_axis_label, "right", element.getBoundingClientRect().height).element}
      {data.map((d: Chunk, i: number) => {
        return (
          <AxisContainer height={stepHeight + (i*2)}><AxisSubLabel>{d.rendered}</AxisSubLabel></AxisContainer>
        )
      })}</RightAxis>
      {tooltip && <VizzyTooltip metadata={tooltip}/>}
    </ChartWrapper>
  )
}

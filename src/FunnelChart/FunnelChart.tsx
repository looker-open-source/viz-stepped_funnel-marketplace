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
import { FunnelChartProps, FunnelStep, FunnelStepContents, FunnelStepOuterContents, FunnelStepWrapper, ChartWrapper, AxisContainer, AxisLabel, LeftAxis, Chart, RightAxis } from "./types"
import { Chunk } from "../types"
import { getChartText } from "./utils"
import styled from "styled-components"

export const FunnelChart: React.FC<FunnelChartProps> = ({ 
  data,
  config,
  element,
  openDrillMenu,
 }) => {
  return (
    <ChartWrapper>
      <LeftAxis>{data.map((d: Chunk, i: number) => {
        let stepWidthPct = d.percent_number || 0
        let stepText = getChartText(d.percent)
        let textWidth = stepText.width
        let stepWidth = element.getBoundingClientRect().width * stepWidthPct
        let stepHeight = 1 / data.length * element.getBoundingClientRect().height
        let outerStepTextY = (stepHeight + ((1 / data.length / 2) * element.getBoundingClientRect().height) - (stepText.height / 4))
        let textWithin = textWidth < stepWidth ? true : false
        return (
          <AxisContainer height={stepHeight}><AxisLabel>{d.label}</AxisLabel></AxisContainer>
        )
      })}</LeftAxis>
      <Chart>{data.map((d: Chunk, i: number) => {
        let stepWidthPct = d.percent_number || 0
        let stepText = getChartText(d.percent)
        let textWidth = stepText.width
        let stepWidth = element.getBoundingClientRect().width * stepWidthPct
        let stepHeight = 1 / data.length * element.getBoundingClientRect().height
        let outerStepTextY = (stepHeight * i + ((1 / data.length / 2) * element.getBoundingClientRect().height)) + (stepText.height / 4)
        let textWithin = textWidth < stepWidth ? true : false
        return (
        <FunnelStepWrapper height={stepHeight}>
          <FunnelStep 
            color={config.bar_colors[i]}
            width={stepWidthPct - 0.02}
            height={stepHeight}
            onClick={(e: any)=>{
              // @ts-ignore
              openDrillMenu({
                links: d.links || [],
                event: e,
              });
            }}
          >
            {textWithin && <FunnelStepContents color={"#FFF"}>{stepText.element}</FunnelStepContents>}
          </FunnelStep>
          {!textWithin && <FunnelStepOuterContents color={config.bar_colors[i]} padding={stepWidthPct/2} bottom={outerStepTextY}>{stepText.element}</FunnelStepOuterContents>}
        </FunnelStepWrapper>
        )
      })}</Chart>
      <RightAxis>{data.map((d: Chunk, i: number) => {
        let stepWidthPct = d.percent_number || 0
        let stepText = getChartText(d.percent)
        let textWidth = stepText.width
        let stepWidth = element.getBoundingClientRect().width * stepWidthPct
        let stepHeight = 1 / data.length * element.getBoundingClientRect().height
        let outerStepTextY = (stepHeight + ((1 / data.length / 2) * element.getBoundingClientRect().height) - (stepText.height / 4))
        let textWithin = textWidth < stepWidth ? true : false
        return (
          <AxisContainer height={stepHeight}><AxisLabel>{d.rendered}</AxisLabel></AxisContainer>
        )
      })}</RightAxis>
    </ChartWrapper>
  )
}

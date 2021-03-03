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

import React from "react"
import { FunnelChartProps, FunnelStep, FunnelStepContents, FunnelStepOuterContents, FunnelStepWrapper, ChartWrapper, Chart } from "./types"
import { Chunk } from "../types"
import { getChartText } from "./utils"
import { Tooltip, useTooltip } from "../Tooltip/Tooltip"
import {LeftAxis, RightAxis} from "./Axes"

export const FunnelChart: React.FC<FunnelChartProps> = ({ 
  data,
  config,
  element,
  openDrillMenu,
 }) => {

  const {
    tooltipContainer, 
    initalState, 
    tooltipMove, 
    tooltipOut
  } = useTooltip();

  let stepHeight = 1 / data.length * element.getBoundingClientRect().height

  let leftW = data[0].left_rendered !== "" ? .1 : 0
  let rightW = data[0].right_rendered !== "" ? .1 : 0
  let inlineW = 1 - leftW - rightW
  return (
    <ChartWrapper>
      <LeftAxis config={config} data={data} element={element} stepHeight={stepHeight} width={leftW}/>
      <Chart width={inlineW}>{data.map((d: Chunk, i: number) => {
        let stepWidthPct = d.percent_container || 0
        let stepWidth = element.getBoundingClientRect().width * stepWidthPct * inlineW
        let stepText = getChartText(d.inline_rendered, config.font_size)
        let textWidth = stepText.width
        // outerStepTextY = begin of step Y + half of step Y - quarter of text height
        let outerStepTextY = ((stepHeight + 3) * i + (stepHeight / 2))
        let textWithin = textWidth < (stepWidth*0.75) ? true : false
        d.series_color = config.bar_colors[i];
        return (
        <FunnelStepWrapper height={stepHeight}>
          <FunnelStep 
            color={config.bar_colors[i]}
            width={stepWidthPct - 0.02}
            height={stepHeight}
            onMouseMove={(e)=>{tooltipMove(e, d)}}
            onMouseLeave={tooltipOut}
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
          {!textWithin && <FunnelStepOuterContents font_size={config.font_size} color={config.bar_colors[i]} padding={stepWidthPct/2 + (!rightW ? .1 : 0)} bottom={outerStepTextY}>{stepText.element}</FunnelStepOuterContents>}
        </FunnelStepWrapper>
        )
      })}</Chart>
      <RightAxis config={config} data={data} element={element} stepHeight={stepHeight} width={rightW}/>
      <Tooltip {...initalState} ref={tooltipContainer}/>
    </ChartWrapper>
  )
}

import React from 'react';
import { VegaLite, VisualizationSpec } from 'react-vega';
import { AnyMark } from 'vega-lite/build/src/mark';
import { NOMINAL, ORDINAL, QUANTITATIVE, TEMPORAL } from 'vega-lite/build/src/type';
import { Chunk } from '../../types';
import { DefaultToolTip } from '../DefaultTooltip';

export interface VegaChartProps {
  datum?: Chunk
  chart: AnyMark
  scale?: string
}

function getTypeForScale(scale: string | undefined) {
  const SCALES: any = {
    time:     TEMPORAL,
    number:   QUANTITATIVE,
    ordinal:  ORDINAL,
  }
  return SCALES[scale||'number']
}

export function VegaChart({ datum, chart, scale }: VegaChartProps) {
  if (datum?.turtle && datum?.turtle.data.length) {
    const { dimension, measure, data } = datum.turtle
    const spec: VisualizationSpec = {
      mark: chart,
      data: { name: 'turtles'},
      encoding: {
        x: { 
          field: dimension.name.replace('.', '_'), 
          type: getTypeForScale(scale),
          axis: { title: dimension.label, grid: false}
        },
        y: { 
          field: measure.name, 
          type: QUANTITATIVE,
          axis: { title: measure.label, grid: false }
        }
      },
    }
  
    const dataWrapper = { turtles: data }
    return( <VegaLite spec={spec} data={dataWrapper} /> )
  } 
  return (<DefaultToolTip datum={datum} />)


}
import { Flex, FlexItem, Text } from '@looker/components'
import React from 'react'
import { Chunk } from '../types'
import { Sanitizer } from '../utils'
import { VegaChart } from './vega-charts/VegaChart'

export function DefaultToolTip(datum: any) {
  return (
    <Flex flexDirection="column">
    {datum.datum && (
      <FlexItem data-testid="tooltip-category">
        <Text
          fontSize="xsmall"
        >{datum.datum.tooltip_rendered}</Text>
      </FlexItem>
    )}
    {datum.datum && datum.datum.turtle && <FlexItem data-testid="turtle-chart">
      <VegaChart 
        datum={datum.datum} 
        chartType={datum.datum.chartType as any} 
        scale={datum.datum.scale}
      />
    </FlexItem>}
    </Flex>
  )


}

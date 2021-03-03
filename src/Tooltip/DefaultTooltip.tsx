import { Flex, FlexItem, Text } from '@looker/components'
import React from 'react'
import { Chunk } from '../types'
import { Sanitizer } from '../utils'

export function DefaultToolTip({datum}: any) {
  return (
    <Flex flexDirection="column">
    {datum?.label && (
      <FlexItem mb="xsmall" data-testid="tooltip-category">
        <Text
          fontSize="xsmall"
          dangerouslySetInnerHTML={{
            __html: Sanitizer.sanitizeDOM(
            `${datum.label}: ${datum?.rendered || datum?.value} (${datum?.percent})`?? '')
          }}
        />
      </FlexItem>
    )}
    </Flex>
  )


}

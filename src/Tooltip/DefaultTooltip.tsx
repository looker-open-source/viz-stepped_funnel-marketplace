import { Flex, FlexItem, Text } from '@looker/components'
import { Chunk } from '../types'

export function DefaultToolTip({datum: Chunk}) {
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

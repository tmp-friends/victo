import { FC } from 'react'
import Link from 'next/link'
import { Flex, Text } from '@chakra-ui/react'

import { ContentWrapper } from './content-wrapper'

export const SiteHeader: FC = () => {
  return (
    <Flex as='header' shadow='md'>
      <ContentWrapper>
        <Link href='/' passHref>
          <Text fontsize='x1' fontweight='semibold'>
            Victo
          </Text>
        </Link>
      </ContentWrapper>
    </Flex>
  )
}

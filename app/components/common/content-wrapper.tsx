import React, { FC, ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export const ContentWrapper: FC<{children: ReactNode}> = (props) => {
  return (
    <Box px={4} py={4}>
      {props.children}
    </Box>
  )
}

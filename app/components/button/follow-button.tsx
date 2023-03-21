import { FC } from "react"
import { Button } from "@chakra-ui/react"

import { follow } from "../../hooks/follow"

export const FollowButton: FC<number> = (hashtagId: number) => {
  return (
    <Button
      size="lg"
      colorScheme="gray"
      ml={10}
      onClick={() => follow(hashtagId)}
    >Follow</Button>
  )
}

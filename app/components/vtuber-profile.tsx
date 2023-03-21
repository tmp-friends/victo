import { FC } from "react"
import { Flex, Avatar, Box, Text, Heading } from "@chakra-ui/react"

import { Vtuber } from "../types/vtuber"
import { FollowButton } from "./button/follow-button"


export const VtuberProfile: FC<Vtuber> = (profile: Vtuber) => {
  return (
    <Flex alignItems="center" mt={4} mb={8}>
      <Avatar
        src={profile.image_url}
        size="xl"
        name={profile.name}
        mr={6}
      />
      <Box>
        <Heading as="h1">
          <Text fontSize="2xl" fontWeight="semibold">{profile.name}</Text>
        </Heading>
      </Box>
      {FollowButton(profile.id)}
    </Flex>
  )
}

import { FC } from "react"
import { Flex, Avatar, Box, Text, Heading } from "@chakra-ui/react"

import { User } from "../types/user"


export const UserProfile: FC<User> = (profile: User) => {
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
        <Text fontSize="lg">{profile.email}</Text>
      </Box>
    </Flex>
  )
}

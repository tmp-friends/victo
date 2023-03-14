import { FC } from "react"
import { Flex, Avatar, Box, Text, Heading, Button } from "@chakra-ui/react"

import { Profile } from "../types/profile"

export const ProfileContent: FC<Profile> = (profile: Profile) => {
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
        {profile.is_user && <Text fontSize="lg">{profile.email}</Text>}
      </Box>
      {!profile.is_user && <Button size="lg" colorScheme="gray" ml={10}>Follow</Button>}
    </Flex>
  )
}

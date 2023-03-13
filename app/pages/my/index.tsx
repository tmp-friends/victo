import type { NextPage } from "next"
import { Flex, Avatar, Box, Text } from "@chakra-ui/react"
import { useAuthContext } from "../../auth/AuthContext"

const MyPage: NextPage = () => {
  const user = useAuthContext()

  return (
    <>
      <Box>
        <Flex alignItems="center" mt={4} mb={8}>
          <Avatar
            src={user?.profile_image_url}
            size="xl"
            name={user?.name}
            mr={6}
          />
          <Box>
            <Text fontSize="2xl" fontWeight="semibold">{user?.name}</Text>
            <Text fontSize="lg">{user?.email}</Text>
          </Box>
        </Flex>
      </Box>
    </>
  )
};

export default MyPage

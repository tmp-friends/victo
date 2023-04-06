import { Flex, Avatar, Box, Text, Heading } from "@chakra-ui/react"

interface UserProfileProps {
  /**
   * ユーザID
   */
  id: number
  /**
   * ユーザの名前
   */
  name: string
  /**
   * ユーザのプロフィール画像URL
   */
  imageUrl: string
  /**
   * ユーザのメールアドレス
   */
  email: string
}

const UserProfile: React.FC<UserProfileProps> = ({
  id,
  name,
  imageUrl,
  email
}) => {
  return (
    <Flex alignItems="center" mt={4} mb={8}>
      <Avatar
        src={imageUrl}
        size="xl"
        name={name}
        mr={6}
      />
      <Box>
        <Heading as="h1">
          <Text fontSize="2xl" fontWeight="semibold">{name}</Text>
        </Heading>
        <Text fontSize="lg">{email}</Text>
      </Box>
    </Flex>
  )
}

export default UserProfile

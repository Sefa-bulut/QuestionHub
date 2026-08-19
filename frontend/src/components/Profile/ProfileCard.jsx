import React, { useState } from "react";
import AvatarSelectorDialog from "./AvatarSelectorDialog";
import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";
import { avatars } from "@/assets/avatarImages/avatars";

const ProfileCard = ({ currentUser }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatarId);
  const currentAvatar = avatars.find((avatar) => avatar.id === selectedAvatar);
  const firstLetter = currentUser.userName?.charAt(0).toUpperCase();
  return (
    <Card.Root
      flexDirection={{ base: "column", md: "row" }} // Mobil: Alt alta, Web: Yan yana
      overflow="hidden"
      w="100%"
      minH={{ base: "auto", md: "400px" }}
      boxShadow="sm"
    >
      {/* SOL/ÜST KISIM: Görsel Alanı */}
      <Box
        w={{ base: "100%", md: "50%" }}
        minH={{ base: "50px", md: "auto" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
        flexShrink={0}
      >
        {currentAvatar ? (
          <Image
            src={currentAvatar.src}
            alt="Profile"
            w="100%"
            h="100%"
            maxH={{ base: "200px", md: "100%" }}
            objectFit="contain"
          />
        ) : (
          <Box
            w="150px"
            h="150px"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="6xl"
            fontWeight="bold"
            bg="gray.200"
          >
            {firstLetter}
          </Box>
        )}
      </Box>

      {/* SAĞ/ALT KISIM: Bilgi Alanı */}
      <Box w={{ base: "100%", md: "60%" }} minW={0}>
        <Card.Body wordBreak="break-word">
          <Card.Title mb="2">{currentUser.userName}</Card.Title>
          <Card.Description>{currentUser.about}</Card.Description>

          <HStack mt="4" flexWrap="wrap" gap={2}>
            <Badge>24 Posts</Badge>
            <Badge>120 Followers</Badge>
          </HStack>
        </Card.Body>

        <Card.Footer>
          <AvatarSelectorDialog
            selectedAvatar={selectedAvatar}
            setSelectedAvatar={setSelectedAvatar}
          />
        </Card.Footer>
      </Box>
    </Card.Root>
  );
};

export default ProfileCard;

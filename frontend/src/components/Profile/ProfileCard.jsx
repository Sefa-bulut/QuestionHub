import React, { useState } from "react";
import AvatarSelectorDialog from "./AvatarSelectorDialog";
import { Badge, Box, Card, HStack, Image } from "@chakra-ui/react";
import { avatars } from "@/assets/avatarImages/avatars";

const ProfileCard = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const currentAvatar = avatars.find((avatar) => avatar.id === selectedAvatar);
  return (
    <div>
      <Card.Root flexDirection="row" overflow="hidden" w="100%" minH="60vh">
        <Box w="50%" flexShrink={0}>
          <Image
            src={currentAvatar?.src}
            alt="Profile"
            w="100%"
            h="100%"
            minH="220px"
            objectFit="contain"
          />
        </Box>

        <Box w="50%" minW={0}>
          <Card.Body>
            <Card.Title mb="2">User Name</Card.Title>

            <Card.Description>
              Hakkında HakkındaHakkındaHakkındaHakkındaHakkında
            </Card.Description>

            <HStack mt="4" flexWrap="wrap">
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
    </div>
  );
};

export default ProfileCard;

import React, { useEffect, useState } from "react";
import AvatarSelectorDialog from "./AvatarSelectorDialog";
import { Badge, Box, Card, HStack, Image, VStack } from "@chakra-ui/react";
import { avatars } from "@/assets/avatarImages/avatars";
import AboutEditDialog from "./AboutEditDialog";
import { useAuth } from "@/contexts/AuthContext";
import { HiFire, HiHeart } from "react-icons/hi";
import { LuMessageSquare } from "react-icons/lu";

const ProfileCard = ({ paramUser, stats }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(paramUser.avatarId);
  const [about, setAbout] = useState(paramUser.about);
  const currentAvatar = avatars.find((avatar) => avatar.id === selectedAvatar);
  const firstLetter = paramUser.userName?.charAt(0).toUpperCase();
  const { user, isAuthenticated } = useAuth();
  const isOwner = paramUser?.id === user?.userId;

  useEffect(() => {
    setSelectedAvatar(paramUser.avatarId);
    setAbout(paramUser.about);
  }, [paramUser]);

  return (
    <Card.Root
      flexDirection="column" // Her ekran boyutunda alt alta olmasını sağlar
      overflow="hidden"
      w="100%"
      minH={{ base: "auto", md: "400px" }}
      boxShadow="sm"
    >
      {/* SOL/ÜST KISIM: Görsel Alanı */}
      <Box
        w="100%" // Genişlik %50'den %100'e çıkarıldı
        py={6} // Resmi biraz ortalamak ve boşluk vermek için padding eklendi
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
            maxH={{ base: "200px", md: "300px" }}
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
      <Box w="100%" minW={0}>
        <Card.Body wordBreak="break-word" textAlign="center">
          <Card.Title mb="2">{paramUser.userName}</Card.Title>
          <Card.Description>{about}</Card.Description>

          {stats && (
            <HStack mt="4" flexWrap="wrap" gap={2} justifyContent="center">
              <Badge size="lg" colorPalette="blue">
                <HiFire />
                Topic {stats.sharedPostCount}
              </Badge>
              <Badge size="lg" colorPalette="red">
                <HiHeart />
                Like {stats.receivedLikeCount}
              </Badge>
              <Badge size="lg" colorPalette="green">
                <LuMessageSquare />
                Comment {stats.receivedCommentCount}
              </Badge>
            </HStack>
          )}
        </Card.Body>

        {isOwner && (
          <Card.Footer justifyContent="center">
            <HStack gap={3} wrap="wrap">
              <AvatarSelectorDialog
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
                paramUser={paramUser}
              />
              <AboutEditDialog
                paramUser={paramUser}
                setAbout={setAbout}
                about={about}
              />
            </HStack>
          </Card.Footer>
        )}
      </Box>
    </Card.Root>
  );
};

export default ProfileCard;

import {
  Avatar,
  Button,
  Card,
  HStack,
  Text,
  Box,
  Collapsible,
  Stack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiHeart } from "react-icons/hi";
import { LuMessagesSquare } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ mypost }) => {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      <Card.Root w={{ base: "95%", lg: "50%" }} mx="auto">
        <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Card.Body>
            <HStack mb="6" gap="3">
              <Link to={`/users/${mypost.userId}`}>
                <Avatar.Root>
                  {/*Asıl resim*/}
                  <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
                  {/*Resim yüklemezse fallback(yedek)'deki ismin baş harfleri gösterilir*/}
                  <Avatar.Fallback name={mypost.userName} />
                </Avatar.Root>
              </Link>

              <Stack gap="0">
                <Text fontWeight="semibold" textStyle="sm">
                  {mypost.userName}
                </Text>
              </Stack>
            </HStack>

            <Card.Title>{mypost.title}</Card.Title>
            <Card.Description mt="3">{mypost.text}</Card.Description>
          </Card.Body>

          <Card.Footer>
            <Flex w="100%" justify="space-between" align="center">
              <Button
                variant="ghost"
                size="2xl"
                justifyContent="flex-start"
                color={liked ? "red.500" : "gray.500"}
                onClick={handleLike}
              >
                123
                <HiHeart />
              </Button>

              <Collapsible.Trigger asChild>
                <Button variant="ghost" size="lg">
                  <LuMessagesSquare />
                  Comments
                </Button>
              </Collapsible.Trigger>
            </Flex>
          </Card.Footer>

          <Collapsible.Content>
            <Box p="4" borderTopWidth="1px">
              This is the comments area.
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </Card.Root>
    </div>
  );
};

export default Post;

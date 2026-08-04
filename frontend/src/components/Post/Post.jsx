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
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";

const Post = ({ mypost }) => {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <div>
      <Card.Root w="50%" mx="auto">
        <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Card.Body>
            <HStack mb="6" gap="3">
              <Avatar.Root>
                {/*Asıl resim*/}
                <Avatar.Image src="https://images.unsplash.com/photo-1511806754518-53bada35f930" />
                {/*Resim yüklemezse fallback(yedek)'deki ismin baş harfleri gösterilir*/}
                <Avatar.Fallback name="Nate Dave" />
              </Avatar.Root>

              <Stack gap="0">
                <Text fontWeight="semibold" textStyle="sm">
                  User Name
                </Text>
              </Stack>
            </HStack>

            <Card.Title mt="2">{mypost.title}</Card.Title>
            <Card.Description>{mypost.text}</Card.Description>
          </Card.Body>

          <Card.Footer>
            <Flex w="100%" justify="space-between" align="center">
              <Button
                variant="ghost"
                size="2xl"
                justifyContent="flex-start"
                color={liked ? "red.500" : "gray.500"}
                onClick={() => setLiked(!liked)}
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

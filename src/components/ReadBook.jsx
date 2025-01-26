import { fetchBook } from "@/redux/action/fetchBookAction";
import {
  Container,
  Grid,
  Flex,
  Alert,
  Box,
  Image,
  Text,
  Button,
  AspectRatio,
} from "@chakra-ui/react";
import { Book, Users, Layers, FileText, Globe, Search } from "lucide-react";
import { Link } from "react-router";
import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";

function ReadBook() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.fetchBook.books);
  const error = useSelector((state) => state.fetchBook.error);
  const loading = useSelector((state) => state.fetchBook.loading);
  const [readBooks, setReadBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch]);

  useEffect(() => {
    if (books && Object.keys(books).length > 0) {
      const storedReadBooks =
        JSON.parse(localStorage.getItem("readBooks")) || [];

      const booksArray = Object.keys(books).map((key) => {
        const book = { id: key, ...books[key] };
        return storedReadBooks.includes(book.id)
          ? { ...book, readingStatus: true }
          : { ...book, readingStatus: false };
      });

      const filteredReadBooks = booksArray.filter((book) => book.readingStatus);

      setReadBooks(filteredReadBooks);
    }
  }, [books]);

  if (loading) {
    return (
      <Flex
        align={"center"}
        justify={"center"}
        h={"100vh"}
        alignItems={"center"}
        w="100%"
        mx="auto"
        p="6"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="lg"
        borderRadius="lg"
      >
        <Box textAlign="center" mb="4">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </Box>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        align={"center"}
        justify={"center"}
        h={"100vh"}
        alignItems={"center"}
        w="100%"
        mx="auto"
        p="6"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="lg"
        borderRadius="lg"
      >
        <Box textAlign="center" mb="4">
          <Alert.Root
            status="error"
            mb="4"
            bg="teal.500"
            color={"#fff"}
            borderRadius="md"
            p="4"
          >
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        </Box>
      </Flex>
    );
  }

  if (readBooks.length === 0) {
    return (
      <Flex
        align={"center"}
        justify={"center"}
        h={"100vh"}
        alignItems={"center"}
        w="100%"
        mx="auto"
        p="6"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="lg"
        borderRadius="lg"
        pt={"150px"}
      >
        <Box textAlign="center" mb="4">
          <Text color={"#333"}>You haven't read any books yet!</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Container
      maxW="container.xl"
      bg="gray.100"
      py={8}
      p={5}
      minH={"100dvh"}
      h={"100%"}
      pt={"130px"}
    >
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={6}
      >
        {readBooks?.map((book) => (
          <Flex
            key={book.id}
            flexDirection="column"
            bg="white"
            borderRadius="xl"
            shadow="md"
            overflow="hidden"
            transition="transform 0.3s"
            position="relative"
          >
            <Text
              position="absolute"
              top={2}
              left={2}
              colorScheme="green"
              zIndex={10}
              bg={"teal.900"}
              p={1}
              pl={2}
              pr={2}
              rounded={"xl"}
              color={"#fff"}
            >
              {book?.readingStatus ? "Read" : "Unread"}
            </Text>

            <AspectRatio ratio={3 / 4} w="full">
              <Image
                src={book?.imageLinks?.thumbnail || "/api/placeholder/300/450"}
                alt={book?.title}
                objectFit="cover"
              />
            </AspectRatio>

            <Box p={4} flex={1} color={"#333"}>
              <Flex flexDirection="column" gap={2} mb={4}>
                <Flex align="center" gap={2}>
                  <Book size={16} />
                  <Text
                    fontWeight="bold"
                    width="100%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {book?.title}
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Users size={16} />
                  <Text
                    isTruncated
                    width="100%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {book?.authors?.join(", ") || "Unknown Author"}
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Layers size={16} />
                  <Text
                    isTruncated
                    width="100%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {book?.categories?.length
                      ? book?.categories.join(", ")
                      : "Uncategorized"}
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <FileText size={16} />
                  <Text>{book?.pageCount || "N/A"} Pages</Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Globe size={16} />
                  <Text>{book?.language?.toUpperCase() || "N/A"}</Text>
                </Flex>
              </Flex>

              <Button
                as={Link}
                to={`/book-details/${book?.id}`}
                bg="teal.500"
                color="white"
                _hover={{ bg: "teal.600" }}
                w="full"
              >
                View Details
              </Button>
            </Box>
          </Flex>
        ))}
      </Grid>
    </Container>
  );
}

export default ReadBook;

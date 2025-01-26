import {
  fetchBook,
  showFetchSuccessToaster,
} from "@/redux/action/fetchBookAction";
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
  Input,
  VStack,
  NativeSelectField,
  NativeSelectRoot,
  Stack,
  Group,
  InputAddon,
} from "@chakra-ui/react";
import { Book, Users, Layers, FileText, Globe, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

function Home() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.fetchBook.books);
  const error = useSelector((state) => state.fetchBook.error);
  const loading = useSelector((state) => state.fetchBook.loading);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [readStatus, setReadStatus] = useState("");

  const booksArray = Object.keys(books).map((key) => ({
    id: key,
    ...books[key],
  }));

  const [updatedBooks, setUpdatedBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchBook());
    showFetchSuccessToaster();
  }, [dispatch]);

  useEffect(() => {
    const readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

    const updated = booksArray.map((book) =>
      readBooks.includes(book.id) ? { ...book, readingStatus: true } : book
    );

    setUpdatedBooks(updated);
  }, [books]);

  const filteredBooks = updatedBooks.filter((book) => {
    const matchesSearch =
      !searchTerm ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors?.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      !filterCategory ||
      book.categories?.[0]?.toLowerCase() === filterCategory.toLowerCase();

    const matchesReadStatus =
      !readStatus ||
      (readStatus === "read" && book.readingStatus) ||
      (readStatus === "unread" && !book.readingStatus);

    return matchesSearch && matchesCategory && matchesReadStatus;
  });

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

  const categories = [
    ...new Set(
      booksArray.flatMap((book) => book?.categories || []).filter(Boolean)
    ),
  ];

  return (
    <Container
      maxW="container.xl"
      bg="gray.100"
      h={"100%"}
      py={8}
      p={5}
      pt={"110px"}
    >
      <VStack spacing={4} mb={6} w="full" p={4}>
        <Flex w="full" gap={4} alignItems="center" justify={"space-between"}>
          <Flex>
            <Stack
              gap="10"
              color={"#000"}
              display={{ base: "none", md: "block" }}
            >
              <Group attached>
                <Input
                  placeholder="Search books..."
                  value={searchTerm}
                  p={4}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                />
                <InputAddon pl={4} pr={4}>
                  <Search size={20} color="#fff" />
                </InputAddon>
              </Group>
            </Stack>

            <Button
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              display={{ base: "block", md: "none" }}
              bg="#000"
              p={2}
              height="auto"
              minWidth="auto"
              _hover={{ bg: "transparent" }}
              color="#fff"
            >
              <Search size={20} />
            </Button>

            {isSearchOpen && (
              <Box
                position="fixed"
                top={0}
                left={0}
                w="100vw"
                h="100vh"
                bg="rgba(0,0,0,0.7)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                zIndex={9999}
              >
                <Box
                  bg="white"
                  w="80%"
                  p={6}
                  borderRadius="md"
                  boxShadow="lg"
                  display="flex"
                  alignItems="center"
                  position="relative"
                >
                  <Flex w="100%" align="center">
                    <Input
                      placeholder="Search books..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      borderColor="gray.300"
                      _hover={{ borderColor: "gray.400" }}
                      color={"#000"}
                      p={4}
                      flex="1"
                    />
                    <Button
                      bg="#000"
                      p={4}
                      _hover={{ bg: "transparent" }}
                      color="#fff"
                      mr={35}
                      aria-label="Search Button"
                      onClick={() => setIsSearchOpen(false)}
                      position="absolute"
                      top="25px"
                      right="-10px"
                    >
                      <X size={24} />
                    </Button>
                  </Flex>
                </Box>
              </Box>
            )}
          </Flex>

          <Flex gap={5}>
            <NativeSelectRoot flex={1} color={"#000"}>
              <NativeSelectField
                pl={5}
                placeholder="Filter Category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>

            <NativeSelectRoot flex={1} color={"#000"}>
              <NativeSelectField
                pl={5}
                placeholder="Read Status"
                value={readStatus}
                onChange={(e) => setReadStatus(e.target.value)}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
              >
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Flex>
        </Flex>
      </VStack>

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
        {filteredBooks?.map((book) => (
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

export default Home;

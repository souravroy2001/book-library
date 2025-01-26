import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postBook,
  showAddBookToaster,
  showUpdateBookToaster,
  updateBook,
} from "@/redux/action/bookAction";
import {
  Box,
  Button,
  Input,
  Text,
  Stack,
  Heading,
  Alert,
  Flex,
} from "@chakra-ui/react";
import { DNA } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router";
import { fetchBook } from "@/redux/action/fetchBookAction";
import { toaster } from "@/components/ui/toaster";

function AddBook() {
  const [book, setBook] = useState({
    title: "",
    publishedDate: "",
    readingStatus: false,
    authors: [],
    categories: [],
    description: "",
    imageLinks: {
      smallThumbnail: "",
      thumbnail: "",
    },
    language: "",
    pageCount: "",
    publisher: "",
  });

  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const books = useSelector((state) => state?.fetchBook?.books);
  const loading = useSelector((state) => state.book.loading);
  const error = useSelector((state) => state.book.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchBook(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (books) {
      setBook({
        title: books.title || "",
        readingStatus: false,
        authors: books.authors || [],
        categories: books.categories || [],
        description: books.description || "",
        imageLinks: {
          smallThumbnail: books.imageLinks?.smallThumbnail || "",
          thumbnail: books.imageLinks?.thumbnail || "",
        },
        language: books.language || "",
        pageCount: books.pageCount ? String(books.pageCount) : "",
        publisher: books.publisher || "",
      });

      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      setBook((prevBook) => ({
        ...prevBook,
        publishedDate: formatDate(books.publishedDate),
      }));
    }
  }, [books]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name.startsWith("imageLinks.")) {
      const [parent, child] = name.split(".");
      setBook((prevBook) => ({
        ...prevBook,
        [parent]: {
          ...prevBook[parent],
          [child]: value,
        },
      }));
    } else {
      setBook({
        ...book,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const addAuthor = () => {
    if (newAuthor.trim() && !book.authors.includes(newAuthor.trim())) {
      setBook((prev) => ({
        ...prev,
        authors: [...prev.authors, newAuthor.trim()],
      }));
      setNewAuthor("");
    }
  };

  const removeAuthor = (authorToRemove) => {
    setBook((prev) => ({
      ...prev,
      authors: prev.authors.filter((author) => author !== authorToRemove),
    }));
  };

  const addCategory = () => {
    if (newCategory.trim() && !book.categories.includes(newCategory.trim())) {
      setBook((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (categoryToRemove) => {
    setBook((prev) => ({
      ...prev,
      categories: prev.categories.filter(
        (category) => category !== categoryToRemove
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const smallThumbnailValid = book.imageLinks.smallThumbnail
      ? /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(
          book.imageLinks.smallThumbnail
        )
      : true;

    const thumbnailValid = book.imageLinks.thumbnail
      ? /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(
          book.imageLinks.thumbnail
        )
      : true;

    if (!smallThumbnailValid || !thumbnailValid) {
      toaster.create({
        title: "Not valid image URLs!",
        description:
          "Please provide valid image URLs (must start with http/https and end with image extension)",
        type: "error",
      });
      return;
    }

    dispatch(postBook(book));
    showAddBookToaster(book);

    setBook({
      title: "",
      publishedDate: "",
      readingStatus: false,
      authors: [],
      categories: [],
      description: "",
      imageLinks: {
        smallThumbnail: "",
        thumbnail: "",
      },
      language: "",
      pageCount: "",
      publisher: "",
    });
  };

  function handleUpdate() {
    dispatch(updateBook(book, id));
    showUpdateBookToaster(book);

    setTimeout(() => {
      navigate(`/book-details/${id}`);
    }, 1000);

    setBook({
      title: "",
      publishedDate: "",
      readingStatus: false,
      authors: [],
      categories: [],
      description: "",
      imageLinks: {
        smallThumbnail: "",
        thumbnail: "",
      },
      language: "",
      pageCount: "",
      publisher: "",
    });
  }

  if (loading) {
    return (
      <Flex
        align={"center"}
        justify={"center"}
        maxW="full"
        h={"100vh"}
        alignItems={"center"}
        w="400px"
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

  return (
    <Flex
      maxW="full"
      justify={"center"}
      h={"100%"}
      minH={"100vh"}
      p={4}
      alignItems={"center"}
    >
      <Box
        maxW="full"
        w="400px"
        mx="auto"
        p="6"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="lg"
        borderRadius="lg"
        mt={"150px"}
        mb={"50px"}
      >
        <Heading size="lg" mb="6" textAlign="center" color="teal.600">
          Add a New Book
        </Heading>

        {error && (
          <Alert.Root
            status="error"
            mb="4"
            bg="red.100"
            borderRadius="md"
            p="4"
          >
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
          </Alert.Root>
        )}
        <form onSubmit={id ? handleUpdate : handleSubmit}>
          <Stack spacing="4">
            <Box textAlign={"left"}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Title
              </Text>
              <Input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Enter book title"
                borderColor="gray.300"
                color={"#000"}
                _hover={{ borderColor: "gray.400" }}
                p={4}
              />
            </Box>

            <Box textAlign={"left"} mb={4}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Authors
              </Text>
              <Flex>
                <Input
                  flex={1}
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Enter author's name"
                  mr={2}
                  borderColor="gray.300"
                  color={"#000"}
                  _hover={{ borderColor: "gray.400" }}
                  p={4}
                />
                <Button
                  bg={"teal.500"}
                  color={"#fff"}
                  p={3}
                  onClick={addAuthor}
                  colorScheme="teal"
                >
                  Add
                </Button>
              </Flex>
              <Flex wrap="wrap" mt={2}>
                {book.authors.map((author, index) => (
                  <Box
                    key={index}
                    bg="teal.100"
                    color="teal.800"
                    p={1}
                    m={1}
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                  >
                    {author}
                    <Button
                      size="xs"
                      ml={2}
                      colorScheme="teal"
                      variant="ghost"
                      onClick={() => removeAuthor(author)}
                    >
                      ×
                    </Button>
                  </Box>
                ))}
              </Flex>
            </Box>

            <Box textAlign={"left"} mb={4}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Categories
              </Text>
              <Flex>
                <Input
                  flex={1}
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter book category"
                  mr={2}
                  borderColor="gray.300"
                  color={"#000"}
                  _hover={{ borderColor: "gray.400" }}
                  p={4}
                />
                <Button
                  bg={"teal.500"}
                  color={"#fff"}
                  p={3}
                  onClick={addCategory}
                  colorScheme="teal"
                >
                  Add
                </Button>
              </Flex>
              <Flex wrap="wrap" mt={2}>
                {book.categories.map((category, index) => (
                  <Box
                    key={index}
                    bg="teal.100"
                    color="teal.800"
                    p={1}
                    m={1}
                    borderRadius="md"
                    display="flex"
                    alignItems="center"
                  >
                    {category}
                    <Button
                      size="xs"
                      ml={2}
                      colorScheme="teal"
                      variant="ghost"
                      onClick={() => removeCategory(category)}
                    >
                      ×
                    </Button>
                  </Box>
                ))}
              </Flex>
            </Box>

            <Box textAlign={"left"}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Publish Year
              </Text>
              <Input
                cursor="pointer"
                id="publishedDate"
                type="date"
                name="publishedDate"
                value={book.publishedDate || ""}
                onChange={handleChange}
                color="#000"
                borderColor="gray.300"
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                _hover={{ borderColor: "gray.400" }}
                p={4}
              />
            </Box>

            <Box textAlign={"left"}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Description
              </Text>
              <Input
                type="text"
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Enter book description"
                color={"#000"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                p={4}
              />
            </Box>

            <Box textAlign={"left"}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Small Thumbnail URL
              </Text>
              <Input
                type="text"
                name="imageLinks.smallThumbnail"
                value={book.imageLinks.smallThumbnail}
                onChange={handleChange}
                placeholder="Enter small thumbnail URL"
                color={"#000"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                p={4}
              />
            </Box>

            <Box textAlign={"left"}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Thumbnail URL
              </Text>
              <Input
                type="text"
                name="imageLinks.thumbnail"
                value={book.imageLinks.thumbnail}
                onChange={handleChange}
                placeholder="Enter thumbnail URL"
                color={"#000"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                p={4}
              />
            </Box>

            <Box textAlign={"left"}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Language
              </Text>
              <Input
                type="text"
                name="language"
                value={book.language}
                onChange={handleChange}
                placeholder="Enter book language"
                color={"#000"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                p={4}
              />
            </Box>

            <Box textAlign={"left"}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Page Count
              </Text>
              <Input
                type="number"
                name="pageCount"
                value={book.pageCount}
                onChange={handleChange}
                placeholder="Enter number of pages"
                color={"#000"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                p={4}
              />
            </Box>

            <Box textAlign={"left"}>
              <Text mb="1" fontSize="sm" fontWeight="bold" color="gray.700">
                Publisher
              </Text>
              <Input
                type="text"
                name="publisher"
                value={book.publisher}
                onChange={handleChange}
                placeholder="Enter book publisher"
                color={"#000"}
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                p={4}
              />
            </Box>

            <Button
              type="submit"
              bg="teal.500"
              color="white"
              _hover={{ bg: "teal.600" }}
              size="lg"
              isFullWidth
              disabled={
                !book.title ||
                !book.authors ||
                !book.description ||
                !book.publishedDate ||
                !book.publisher ||
                !book.pageCount ||
                !book.language ||
                !book.imageLinks.thumbnail ||
                !book.imageLinks.smallThumbnail ||
                !book.categories
              }
              isLoading={loading}
              loadingText="Loading...."
            >
              {id ? "Update Book" : "Add Book"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}

export default AddBook;

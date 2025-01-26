import { Link, useNavigate, useParams } from "react-router";
import { Flex, Box, Text, Alert, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "@/redux/action/fetchBookAction";
import "./BookDetailsPage.css";
import { ArrowLeft, BookOpen, Calendar, Globe, User } from "lucide-react";
import {
  updateReadingStatus,
  removeBook,
  showDeleteBookToaster,
} from "@/redux/action/bookAction";
import { toaster } from "@/components/ui/toaster";

function BooksDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const books = useSelector((state) => state?.fetchBook?.books);
  const error = useSelector((state) => state?.fetchBooks?.error);
  const loading = useSelector((state) => state?.fetchBooks?.loading);
  const [isRead, setIsRead] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBook(id));

    const readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
    if (readBooks.includes(id)) {
      setIsRead(true);
    }
  }, [id, dispatch]);

  function handleUpdateStatus(id) {
    const readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

    if (!readBooks.includes(id)) {
      readBooks.push(id);
      localStorage.setItem("readBooks", JSON.stringify(readBooks));
      setIsRead(true);
      dispatch(updateReadingStatus(id));
      toaster.create({
        title: "Marked as read!",
        description: "This book has been added to your read list.",
        type: "success",
        meta: {
          closable: true,
        },
      });
    } else {
      toaster.create({
        title: "Already marked as read",
        description: "This book is already in your read list.",
        type: "info",
        meta: {
          closable: true,
        },
      });
    }
  }

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

  return (
    <div style={{ paddingTop: "100px", height:"100%" }}>
      <div className="book-details-container">
        <Link to={-1}>
          <button className="back-button">
            <ArrowLeft className="back-icon" />
            Back to Library
          </button>
        </Link>
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

        <div className="book-details-content">
          <div className="book-cover">
            <img
              src={books?.imageLinks?.thumbnail || "/api/placeholder/300/450"}
              alt={books?.title || "Unknown Title"}
              className="book-image"
            />

            <Text
              position="absolute"
              top={"85px"}
              left={6}
              colorScheme="green"
              zIndex={10}
              bg={"teal.900"}
              p={1}
              pl={2}
              pr={2}
              rounded={"xl"}
              color={"#fff"}
            >
              {isRead ? "Read" : "Unread"}
            </Text>
          </div>

          <div className="book-info">
            <h1 className="book-title">{books?.title || "Unknown Title"}</h1>

            <div className="book-detail">
              <User className="book-icon" />
              <p>
                {books?.authors?.length
                  ? books?.authors.join(", ")
                  : "Unknown Author"}
              </p>
            </div>

            <div className="book-detail">
              <Calendar className="book-icon" />
              <p>
                Published:{" "}
                {books?.publishedDate
                  ? new Date(books?.publishedDate).toLocaleDateString()
                  : "Unknown Date"}
              </p>
            </div>

            <div className="book-detail">
              <BookOpen className="book-icon" />
              <p>{books?.pageCount || "N/A"} Pages</p>
            </div>

            <div className="book-detail">
              <Globe className="book-icon" />
              <p>Language: {books?.language?.toUpperCase() || "N/A"}</p>
            </div>

            <span className="book-category">
              {books?.categories?.length
                ? books?.categories.join(", ")
                : "Uncategorized"}
            </span>

            <Box>
              <Button
                p={4}
                bg={"teal.500"}
                color={"#fff"}
                mr={4}
                onClick={() =>
                  dispatch(
                    removeBook(id),
                    showDeleteBookToaster(books?.title),
                    setTimeout(() => {
                      navigate("/");
                    }, 1000)
                  )
                }
              >
                {" "}
                Delete{" "}
              </Button>
              <Button
                as={Link}
                to={`/add-book/${id}`}
                p={4}
                bg={"teal.500"}
                color={"#fff"}
                mr={4}
              >
                {" "}
                Edit{" "}
              </Button>
              <Button
                p={4}
                bg={"teal.500"}
                color={"#fff"}
                onClick={() => handleUpdateStatus(id)}
              >
                {" "}
                Mark as Read{" "}
              </Button>
            </Box>
          </div>
        </div>

        <hr className="book-divider" />

        <p className="book-description">
          {books?.description || "No description available."}
        </p>
      </div>
    </div>
  );
}

export default BooksDetails;

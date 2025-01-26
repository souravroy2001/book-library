import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { DNA } from "react-loader-spinner";
import { Provider as ChakraUI } from "@/components/ui/provider";

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };


    window.addEventListener("load", handleLoad);


    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return isLoading ? (
    <Flex
      align={"center"}
      justify={"center"}
      h={"100vh"}
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
        <DNA visible={true} height="80" width="80" ariaLabel="dna-loading" />
      </Box>
    </Flex>
  ) : null;
};

const GlobalLoader = ({ children }) => {
  return (
    <ChakraUI>
      <PageLoader />
      {children}
    </ChakraUI>
  );
};

export default GlobalLoader;

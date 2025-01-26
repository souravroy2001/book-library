import { Box, Flex, Image, Button } from "@chakra-ui/react";
import { Link, NavLink } from "react-router";
import { X, AlignJustify } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const theme = true;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Flex
        justify={"space-between"}
        align={"center"}
        w={"100%"}
        p={5}
        bg={theme ? "gray.200" : "gray.800"}
        position={"fixed"}
        top={0}
        zIndex={9999}
      >
        <Box w={"30%"}>
          <Link to={"/"}>
            <Image
              src={
                theme
                  ? "https://souravlife.com/wp-content/uploads/2024/09/a-logo-for-sourav-roy-with-subtle-tech-inspired-el-hqK357erTi-pPerV4yEa8Q-DdmIt3WnRX2tO4sjiJfgcg-removebg-preview-1.png"
                  : "https://souravlife.com/work/library/image/Sourav%20Roy%20White%20Red%20Logo.png"
              }
              w={"100px"}
            />
          </Link>
        </Box>

        <Flex
          w={{ base: "100%", md: "70%" }}
          justify={"end"}
          align={"center"}
          fontSize={"2xl"}
          gap={5}
        >
          <Flex
            w={{ base: "100%", md: "70%" }}
            justify={"space-around"}
            align={"center"}
            fontSize={"2xl"}
            id="largeMenu"
            color={theme ? "#000" : "#fff"}
            display={{ base: "none", md: "flex" }}
          >
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/add-book"}>Add Book</NavLink>
            <NavLink to={"/read-book"}>Read Book</NavLink>
          </Flex>

          <Button
            aria-label="Open Menu"
            onClick={() => setIsOpen((prev) => !prev)}
            display={{ base: "block", md: "none" }}
            p={2}
            height="auto"
            minWidth="auto"
          >
            {isOpen ? <X size={24} /> : <AlignJustify size={24} />}{" "}
          </Button>
        </Flex>
      </Flex>

      {isOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          p={10}
          bg={theme ? "gray.200" : "gray.800"}
          pos={"absolute"}
          top={"75px"}
          w={"50%"}
          h={"90%"}
          zIndex={99}
          right={0}
        >
          <Flex
            flexDirection={"column"}
            align={"left"}
            fontSize={"xl"}
            gap={4}
            color={theme ? "#000" : "#fff"}
          >
            <NavLink to={"/"} onClick={() => setIsOpen((prev) => !prev)}>
              Home
            </NavLink>
            <NavLink
              to={"/add-book"}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Add Book
            </NavLink>
            <NavLink
              to={"/read-book"}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Read Book
            </NavLink>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default Navbar;

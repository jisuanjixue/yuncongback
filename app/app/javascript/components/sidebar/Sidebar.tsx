import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import IconBox from "@components/icons/IconBox";
import { Separator } from "@components/separator/Separator";
import { Logo } from "@choc-ui/logo";

const Sidebar = props => {
  // to check for active links and opened collapses
  const location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = useState({});
  const mainPanel: any = useRef();
  const variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = routeName => {
    return location.pathname === routeName ? "active" : "";
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = routes => {
    const { sidebarVariant } = props;
    // Chakra Color Mode
    let activeBg = useColorModeValue("white", "gray.700");
    let inactiveBg = useColorModeValue("white", "gray.700");
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue("gray.400", "gray.400");
    let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";
    // Here are all the props that may change depending on sidebar's state.(Opaque or transparent)
    if (sidebarVariant === "opaque") {
      activeBg = "transparent";
      inactiveBg = useColorModeValue("gray.100", "gray.600");
      activeColor = useColorModeValue("gray.700", "white");
      inactiveColor = useColorModeValue("gray.400", "gray.400");
      sidebarActiveShadow = "none";
    }

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      if (prop.category) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <>
            <Text
              color={activeColor}
              fontWeight="bold"
              mb={{
                xl: "12px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              {document.documentElement.dir === "rtl"
                ? prop.rtlName
                : prop.name}
            </Text>
            {createLinks(prop.views)}
          </>
        );
      }

      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          {activeRoute(prop.layout + prop.path) === "active" ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              boxShadow={sidebarActiveShadow}
              bg={activeBg}
              transition={variantChange}
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
              borderRadius="15px"
              //   _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "0px 7px 11px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg="teal.300"
                    color="white"
                    h="30px"
                    w="30px"
                    me="12px"
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={activeColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: "12px",
              }}
              mx={{
                xl: "auto",
              }}
              py="12px"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              borderRadius="15px"
              //   _hover="none"
              w="100%"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              <Flex>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <IconBox
                    bg={inactiveBg}
                    color="teal.300"
                    h="30px"
                    w="30px"
                    me="12px"
                    transition={variantChange}
                  >
                    {prop.icon}
                  </IconBox>
                )}
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {document.documentElement.dir === "rtl"
                    ? prop.rtlName
                    : prop.name}
                </Text>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };
  const { logoText, routes, sidebarVariant } = props;

  var links = <>{createLinks(routes)}</>;
  //  BRAND
  //  Chakra Color Mode
  //   const mainText = useColorModeValue("gray.700", "gray.200");
  let sidebarBg = "none";
  let sidebarRadius = "0px";
  let sidebarMargins = "0px";
  if (sidebarVariant === "opaque") {
    sidebarBg = useColorModeValue("white", "gray.700");
    sidebarRadius = "16px";
    sidebarMargins = "16px 0px 16px 16px";
  }
  var brand = (
    <Box pt={"25px"} mb="12px">
      <Link
        // href={`${process.env.PUBLIC_URL}/#/`}
        target="_blank"
        display="flex"
        lineHeight="100%"
        mb="30px"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        fontSize="11px"
      >
        <Logo />
        <Text fontSize="sm" mt="3px">
          {logoText}
        </Text>
      </Link>
      <Separator></Separator>
    </Box>
  );

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="260px"
          maxW="260px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          borderRadius={sidebarRadius}
        >
          <Box>{brand}</Box>
          <Stack direction="column" mb="40px">
            <Box>{links}</Box>
          </Stack>
          {/* <SidebarHelp></SidebarHelp> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
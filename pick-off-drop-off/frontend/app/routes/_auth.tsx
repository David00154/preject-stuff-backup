import { Flex } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";
import {} from "react";

export default function _auth() {
  return (
    // <div className="flex flex-row justify-center items-center h-full">
    // </div>
    <Flex
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      width={"100%"}
      // maxW={"20px"}
    >
      <Outlet />
    </Flex>
  );
}

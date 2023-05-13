import { FC, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import {
  useForm,
  SubmitHandler,
  useController,
  SubmitErrorHandler,
} from "react-hook-form";
import toast from "react-hot-toast";
import { ActionFunction, json, redirect } from "@remix-run/node";
import {
  createFlashMessage,
  getSession,
  sessionStorage,
} from "~/utils/session.server";
import axios from "axios";
import type { AxiosError } from "axios";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";

export const action: ActionFunction = async function ({ request }) {
  try {
    const body = Object.fromEntries(await request.formData());

    const schema = z.object({
      email: z.string().email(),
    });

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return json({ error: parsed.error.format() });
    }

    const email = parsed.data.email;
    const param = new URL(request.url).searchParams.get("redirectTo");

    const res = await axios.post("http://localhost:3333/login", { email });
    const data = res.data;
    const status = res.status;

    const session = await createFlashMessage(request, {
      key: "success_message",
      value: data.message,
    });

    session.set("email", email);
    const searchParams = new URLSearchParams([["redirectTo", param ?? "/"]]);
    return redirect(`/verify?${searchParams}`, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          // maxAge: 30,
        }),
      },
    });
  } catch (error: any) {
    return json({ error: error.response?.data || error });
  }
};

export default function Login() {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();

  const email = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // toast.dismiss();
    if (data?.error?.email || data?.error?.message) {
      email.current?.focus();
      // toast.error(data?.error?.message ?? data?.error?.email._errors[0]);
    }
    // if (navigation.state === "submitting") {
    //   toast.loading("Submitting");
    // }
  }, [data]);

  return (
    // <div className="">
    //   <h1 className="font-semibold text-xl">What's your email?</h1>
    //   <Form method="post" replace>
    //     <div>
    //       <input
    //         type="text"
    //         id="email"
    //         name="email"
    //         defaultValue={""}
    //         ref={email}
    //         placeholder="Enter your email"
    //         className=""
    //       />
    //       {data && data?.error?.email && (
    //         <ErrorText text={data.error.email._errors[0]} />
    //       )}
    //       {data && data?.error?.message && (
    //         <ErrorText text={data.error.message} />
    //       )}
    //     </div>
    //   </Form>
    // </div>
    <Box maxW={"360px"} width={"100%"}>
      <VStack spacing={3}>
        <Heading as={"h1"} fontWeight={"bold"} fontSize={"24px"}>
          What's your email?
        </Heading>
        <Form method="post" replace>
          <Stack spacing={3}>
            <FormControl>
              <Input
                _placeholder={{
                  fontSize: "16px",
                }}
                type="text"
                bg="white"
                size={"lg"}
                // borderColor={"black"}
                // borderWidth={"2px"}
                border={"none"}
                ref={email}
                placeholder="Enter your email"
              />
            </FormControl>
            <Button
              background={"black"}
              width={"100%"}
              size={"lg"}
              color={"white"}
            >
              Continue
            </Button>
          </Stack>
        </Form>
      </VStack>
    </Box>
  );
}

const ErrorText: FC<{ text?: string }> = ({ text }) => {
  return <p className="text-red-500 text-sm mt-1">{text}</p>;
};

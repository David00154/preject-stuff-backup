import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { FC, useEffect, useRef } from "react";
import { z } from "zod";
import {
  createUserSesssion,
  getFlashMessage,
  sessionStorage,
} from "~/utils/session.server";

export const loader: LoaderFunction = async function ({ request }) {
  const { message, session } = await getFlashMessage(
    request,
    "success_message"
  );

  if (!session.has("email")) {
    return redirect("/login");
  }
  // if (session.has("token")) {
  //   return redirect("/");
  // }
  const email = session.get("email");

  return json(
    { message, email },
    {
      headers: {
        // only necessary with cookieSessionStorage
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }
  );
};

export const action: ActionFunction = async function ({ request }) {
  const body = Object.fromEntries(await request.formData());

  const schema = z.object({
    otp: z.string().min(4, { message: "Verification code incomplete." }),
  });

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return json({ error: parsed.error.format() });
  }

  const code = parsed.data.otp;
  const redirectTo = new URL(request.url).searchParams.get("redirectTo");
  return await createUserSesssion({
    redirectTo: redirectTo ?? "/",
    request,
    login_code: code,
  });
};

export default function Verify() {
  const { message, email } = useLoaderData<typeof loader>();
  const data = useActionData<typeof action>();
  const otp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.error?.otp) {
      otp.current?.focus();
    } else if (data?.error?.message) {
      otp.current?.focus();
    }
  }, [data, message]);
  return (
    <div>
      {message && <FlashText variant="success" text={message} />}
      <h1 className="font-semibold text-xl">Verify</h1>
      <b>Email: {email}</b>
      <Form method="post" replace>
        <div>
          <input
            type="text"
            id="otp"
            name="otp"
            ref={otp}
            defaultValue={""}
            placeholder="Enter verification code"
            className=""
          />
          {data && data?.error?.otp && (
            <ErrorText text={data.error.otp._errors[0]} />
          )}
          {data && data?.error?.message && (
            <ErrorText text={data.error.message} />
          )}
        </div>
      </Form>
    </div>
  );
}

const FlashText: FC<{ text?: string; variant: "success" | "error" }> = ({
  text,
  variant,
}) => {
  const color = variant == "error" ? "red" : "green";
  return <p className={`text-${color}-500 text-sm mb-1`}>{text}</p>;
};

const ErrorText: FC<{ text?: string }> = ({ text }) => {
  return <p className="text-red-500 text-sm mt-1">{text}</p>;
};

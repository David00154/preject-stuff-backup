import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import axios from "axios";
type SessionData = {
  token: string;
  email?: string | null;
};
// type SessionFlashData = {
//   success_message: string | undefined;
//   error_message: string | undefined;
// };
type SessionFlashData = any;
type CreateUserSessionParams = {
  request: Request;
  redirectTo: string;
  login_code: string;
};

export const sessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret1"],
    secure: process.env.NODE_ENV === "production",
    // maxAge: 60 * 60 * 24 * 2, // 2 days
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserToken(
  request: Request
): Promise<string | undefined> {
  const session = await getSession(request);
  const userToken = session.get("token");
  return userToken;
}

export async function getUser(request: Request) {
  try {
    const userToken = await getUserToken(request);
    if (userToken === undefined) return await logout(request);
    const config = {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    };
    const res = await axios.get("http://localhost:3333/api/user", config);
    const user = res.data;
    // console.log("p");
    if (user) return user;

    throw await logout(request);
  } catch (error: any) {
    console.log({
      cause: error.message,
      message: error.response?.data.message,
    });
    // return json({ error: error.response?.data || error });
    throw await logout(request);
  }
}
export async function requireUserToken(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userToken = await getUserToken(request);
  if (!userToken) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userToken;
}

export async function requireUser(request: Request) {
  await requireUserToken(request);
  const user = await getUser(request);
  if (user) return user;

  throw await logout(request);
}

export async function createUserSesssion({
  redirectTo,
  request,
  login_code,
}: CreateUserSessionParams) {
  try {
    const session = await getSession(request);
    const email = session.get("email");

    // setTimeout(() => {
    //   console.log("ERROR SENDING");
    //   return json(
    //     { error: { message: "Unable to perform this action at the moment." } },
    //     { status: 500 }
    //   );
    // }, 3000);

    const res = await axios.post(
      "http://localhost:3333/login/verify",
      {
        login_code,
        email,
      },
      {
        timeout: 8000,
        timeoutErrorMessage: "Unable to perform this action at the moment.",
        signal: AbortSignal.timeout(8000),
      }
    );
    const data = res.data;
    // console.log(data);
    session.set("token", data.token);
    session.unset("email");

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 2, // 2 days
        }),
      },
    });
  } catch (error: any) {
    console.log(error);
    let dataError = null;
    if (error.response?.data.errors) {
      if (Array.isArray(error.response?.data.errors)) {
        const element = error.response?.data.errors[0];
        dataError = { message: element.message + ` (${element.field})` };
      }
    }

    return json({ error: dataError || error.response?.data || error });
  }
}

export async function logout(request: Request) {
  try {
    const session = await getSession(request);
    if (session.has("token")) {
      const config = {
        headers: {
          Authorization: "Bearer " + session.get("token"),
        },
      };
      const res = await axios.post("http://localhost:3333/logout", {}, config);
      console.log(res.data);
    }
    return redirect("/login", {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  } catch (error: any) {
    console.log(error.message);
    return json({ error: error });
  }
}

type FlashMessageArgs = {
  key: SessionFlashData;
  value: string;
};

export async function createFlashMessage(
  request: Request,
  { key, value }: FlashMessageArgs
) {
  const session = await getSession(request);

  session.flash(key, value);

  return session;
}

export async function getFlashMessage(request: Request, key: string) {
  const session = await getSession(request);

  const message = session.get(key) || null;

  return { message, session };
}

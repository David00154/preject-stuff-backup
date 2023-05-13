import { LoaderFunction, V2_MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession, requireUser } from "~/utils/session.server";

export const meta: V2_MetaFunction = () => {
  return [
    {
      charset: "utf-8",
      title: "Request a courier, 24/7 | Zazz",
      viewport: "width=device-width,initial-scale=1",
    },
  ];
};

export const loader: LoaderFunction = async function ({ request }) {
  // const session = getSession(request);
  // // console.log((await session).get("token"));
  const user = await requireUser(request);
  return json({ user });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      {data.user.email}
      <h1>Hello</h1>
    </div>
  );
}

import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { logout } from "~/utils/session.server";

export const loader: LoaderFunction = function ({ request }) {
  return logout(request);
};
export const action: ActionFunction = function ({ request }) {
  return logout(request);
};

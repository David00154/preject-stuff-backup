import React, { FC, ReactElement, createContext, useContext } from "react";
import { Toaster } from "react-hot-toast";

// const Toaster = React.lazy(() => import("react-hot-toast"))
type GlobalProviderProps = {};
const Global = createContext<GlobalProviderProps>(null!);
export interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}
export interface ServerStyleContextData {
  key: string;
  ids: Array<string>;
  css: string;
}
export const ServerStyleContext = createContext<
  ServerStyleContextData[] | null
>(null);

export interface ClientStyleContextData {
  reset: () => void;
}

export const ClientStyleContext = createContext<ClientStyleContextData | null>(
  null
);

const GlobalProvider: FC<{ children: ReactElement }> = ({ children }) => (
  <Global.Provider value={{}}>
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  </Global.Provider>
);
export default GlobalProvider;

export const useGlobal = () => {
  let context = useContext(Global);
  return context;
};

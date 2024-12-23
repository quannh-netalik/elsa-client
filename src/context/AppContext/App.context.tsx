import { ReactNode, createContext, useState, FC, useMemo } from "react";
import { socket } from "../../utils/socket";
import { ESocketEvent } from "../../type";

export type AppContextType = {
  token: string | undefined;
  isAuth: boolean;
  setIsAuth: (_isAuth: boolean) => void;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [token, setToken] = useState<string>();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  socket.on(ESocketEvent.LOGIN_SUCCESS, (data) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setIsAuth(true);
  });

  const value = useMemo(
    (): AppContextType => ({
      token,
      isAuth,
      setIsAuth,
    }),
    [token, isAuth, setIsAuth]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext };
export default AppProvider;

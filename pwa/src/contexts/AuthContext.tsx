import React from "react";
import useFetch from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TUserAuth = {
  token: string;
  email: string;
  keepsLoggedInWithBiometric: boolean;
};

type TAuthContext = {
  handleLogin: (data: { email: string; password: string }) => Promise<{
    data: {
      token: string;
    };
  }>;
  handleLogout: (data: { email: string }) => Promise<{
    data: {
      success: string;
    };
  }>;
  userAuth: TUserAuth;
  setUserAuth: React.Dispatch<React.SetStateAction<TUserAuth>>;
};

export const InitialUserAuth = {
  token: "",
  email: "",
  keepsLoggedInWithBiometric: false,
};

export const AuthContext = React.createContext<TAuthContext>({
  handleLogin: async () => ({ data: { token: "" } }),
  handleLogout: async () => ({ data: { success: "" } }),
  userAuth: InitialUserAuth,
  setUserAuth: () => {},
});

export const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userAuth, setUserAuth] = React.useState<TUserAuth>(InitialUserAuth);

  React.useEffect(() => {
    AsyncStorage.getItem("@userAuth")
      .then((response) => {
        if (!response) return;
        setUserAuth(JSON.parse(response));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const axios = useFetch(userAuth.token);

  const handleLogin = React.useCallback(
    async (data: { email: string; password: string }) => {
      const response = await axios.post<
        { email: string; password: string },
        { data: { token: string } }
      >("users/auth/login/", data);

      return response;
    },
    []
  );

  const handleLogout = React.useCallback(async (data: { email: string }) => {
    const response = await axios.post<
      { email: string },
      { data: { success: string } }
    >("users/auth/logout/", data);

    return response;
  }, []);

  const providerValue = React.useMemo(
    () => ({
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      userAuth: userAuth,
      setUserAuth: setUserAuth,
    }),
    [handleLogin, handleLogout, userAuth, setUserAuth]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

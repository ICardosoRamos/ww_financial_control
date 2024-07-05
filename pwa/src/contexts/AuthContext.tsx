import React from "react";
import useFetch from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingContext } from "./LoadingContext";

export const AuthContext = React.createContext<null | {
  handleSetToken: (value: string) => void;
  handleLogin: (data: { email: string; password: string }) => Promise<{
    data: {
      token: string;
    };
  }>;
  token: string;
  handleLogout: () => void;
}>(null);

export const AuthContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [token, setToken] = React.useState("");

  const { loading, setLoading } = React.useContext(LoadingContext);

  const axios = useFetch(token);

  React.useEffect(() => {
    console.log(loading, "dentro do effect de auth");
    setLoading(true);
    // AsyncStorage.getItem("@token")
    //   .then((response) => {
    //     setToken(response as string);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const handleSetToken = React.useCallback((value: string) => {
    return setToken(value);
  }, []);

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

  const handleLogout = React.useCallback(() => {
    axios
      .post("users/auth/logout/")
      .then(async () => {
        await AsyncStorage.removeItem("@token");
        setToken("");
      })
      .catch((error) => {
        console.log("teste erro");
      });
  }, []);

  const providerValue = React.useMemo(
    () => ({
      handleLogin: handleLogin,
      token: token,
      handleSetToken: handleSetToken,
      handleLogout: handleLogout,
    }),
    [handleLogin, token, handleLogout]
  );

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

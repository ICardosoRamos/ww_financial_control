import React from "react";
import useFetch from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoadingContext = React.createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // handleSetLoading: (value: boolean) => void;
}>({
  loading: false,
  setLoading: (value) => {},
  // handleSetLoading: (value) => {},
});

export const LoadingContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  // const handleSetLoading = React.useCallback((value: boolean) => {
  //   console.log(value);
  //   return setLoading(value);
  // }, []);

  const providerValue = React.useMemo(
    () => ({
      setLoading: setLoading,
      loading: loading,
      // handleSetLoading: handleSetLoading,
    }),
    [setLoading, loading]
  );

  return (
    <LoadingContext.Provider value={providerValue}>
      {children}
    </LoadingContext.Provider>
  );
};

import React from "react";

export const LoadingContext = React.createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loading: false,
  setLoading: (value) => {},
});

export const LoadingContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  const providerValue = React.useMemo(
    () => ({
      setLoading: setLoading,
      loading: loading,
    }),
    [setLoading, loading]
  );

  return (
    <LoadingContext.Provider value={providerValue}>
      {children}
    </LoadingContext.Provider>
  );
};

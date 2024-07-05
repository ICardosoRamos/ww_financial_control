import React from "react";

// LIBRARIES
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import { Spinner, TamaguiProvider, YStack, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";

// CONTEXTS
import { AuthContext, AuthContextProvider } from "./src/contexts/AuthContext";
import {
  LoadingContext,
  LoadingContextProvider,
} from "./src/contexts/LoadingContext";

// PUBLIC SCREENS
import Login from "./src/screens/public/Login";
import CreateAccount from "./src/screens/public/Create";

// PRIVATE SCREENS
import Home from "./src/screens/private/Home";

const Stack = createNativeStackNavigator();

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

const RoutesTarget: React.FC = () => {
  const authContext = React.useContext(AuthContext);
  const { loading } = React.useContext(LoadingContext);

  console.log(loading, "quase selcionando as rotas");

  if (loading) {
    return (
      <YStack f={1} justifyContent="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  return (
    <NavigationContainer>
      {authContext?.token ? (
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              header: (props) => {
                return (
                  <View style={{ backgroundColor: "red" }}>
                    <Text>
                      <>{props.options.headerTitle}</>
                    </Text>
                  </View>
                );
              },
              headerTitle: "Página Inicial",
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={CreateAccount}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  // const authContext = React.useContext(AuthContext);
  // const [routesTarget, setRoutesTarget] = React.useState("public");

  // React.useEffect(() => {
  //   if (!authContext?.token) return;
  // }, [authContext?.token]);

  if (!loaded) {
    return null;
  }

  return (
    <LoadingContextProvider>
      <AuthContextProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <SafeAreaView style={{ flex: 1 }}>
            <RoutesTarget />
          </SafeAreaView>
        </TamaguiProvider>
      </AuthContextProvider>
    </LoadingContextProvider>
  );
}

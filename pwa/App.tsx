import React from "react";

// LIBRARIES
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import { TamaguiProvider, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";

// CONTEXTS
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { LoadingContextProvider } from "./src/contexts/LoadingContext";

// PUBLIC SCREENS
import Login from "./src/screens/public/Login";
import CreateAccount from "./src/screens/public/Create";

// PRIVATE SCREENS
import Home from "./src/screens/private/Home";

const Stack = createNativeStackNavigator();

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;

const toastConfig = {
  /*
  Creates a warning type.
  */
  warning: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "orange" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
};

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

const RoutesTarget: React.FC = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <LoadingContextProvider>
      <AuthContextProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <SafeAreaView style={{ flex: 1 }}>
            <RoutesTarget />
            <Toast config={toastConfig} />
          </SafeAreaView>
        </TamaguiProvider>
      </AuthContextProvider>
    </LoadingContextProvider>
  );
}

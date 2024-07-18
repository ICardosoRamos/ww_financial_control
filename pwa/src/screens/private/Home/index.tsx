import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext, InitialUserAuth } from "../../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function Home() {
  const { handleLogout, userAuth, setUserAuth } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogoutAction = () => {
    handleLogout({
      email: userAuth.email,
    })
      .then(async ({ data: { success } }) => {
        console.log(success);
        await AsyncStorage.removeItem("@userAuth");
        setUserAuth(InitialUserAuth);

        return navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "login" }],
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tela Inicial</Text>
      <Button onPress={() => handleLogoutAction()}>
        <Text>Deslogar</Text>
      </Button>
    </View>
  );
}

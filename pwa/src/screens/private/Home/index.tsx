import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Home() {
  const { handleLogout } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tela Inicial</Text>
      <Button onPress={() => handleLogout()}>
        <Text>Deslogar</Text>
      </Button>
    </View>
  );
}

import React from "react";

// LIBRARIES
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Button as BTN, Form, Spinner, YStack } from "tamagui";

// CONTEXTS
import { AuthContext } from "../../../contexts/AuthContext";

// STYLES
import styles from "./styles";

// COMPONENTS
import TextInput from "../../../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();

  const authContext = React.useContext(AuthContext);

  const [emailAddress, setEmailAddress] = React.useState("irwyng2@gmail.com");
  const [password, setPassword] = React.useState("10293847Ir@");

  const [keyboardIsVisible, setKeyboardIsVisible] = React.useState(false);
  const [status, setStatus] = React.useState<
    "off" | "submitting" | "submitted"
  >("off");

  const handleSubmit = () => {
    authContext
      ?.handleLogin({
        email: emailAddress,
        password: password,
      })
      .then((response) => {
        const token = response.data.token;

        AsyncStorage.setItem("@token", token);
        return authContext.handleSetToken(token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        touchSoundDisabled
        onPress={() => {
          if (keyboardIsVisible) {
            setKeyboardIsVisible(false);
            return Keyboard.dismiss();
          }
        }}
      >
        <YStack flex={1}>
          <Animatable.View
            animation={"fadeInLeft"}
            style={styles.containerHeader}
          >
            <YStack>
              <Text style={styles.headerTitle}>Bem Vindo!!!</Text>

              <Text style={styles.headerTitle}>Faça seu login por aqui.</Text>
            </YStack>
          </Animatable.View>

          <Animatable.View animation={"fadeInUp"} style={styles.main}>
            <YStack gap={8}>
              <Form onSubmit={() => handleSubmit()} gap={8}>
                <TextInput
                  placeholder="teste@gmail.com"
                  onPress={(e) => setKeyboardIsVisible(true)}
                  value={emailAddress}
                  onChangeText={(text) => setEmailAddress(text)}
                  label={"Email"}
                  keyboardType="email-address"
                  style={{ height: 52 }}
                />

                <TextInput
                  placeholder="Ex: Teste123@"
                  onPress={(e) => setKeyboardIsVisible(true)}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  label={"Senha"}
                  style={{ height: 52 }}
                />

                <Form.Trigger asChild disabled={status !== "off"}>
                  <BTN
                    icon={
                      status === "submitting" ? () => <Spinner /> : undefined
                    }
                    color={"#fff"}
                    backgroundColor={"#0042a5"}
                    borderRadius={"$10"}
                    size={"$3.5"}
                  >
                    Login
                  </BTN>
                </Form.Trigger>
              </Form>
            </YStack>

            <YStack alignItems="center" gap={10}>
              <TouchableOpacity
                onPress={() => navigation.navigate("reset_password" as never)}
              >
                <Text style={{ color: "blue" }}>
                  Esqueceu sua senha? Clique para trocar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("register" as never)}
              >
                <Text style={{ color: "blue" }}>Criar nova conta</Text>
              </TouchableOpacity>
            </YStack>

            <YStack justifyContent="center" alignItems="center">
              <Animatable.Image
                source={require("../../../../assets/ww_financial_control_logo.png")}
                style={{ height: 120, width: 120 }}
                animation={"fadeInRight"}
              />
            </YStack>
          </Animatable.View>
        </YStack>
      </TouchableWithoutFeedback>
    </View>
  );
}

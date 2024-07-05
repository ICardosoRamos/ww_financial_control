import React from "react";

// LIBRARIES
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { Link } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Button } from "react-native-paper";

// CONTEXTS
import { AuthContext } from "../../../contexts/AuthContext";

// STYLES
import styles from "./styles";

// COMPONENTS
import TextInput from "../../../components/TextInput";

type TUserData = {
  emailAddress: string;
  password: string;
  confirmPassword: string;
  name: string;
  lastName: string;
  userName: string;
};

const InitialUserData: TUserData = {
  emailAddress: "",
  password: "",
  confirmPassword: "",
  name: "",
  lastName: "",
  userName: "",
};

export default function CreateAccount() {
  const { handleSetIsSignedIn } = React.useContext(AuthContext);

  const [userData, setUserData] = React.useState<TUserData>(InitialUserData);

  const [keyboardIsVisible, setKeyboardIsVisible] = React.useState(false);

  const handleSetUserData = (key: string, value: string) => {
    setUserData((prevState) => {
      return { ...prevState, [key]: value };
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
        <View style={{ flex: 1 }}>
          <Animatable.View
            animation={"fadeInLeft"}
            style={styles.containerHeader}
          >
            <Text style={styles.headerTitle}>Bem Vindo!!!</Text>

            <Text style={styles.headerTitle}>
              Insira seus dados e crie uma nova conta.
            </Text>
          </Animatable.View>

          <Animatable.View animation={"fadeInUp"} style={styles.main}>
            <View style={styles.mainForm}>
              <TextInput
                placeholder="Ex: João"
                onPress={(e) => setKeyboardIsVisible(true)}
                value={userData.name}
                onChangeText={(text) => handleSetUserData("name", text)}
                label={"Nome"}
              />

              <TextInput
                placeholder="Ex: da Silva"
                onPress={(e) => setKeyboardIsVisible(true)}
                value={userData.lastName}
                onChangeText={(text) => handleSetUserData("lastName", text)}
                label={"Sobrenome"}
              />

              <TextInput
                placeholder="Ex: _nome_usuario_123@_"
                onPress={(e) => setKeyboardIsVisible(true)}
                value={userData.userName}
                onChangeText={(text) => handleSetUserData("userName", text)}
                label={"Nome de Usuário"}
              />

              <TextInput
                placeholder="Ex: teste@gmail.com"
                onPress={(e) => setKeyboardIsVisible(true)}
                value={userData.emailAddress}
                onChangeText={(text) => handleSetUserData("emailAddress", text)}
                label={"Email"}
                keyboardType="email-address"
              />

              <TextInput
                placeholder="Ex: Teste123@"
                onPress={(e) => setKeyboardIsVisible(true)}
                value={userData.password}
                onChangeText={(text) => handleSetUserData("password", text)}
                secureTextEntry
                label={"Senha"}
              />

              <TextInput
                placeholder="Deve ser a mesma do campo acima"
                onPress={(e) => setKeyboardIsVisible(true)}
                value={userData.confirmPassword}
                onChangeText={(text) =>
                  handleSetUserData("confirmPassword", text)
                }
                secureTextEntry
                label={"Repita sua Senha"}
              />

              <Button
                onPress={(e) => handleSetIsSignedIn(true)}
                mode="contained"
                buttonColor="#0042a5"
              >
                <Text>Criar nova conta</Text>
              </Button>
            </View>

            <View style={styles.footer}>
              <Animatable.Image
                source={require("../../../../assets/ww_financial_control_logo.png")}
                style={{ height: 120, width: 120 }}
              />
            </View>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

import React from "react";

// LIBRARIES
import {
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Button as BTN, Checkbox, Form, Label, XStack, YStack } from "tamagui";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

// CONTEXTS
import { AuthContext } from "../../../contexts/AuthContext";

// STYLES
import styles from "./styles";

// COMPONENTS
import TextInput from "../../../components/TextInput";

export default function Login() {
  const navigation = useNavigation();

  const { userAuth, setUserAuth, handleLogin } = React.useContext(AuthContext);

  const [emailAddress, setEmailAddress] = React.useState("irwyng2@gmail.com");
  const [password, setPassword] = React.useState("10293847Ir@");
  const [keepsLoggedInWithBiometric, setKeepsLoggedInWithBiometric] =
    React.useState(true);

  const [loginFromScratch, setLoginFromScratch] = React.useState(false);

  const [keyboardIsVisible, setKeyboardIsVisible] = React.useState(false);

  const verifyIfItsBiometricAuthenticated = async () => {
    if (userAuth.keepsLoggedInWithBiometric) {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      if (compatible) {
        const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (isBiometricEnrolled) {
          const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Use sua biometrica para logar!",
          });

          if (biometricAuth.success) {
            return navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "home" }],
              })
            );
          } else if (biometricAuth.error) {
            if (biometricAuth.error === "user_cancel") {
              return console.warn(
                "Verificação de biometria cancelada pelo usuário!"
              );
            } else {
              return console.error(
                "Erro na autenticação por biometria!",
                biometricAuth.error
              );
            }
          }
        }
      }
    }
  };

  React.useEffect(() => {
    if (loginFromScratch) return;
    if (!userAuth.keepsLoggedInWithBiometric) return;
    verifyIfItsBiometricAuthenticated();
  }, [JSON.stringify(userAuth)]);

  const handleSubmit = () => {
    if (keyboardIsVisible) {
      setKeyboardIsVisible(false);
      Keyboard.dismiss();
    }

    const handlesUserLocalAndContextualStorage = async (
      email: string,
      token: string,
      keepsLoggedInWithBiometric: boolean
    ) => {
      const userData = {
        email: email,
        token: token,
        keepsLoggedInWithBiometric: keepsLoggedInWithBiometric,
      };

      await AsyncStorage.setItem("@userAuth", JSON.stringify(userData));

      setLoginFromScratch(true);

      setUserAuth(userData);
    };

    const login = async () => {
      if (keepsLoggedInWithBiometric) {
        const compatible = await LocalAuthentication.hasHardwareAsync();

        if (compatible) {
          const isBiometricEnrolled =
            await LocalAuthentication.isEnrolledAsync();

          if (isBiometricEnrolled) {
            const biometricAuth = await LocalAuthentication.authenticateAsync({
              promptMessage: "Use sua biometrica para logar!",
            });

            if (biometricAuth.success) {
              handleLogin({
                email: emailAddress,
                password: password,
              })
                .then(async ({ data: { token } }) => {
                  await handlesUserLocalAndContextualStorage(
                    emailAddress,
                    token,
                    true
                  );

                  return navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "home" }],
                    })
                  );
                })
                .catch(() => {
                  return Toast.show({
                    text1: "Verificação biométrica",
                    text2:
                      "Erro interno, se este aviso voltar a acontecer, contate o suporte!",
                    type: "error",
                  });
                });
            } else {
              if (biometricAuth.error === "user_cancel") {
                return Toast.show({
                  text1: "Verificação biométrica",
                  text2: "Verificação biométrica cancelada pelo usuário!",
                  type: "warning",
                });
              } else {
                return Toast.show({
                  text1: "Verificação biométrica",
                  text2:
                    "Erro interno, se este aviso voltar a acontecer, contate o suporte!",
                  type: "error",
                });
              }
            }
          } else {
            return Toast.show({
              text1: "Verificação biométrica",
              text2:
                "Não há biometria cadastrada, registre uma nas configurações e depois tente novamente!",
              type: "warning",
            });
          }
        } else {
          return Toast.show({
            text1: "Verificação biométrica",
            text2:
              "O dispositivo não é compatível com nenhuma tecnologia de biometria!",
            type: "error",
          });
        }
      } else {
        handleLogin({
          email: emailAddress,
          password: password,
        })
          .then(async ({ data: { token } }) => {
            await handlesUserLocalAndContextualStorage(
              emailAddress,
              token,
              false
            );

            return navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "home" }],
              })
            );
          })
          .catch((error: AxiosError) => {
            console.error(error.response);
          });
      }
    };

    return login();
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

                <XStack
                  justifyContent="flex-end"
                  gap={"$3"}
                  alignItems="center"
                >
                  <Label
                    paddingRight="$0"
                    justifyContent="flex-end"
                    size={"$2"}
                    htmlFor="boolean-biometric-login"
                  >
                    Acessar com biometria na próxima vez?
                  </Label>
                  <Checkbox
                    id="boolean-biometric-login"
                    size={"$4"}
                    onCheckedChange={(checked) =>
                      setKeepsLoggedInWithBiometric(!!checked)
                    }
                  >
                    <Checkbox.Indicator>
                      <Ionicons name="checkmark" />
                    </Checkbox.Indicator>
                  </Checkbox>
                </XStack>

                <Form.Trigger asChild>
                  <BTN
                    disabled={!emailAddress || !password}
                    opacity={!emailAddress || !password ? 0.5 : 1}
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
                source={require("../../../../assets/ww_financial_control_logo_version_2.png")}
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

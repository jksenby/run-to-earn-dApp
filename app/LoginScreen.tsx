import React, { memo, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/utils";
import { Link, useNavigation } from "expo-router";
import { Navigation } from "@/types";
import { useSDK } from "@metamask/sdk-react";
import { Web3 } from "web3";
import abi from "../constants/abi.json";

type Props = {
  navigation: Navigation;
};

const contractAddress = "0x61f3D6bf8f9494346Bb934D430ad40318Ae3Ae2D";

const LoginScreen = ({ navigation }: Props) => {
  navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const {
    sdk,
    provider: ethereum,
    status,
    chainId,
    account,
    balance,
    readOnlyCalls,
    connected,
  } = useSDK();
  const [password, setPassword] = useState({ value: "", error: "" });
  const [registrationStatus, setRegistrationStatus] = React.useState("");

  // const registration = async () => {
  //   try {
  //     const registerFunctionABI = {
  //       inputs: [],
  //       name: "register",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     };
  //     const data = web3.eth.abi.encodeFunctionCall(registerFunctionABI, []);
  //     await ethereum!.request({ method: "eth_requestAccounts" });
  //     const from = ethereum!.selectedAddress;
  //     const txHash = await ethereum!.request({
  //       method: "eth_sendTransaction",
  //       params: [
  //         {
  //           from,
  //           to: contractAddress,
  //           data,
  //           value: "0x0",
  //         },
  //       ],
  //     });
  //     Alert.alert(`Transaction sent: ${txHash}`);
  //     console.log(`Transaction sent: ${txHash}`);
  //   } catch (error) {
  //     Alert.alert(`Failed to register in RunToEarn: ${error}`);
  //     console.error("Failed to register in RunToEarn:", error);
  //   }
  // };

  // // This is where you initialize the WalletConnect provider
  useEffect(() => {
    console.log(status);
  }, []);

  const connectWallet = async () => {
    try {
      const a = await sdk?.connect();
      console.log(sdk);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  const disconnectWallet = async () => {
    try {
      await sdk!.disconnect();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    // Here you can check if the provider and contract are ready
    // Perform sign-in logic with MetaMask or WalletConnect
    navigation.navigate("Start");
  };

  return (
    <Background>
      <BackButton goBack="/" />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        enterKeyHint="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        textContentType="emailAddress"
        inputMode="email"
      />

      <TextInput
        label="Password"
        enterKeyHint="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>
      <Button mode="contained" onPress={connectWallet}>
        Login with metamask
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <Link href="/RegisterScreen">
          <Pressable>
            <Text style={styles.link}>Sign up</Text>
          </Pressable>
        </Link>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
});

export default memo(LoginScreen);

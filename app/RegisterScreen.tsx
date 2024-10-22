import React, { memo, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { Navigation } from "../types";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../core/utils";
import { Link } from "expo-router";

const RegisterScreen = () => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const response = await fetch("http://localhost:3000/api/register", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        password: password.value,
        email: email.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Error in signing up");
    }

    response.json().then((value) => {
      console.log(value);
    });
  };

  return (
    <Background>
      <BackButton goBack={"/"} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        enterKeyHint="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />

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

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <Link href="/LoginScreen">
          <Pressable>
            <Text style={styles.link}>Login</Text>
          </Pressable>
        </Link>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
});

export default memo(RegisterScreen);

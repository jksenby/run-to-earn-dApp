import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Link } from "expo-router";

const HomeScreen = () => (
  <Background>
    <Logo />
    <Header>Run to earn</Header>

    <Paragraph>Join us!</Paragraph>
    <Button mode="contained">
      <Link href="/LoginScreen">Login</Link>
    </Button>
    <Button mode="outlined">
      <Link href="/RegisterScreen">Sign Up</Link>
    </Button>
  </Background>
);

export default memo(HomeScreen);

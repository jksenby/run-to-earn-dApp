import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { Navigation } from "../types";
import { Link } from "expo-router";

type Props = {
  navigation: Navigation;
};

const Start = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Thank you for joining our project. Hope we can help you
    </Paragraph>

    <Button mode="outlined">
      <Link href="/App">Start </Link>
    </Button>
  </Background>
);

export default memo(Start);

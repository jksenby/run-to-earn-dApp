import React, { memo, useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Link } from "expo-router";
import { Pedometer } from "expo-sensors";

const HomeScreen = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();

    console.log(process.env.INFURA_API_KEY);

    return () => {
      if (!!subscription) {
        subscription.then((subscription) => {
          subscription?.remove();
        });
      }
    };
  }, []);
  return (
    <Background>
      <Logo />
      <Header>Run to earn</Header>

      <Paragraph>
        Pedometer.isAvailableAsync(): {isPedometerAvailable}
      </Paragraph>
      <Paragraph>Steps taken in the last 24 hours: {pastStepCount}</Paragraph>
      <Paragraph>Walk! And watch this go up: {currentStepCount}</Paragraph>

      <Paragraph>Join us!</Paragraph>
      <Button mode="contained">
        <Link href="/LoginScreen">Login</Link>
      </Button>
      <Button mode="outlined">
        <Link href="/RegisterScreen">Sign Up</Link>
      </Button>
    </Background>
  );
};

export default memo(HomeScreen);

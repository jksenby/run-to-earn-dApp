import { Href, Link } from "expo-router";
import React, { memo } from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

type Props = {
  goBack: Href<string | object>;
};

const BackButton = ({ goBack }: Props) => (
  <Pressable style={styles.container}>
    <Link href={goBack}>
      <Image
        style={styles.image}
        source={require("../assets/images/arrow_back.png")}
      />
    </Link>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);

import { StyleSheet, Text } from "react-native";
import Paragraph from "./Paragraph";
import "../global.css";

type Props = {
  children: string;
};

export default function (props: Props) {
  return (
    <>
      <Paragraph>{props.children}</Paragraph>
      <Text style={styles.text} className="mt-3 mr-2">
        as
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
});

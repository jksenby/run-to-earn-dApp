import Background from "@/components/Background";
import Paragraph from "@/components/Paragraph";
import { useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";

const MainScreen = () => {
  const [value, setValue] = useState(0);

  return (
    <Background>
      <Paragraph>Ежедневная цель: 2км</Paragraph>
      <CircularProgress
        value={value}
        radius={120}
        duration={2000}
        progressValueColor={"#ecf0f1"}
        circleBackgroundColor={"#000000"}
        maxValue={200}
        title={"М"}
        titleColor={"white"}
        titleStyle={{ fontWeight: "bold" }}
      />
    </Background>
  );
};

export default MainScreen;

import Background from "@/components/Background";
import { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { Platform, StyleSheet, View } from "react-native";
import MapView from "../constants/map";

const MapScreen = () => {
  return (
    <Background>
      <MapView provider={PROVIDER_GOOGLE} />
    </Background>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

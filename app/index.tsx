import React, { memo, useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Link } from "expo-router";
import "expo-router/entry";
import "node-libs-expo/globals";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import {
  MetaMaskProvider,
  SDKConfigProvider,
  useSDKConfig,
} from "@metamask/sdk-react";
import { AppState, AppStateStatus, Linking, LogBox } from "react-native";
import { StorageManagerRN } from "../StorageManagerRN";

LogBox.ignoreLogs([
  "Possible Unhandled Promise Rejection",
  "Message ignored because invalid key exchange status",
  "MetaMask: 'ethereum._metamask' exposes",
  "`new NativeEventEmitter()` was called with a non-null",
]);

let canOpenLink = true;

const WithSDKConfig = ({ children }: { children: React.ReactNode }) => {
  const {
    socketServer,
    infuraAPIKey,
    useDeeplink,
    debug,
    checkInstallationImmediately,
  } = useSDKConfig();

  return (
    <MetaMaskProvider
      debug={debug}
      sdkOptions={{
        communicationServerUrl: socketServer,
        enableAnalytics: true,
        infuraAPIKey,
        readonlyRPCMap: {
          "0x539": process.env.NEXT_PUBLIC_PROVIDER_RPCURL ?? "",
        },
        logging: {
          developerMode: true,
          plaintext: true,
        },
        openDeeplink: (link: string, _target?: string) => {
          console.debug(`App::openDeepLink() ${link}`);
          if (canOpenLink) {
            Linking.openURL(link);
          } else {
            console.debug(
              "useBlockchainProiver::openDeepLink app is not active - skip link",
              link
            );
          }
        },
        useDeeplink,
        checkInstallationImmediately,
        storage: {
          enabled: true,
          storageManager: new StorageManagerRN(),
        },
        dappMetadata: {
          name: "expo-demo",
        },
        i18nOptions: {
          enabled: true,
        },
      }}
    >
      {children}
    </MetaMaskProvider>
  );
};

const HomeScreen = () => {
  const handleAppState = (appState: AppStateStatus) => {
    canOpenLink = appState === "active";
    console.debug(`AppState change: ${appState} canOpenLink=${canOpenLink}`);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppState);

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <SDKConfigProvider initialInfuraKey={"c1762497ab2147e1b4f60f74da1482ac"}>
      <WithSDKConfig>
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
      </WithSDKConfig>
    </SDKConfigProvider>
  );
};

export default memo(HomeScreen);

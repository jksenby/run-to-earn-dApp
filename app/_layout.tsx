import { Stack } from "expo-router";

import "expo-router/entry";
import "node-libs-expo/globals";
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import {
  MetaMaskProvider,
  SDKConfigProvider,
  useSDKConfig,
} from "@metamask/sdk-react";
import { AppState, AppStateStatus, Linking, LogBox, Text } from "react-native";
import { StorageManagerRN } from "../StorageManagerRN";
import { useEffect } from "react";

let canOpenLink = true;

LogBox.ignoreLogs([
  "Possible Unhandled Promise Rejection",
  "Message ignored because invalid key exchange status",
  "MetaMask: 'ethereum._metamask' exposes",
  "`new NativeEventEmitter()` was called with a non-null",
]);

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
          name: "Run to Earn",
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

export default function RootLayout() {
  const handleAppState = (appState: AppStateStatus) => {
    canOpenLink = appState === "active";
    console.debug(`AppState change: ${appState} canOpenLink=${canOpenLink}`);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppState);

    return () => {
      subscription.remove();
    };
  });

  return (
    <SDKConfigProvider initialInfuraKey={"c1762497ab2147e1b4f60f74da1482ac"}>
      <WithSDKConfig>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen options={{ title: "Login" }} name="LoginScreen" />
        </Stack>
      </WithSDKConfig>
    </SDKConfigProvider>
  );
}

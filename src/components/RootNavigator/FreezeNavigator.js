// @flow

import React from "react";
import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenName } from "../../const";
import { closableStackNavigatorConfig } from "../../navigation/navigatorConfig";
import Info from "../../screens/FreezeFunds/01-Info";
import Amount from "../../screens/FreezeFunds/02-Amount";
import SelectDevice from "../../screens/SelectDevice";
import ConnectDevice from "../../screens/ConnectDevice";
import ValidationSuccess from "../../screens/FreezeFunds/04-ValidationSuccess";
import ValidationError from "../../screens/FreezeFunds/04-ValidationError";
import StepHeader from "../StepHeader";

const totalSteps = "3";

export default function FreezeNavigator() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={closableStackNavigatorConfig}>
      <Stack.Screen
        name={ScreenName.FreezeInfo}
        component={Info}
        options={{
          headerTitle: () => (
            <StepHeader title={t("freeze.stepperHeader.info")} />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.FreezeAmount}
        component={Amount}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("freeze.stepperHeader.selectAmount")}
              subtitle={t("freeze.stepperHeader.stepRange", {
                currentStep: "1",
                totalSteps,
              })}
            />
          ),
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.FreezeSelectDevice}
        component={SelectDevice}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("freeze.stepperHeader.selectDevice")}
              subtitle={t("freeze.stepperHeader.stepRange", {
                currentStep: "2",
                totalSteps,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.FreezeConnectDevice}
        component={ConnectDevice}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("freeze.stepperHeader.connectDevice")}
              subtitle={t("freeze.stepperHeader.stepRange", {
                currentStep: "3",
                totalSteps,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.FreezeValidationSuccess}
        component={ValidationSuccess}
        options={{
          headerTitle: null,
          gestureEnabled: false,
          headerLeft: null,
          headerRight: null,
        }}
      />
      <Stack.Screen
        name={ScreenName.FreezeValidationError}
        component={ValidationError}
        options={{ headerTitle: null }}
      />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();

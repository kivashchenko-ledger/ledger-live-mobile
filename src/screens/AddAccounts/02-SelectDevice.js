// @flow

import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import type { CryptoCurrency } from "@ledgerhq/live-common/lib/types";
import type { Device } from "@ledgerhq/live-common/lib/hw/actions/types";
import { createAction } from "@ledgerhq/live-common/lib/hw/actions/app";
import connectApp from "@ledgerhq/live-common/lib/hw/connectApp";
import { prepareCurrency } from "../../bridge/cache";
import { ScreenName } from "../../const";
import colors from "../../colors";
import { TrackScreen } from "../../analytics";
import SelectDevice from "../../components/SelectDevice";
import NavigationScrollView from "../../components/NavigationScrollView";
import DeviceActionModal from "../../components/DeviceActionModal";

const forceInset = { bottom: "always" };

type Props = {
  navigation: any,
  route: { params: RouteParams },
};

type RouteParams = {
  currency: CryptoCurrency,
  inline?: boolean,
};

const action = createAction(connectApp);

export default function AddAccountsSelectDevice({ navigation, route }: Props) {
  const [device, setDevice] = useState<?Device>();

  const onClose = useCallback(() => {
    setDevice();
  }, []);

  const onResult = useCallback(
    meta => {
      setDevice();
      const { currency, inline } = route.params;
      const arg = {
        currency,
        inline,
        ...meta,
      };
      if (inline) {
        navigation.replace(ScreenName.AddAccountsAccounts, arg);
      } else {
        navigation.navigate(ScreenName.AddAccountsAccounts, arg);
      }
    },
    [navigation, route],
  );

  useEffect(() => {
    // load ahead of time
    prepareCurrency(route.params.currency);
  }, [route.params.currency]);

  const currency = route.params.currency;
  return (
    <SafeAreaView style={styles.root} forceInset={forceInset}>
      <NavigationScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        <TrackScreen
          category="AddAccounts"
          name="SelectDevice"
          currencyName={currency.name}
        />
        <SelectDevice onSelect={setDevice} />
      </NavigationScrollView>
      <DeviceActionModal
        action={action}
        device={device}
        onResult={onResult}
        onClose={onClose}
        request={{
          currency:
            currency.type === "TokenCurrency"
              ? currency.parentCurrency
              : currency,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
});

/* @flow */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Switch } from "react-native";
import { createStructuredSelector } from "reselect";
import SettingsRow from "../../../components/SettingsRow";
import { setReadOnlyMode } from "../../../actions/settings";
import { readOnlyModeEnabledSelector } from "../../../reducers/settings";
import Track from "../../../analytics/Track";

type Props = {
  readOnlyModeEnabled: boolean,
  setReadOnlyMode: boolean => void,
};
const mapStateToProps = createStructuredSelector({
  readOnlyModeEnabled: readOnlyModeEnabledSelector,
});

const mapDispatchToProps = {
  setReadOnlyMode,
};

class DeveloperModeRow extends PureComponent<Props> {
  render() {
    const { readOnlyModeEnabled, setReadOnlyMode, ...props } = this.props;
    return (
      <SettingsRow
        event="ReadOnlyModeRow"
        title="ReadOnly mode"
        desc="Toggle readonly mode for testing, relaunch to refresh topbar"
        onPress={null}
        alignedTop
        {...props}
      >
        <Track
          event={
            readOnlyModeEnabled ? "EnableReadOnlyMode" : "DisableReadOnlyMode"
          }
          onUpdate
        />
        <Switch value={readOnlyModeEnabled} onValueChange={setReadOnlyMode} />
      </SettingsRow>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeveloperModeRow);
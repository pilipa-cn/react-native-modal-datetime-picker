import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePickerIOS, Text, TouchableOpacity, View ,Modal} from 'react-native';

import styles from './index.style';

export default class CustomDatePickerIOS extends Component {
  static propTypes = {
    cancelTextIOS: PropTypes.string,
    confirmTextIOS: PropTypes.string,
    customCancelButtonIOS: PropTypes.node,
    customConfirmButtonIOS: PropTypes.node,
    customConfirmButtonWhileInteractingIOS: PropTypes.node,
    customTitleContainerIOS: PropTypes.node,
    contentContainerStyleIOS: PropTypes.any,
    datePickerContainerStyleIOS: PropTypes.any,
    date: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onConfirm: PropTypes.func.isRequired,
    onHideAfterConfirm: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    titleIOS: PropTypes.string,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    cancelTextIOS: 'Cancel',
    confirmTextIOS: '确认',
    date: new Date(),
    mode: 'date',
    titleIOS: 'Pick a date',
    isVisible: false,
    onHideAfterConfirm: () => {},
  };

  state = {
    date: this.props.date,
    userIsInteractingWithPicker: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.setState({
        date: nextProps.date,
      });
    }
  }

  _handleCancel = () => {
    this.confirmed = false;
    this.props.onCancel();
  };

  _handleConfirm = () => {
    this.confirmed = true;
    this.props.onConfirm(this.state.date);
  }

  _handleOnModalHide = () => {
    if (this.confirmed) {
      this.props.onHideAfterConfirm(this.state.date);
    }
  };

  _handleDateChange = date => {
    this.setState({
      date,
      userIsInteractingWithPicker: false,
    });
  };

  _handleUserTouchInit = () => {
    this.setState({
      userIsInteractingWithPicker: true,
    });
    return false;
  };

  render() {
    const {
      isVisible,
      mode,
      titleIOS,
      confirmTextIOS,
      cancelTextIOS,
      customCancelButtonIOS,
      customConfirmButtonIOS,
      customConfirmButtonWhileInteractingIOS,
      contentContainerStyleIOS,
      customTitleContainerIOS,
      datePickerContainerStyleIOS,
      date,
      ...otherProps
    } = this.props;

    const titleContainer = (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{titleIOS}</Text>
      </View>
    );
    let confirmButton;

    // Interested PR: https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/40
    // Issue on React-Native: https://github.com/facebook/react-native/issues/8169
    // Up until now when the user interacted with the picker, if he tapped on the confirm button,
    // the state was not yet changed and thus the picked value would be old and miss-leading.
    // DatePickerIOS does not update on the fly, and before it even manages to dispatch an update,
    // our component is unmounted and thus the state is lost.
    // We no longer allow our user to tap the confirm button unless the picker is still.
    // They can always tap the cancel button anyway.
    if (customConfirmButtonIOS) {
      if (customConfirmButtonWhileInteractingIOS && this.state.userIsInteractingWithPicker) {
        confirmButton = customConfirmButtonWhileInteractingIOS;
      } else {
        confirmButton = customConfirmButtonIOS;
      }
    } else {
      confirmButton = <Text style={styles.confirmText}>{confirmTextIOS}</Text>;
    }
    const cancelButton = <Text style={styles.cancelText}>{cancelTextIOS}</Text>;
    return (
      <Modal
        isVisible={isVisible}
        style={[styles.contentContainer, contentContainerStyleIOS]}
        onModalHide={this._handleOnModalHide}
        transparent={true} //背景透明
      >
        <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={this._handleCancel}//点击灰色区域消失
        >

        <View style={[styles.datepickerContainer, datePickerContainerStyleIOS]}>
          <View style={styles.contentstyle}>
          {customTitleContainerIOS || <View style={styles.confirmButton}>
          <TouchableOpacity
              onPress={this._handleConfirm}
              disabled={this.state.userIsInteractingWithPicker}
          >
              {confirmButton}
          </TouchableOpacity>
          </View>}
          <View onStartShouldSetResponderCapture={this._handleUserTouchInit}>
            <DatePickerIOS
              date={this.state.date}
              mode={mode}
              onDateChange={this._handleDateChange}
              {...otherProps}
            />
          </View>
          {/*<View style={styles.confirmButton}>*/}
            {/*<TouchableOpacity*/}
              {/*onPress={this._handleConfirm}*/}
              {/*disabled={this.state.userIsInteractingWithPicker}*/}
            {/*>*/}
              {/*{confirmButton}*/}
            {/*</TouchableOpacity>*/}
          {/*</View>*/}
          </View>
        </View>

        {/*<View style={styles.cancelButton}>*/}
          {/*<TouchableOpacity onPress={this._handleCancel}>*/}
            {/*{customCancelButtonIOS || cancelButton}*/}
          {/*</TouchableOpacity>*/}
        {/*</View>*/}
        </TouchableOpacity>

      </Modal>
    );
  }
}

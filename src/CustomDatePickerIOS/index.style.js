import { StyleSheet,Dimensions } from 'react-native';

const BORDER_RADIUS = 14;
const BACKGROUND_COLOR = 'white';
const BORDER_COLOR = '#d5d5d5';
const TITLE_FONT_SIZE = 18;
const TITLE_COLOR = 'black';
const BUTTON_FONT_WEIGHT = 'normal';
const BUTTON_FONT_COLOR = '#e5151d';
const BUTTON_FONT_SIZE = 18;
const window = Dimensions.get('window');
export const SCREEN_HEIGHT = window.height;
export const SCREEN_WIDTH = window.width;


export default StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-end',
      backgroundColor:'rgba(0, 0, 0, 0.25)',
  },
  datepickerContainer: {
    // backgroundColor: BACKGROUND_COLOR,
      flex:1,
      justifyContent: 'flex-end',
      backgroundColor:'rgba(0, 0, 0, 0.25)',
  },
    contentstyle:{
        width: SCREEN_WIDTH ,
        height: SCREEN_HEIGHT * 0.38,
        backgroundColor: BACKGROUND_COLOR,
    },
  titleContainer: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 12,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE,
  },
  confirmButton: {
    backgroundColor: 'transparent',
      borderBottomColor: BORDER_COLOR,
      borderBottomWidth: StyleSheet.hairlineWidth,
  },
  confirmText: {
    textAlign: 'right',
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
    backgroundColor: 'transparent',
    padding: 12,
      paddingRight:30,
  },
  cancelButton: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
  },
  cancelText: {
    padding: 10,
    textAlign: 'center',
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
});

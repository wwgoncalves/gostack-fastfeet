import { StatusBar, Platform } from 'react-native';

const colors = {
  white: {
    style: 'dark-content',
    bgColor: '#fff',
  },
  purple: {
    style: 'light-content',
    bgColor: '#7d40e7',
  },
};

export default function (color) {
  StatusBar.setBarStyle(colors[color].style);
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(colors[color].bgColor);
  }
}

import {DefaultTheme} from 'react-native-paper';
import {DefaultTheme as DefaultNavTheme} from '@react-navigation/native';

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFFBF5',
    accent: '#FF8F8F',
  },
};

export const navTheme = {
  ...DefaultNavTheme,
  colors: {
    ...DefaultNavTheme.colors,
    background: '#FFF3D9',
  },
};

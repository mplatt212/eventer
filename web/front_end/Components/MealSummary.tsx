import React from 'react';
import {View} from 'react-native';
import {Headline, Surface, Text, useTheme} from 'react-native-paper';
import {IProps} from '../Pages/Home';

const MealSummary = ({navigation}: IProps) => {
  const {colors} = useTheme();

  return (
    <Surface
      style={{
        backgroundColor: '#F2F2FF',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 7,
      }}
      onTouchStart={() => navigation.navigate('Meal List')}>
      <Headline>Meals</Headline>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          <Text>
            <Text style={{color: colors.accent}}>5 </Text>
            <Text>meals planned.</Text>
          </Text>
          <Text>
            <Text style={{color: colors.accent}}>1 </Text>
            <Text>dining out.</Text>
          </Text>
        </View>
        <View>
          <Text>
            <Text style={{color: colors.accent}}>1 </Text>
            <Text>breakfasts.</Text>
          </Text>
          <Text>
            <Text style={{color: colors.accent}}>1 </Text>
            <Text>lunches.</Text>
          </Text>
          <Text>
            <Text style={{color: colors.accent}}>2 </Text>
            <Text>dinners.</Text>
          </Text>
        </View>
      </View>
    </Surface>
  );
};

export default MealSummary;

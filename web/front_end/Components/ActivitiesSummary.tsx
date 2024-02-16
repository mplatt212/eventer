import React from 'react';
import {View} from 'react-native';
import {Headline, Surface, Text, useTheme} from 'react-native-paper';

const ActivitiesSummary = () => {
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
      }}>
      <Headline>Activities</Headline>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View>
          <Text>
            <Text style={{color: colors.accent}}>3 </Text>
            <Text>activities planned.</Text>
          </Text>
        </View>
        {/* <View>
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
        </View> */}
      </View>
    </Surface>
  );
};

export default ActivitiesSummary;

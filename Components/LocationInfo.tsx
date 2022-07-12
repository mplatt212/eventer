import React from 'react';
import {List, Text, useTheme} from 'react-native-paper';

const LocationInfo = () => {
  const {colors} = useTheme();

  return (
    <List.Section
      style={{
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#000',
      }}>
      <List.Accordion
        title={<Text style={{color: colors.accent}}>1234 Beach Ave.</Text>}>
        <List.Item title="6 BR, Sleeps 18" style={{paddingVertical: 0}} />
        <List.Item title="Fenced pool" style={{paddingVertical: 0}} />
        <List.Item title="Boardwalk to beach" style={{paddingVertical: 0}} />
        <List.Item title="No smoking" style={{paddingVertical: 0}} />
      </List.Accordion>
    </List.Section>
  );
};

export default LocationInfo;

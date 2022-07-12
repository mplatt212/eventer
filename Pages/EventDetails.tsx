import React from 'react';
import {View} from 'react-native';
import {Headline, Text} from 'react-native-paper';
import ActivitiesSummary from '../Components/ActivitiesSummary';
import LocationInfo from '../Components/LocationInfo';
import MealSummary from '../Components/MealSummary';
import {IProps} from './Home';

const EventDetails = ({route, navigation}: IProps) => {
  const {event} = route.params;
  const {name, location, startDate, endDate, participantCount} = event;

  return (
    <View style={{marginTop: 25, paddingHorizontal: 25}}>
      <Headline style={{textAlign: 'center'}}>{name}</Headline>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text>
          {startDate} - {endDate}
        </Text>
        <Text>{participantCount} Participants</Text>
      </View>
      <Text>{location}</Text>
      <LocationInfo />
      <MealSummary navigation={navigation} />
      <ActivitiesSummary />
    </View>
  );
};

export default EventDetails;

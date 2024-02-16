import React from 'react';
import {View} from 'react-native';
import {Headline, Text} from 'react-native-paper';
import ActivitiesSummary from '../Components/ActivitiesSummary';
import LocationInfo from '../Components/LocationInfo';
import MealSummary from '../Components/MealSummary';
import {IProps} from './Home';

const EventDetails = ({route, navigation}: IProps) => {
  const {event} = route.params;
  const {name, location, start_date, end_date, participant_count} = event;

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
          {new Date(start_date).getMonth() + 1}/{new Date(start_date).getDate()}
          /{new Date(start_date).getFullYear()} -
          {new Date(end_date).getMonth() + 1}/{new Date(end_date).getDate()}/
          {new Date(end_date).getFullYear()}
        </Text>
        <Text>{participant_count ? participant_count : 0} Participants</Text>
      </View>
      <Text>{location}</Text>
      <LocationInfo />
      <MealSummary navigation={navigation} />
      <ActivitiesSummary />
    </View>
  );
};

export default EventDetails;

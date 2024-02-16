import {observer} from 'mobx-react';
import React from 'react';
import {View} from 'react-native';
import {Button, Divider, Headline, Paragraph, Title} from 'react-native-paper';
import EventList from '../Components/EventList';
import store from '../Store/Store';

export interface IProps {
  navigation: any;
  route?: any;
}

const Home = ({navigation}: IProps) => {
  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 25, flex: 1}}>
        <Headline style={{marginTop: 25}}>
          Hello, {store.authStore.firstName}!
        </Headline>
        <Paragraph>
          Your next vacation is in{' '}
          {store.events.length > 0 &&
            new Date(store.events[0].end_date as string).getDate() -
              new Date(store.events[0].start_date as string).getDate()}{' '}
          days! It's never too early to start organizing.
        </Paragraph>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Title style={{marginVertical: 15}}>Upcoming Events</Title>
          <Button
            mode="contained"
            style={{marginVertical: 15}}
            onPress={() => store.setNewEventModalOpen(true)}>
            Add Event
          </Button>
        </View>
        <Divider style={{width: '100%', height: 2}} />
        <EventList navigation={navigation} />
      </View>
    </View>
  );
};

export default observer(Home);

import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {Headline, Text} from 'react-native-paper';
import {IProps} from '../Pages/Home';
import store from '../Store/Store';
import {eventFetch} from '../Fetches/EventFetch';
import {observer} from 'mobx-react';
import AddEventModal from './AddEventModal';

const EventList = ({navigation}: IProps) => {
  const [refreshEvents, setRefreshEvents] = useState<boolean>(false);

  useEffect(() => {
    setRefreshEvents(true);
    eventFetch().then(() => setRefreshEvents(false));
  }, []);

  return (
    <View>
      <AddEventModal />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshEvents}
            onRefresh={() => eventFetch()}
          />
        }
        data={store.events}
        renderItem={({item: event}) => (
          <View
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
            onTouchStart={() =>
              navigation.navigate('Event Details', {
                event: event,
              })
            }>
            <Headline>{event.name}</Headline>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{event.location}</Text>
              <Text>
                {new Date(event.start_date).getMonth() + 1}/
                {new Date(event.start_date).getDate()}/
                {new Date(event.start_date).getFullYear()} -
                {new Date(event.end_date).getMonth() + 1}/
                {new Date(event.end_date).getDate()}/
                {new Date(event.end_date).getFullYear()}
              </Text>
            </View>
            <Text style={{marginLeft: 'auto', marginTop: 5}}>
              {event.participant_count} Participants
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default observer(EventList);

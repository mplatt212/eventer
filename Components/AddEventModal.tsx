import {observer} from 'mobx-react';
import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {
  Headline,
  Modal,
  Portal,
  TextInput,
  Button,
  useTheme,
  Text,
} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {FormBuilder} from 'react-native-paper-form-builder';
import {eventFetch} from '../Fetches/EventFetch';
import store from '../Store/Store';

interface IDates {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const AddEventModal = () => {
  const {colors} = useTheme();
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<IDates>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      location: '',
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
    mode: 'onChange',
  });

  const DateField = () => {
    return (
      <Text
        theme={{colors: {primary: colors.accent}}}
        style={{maxHeight: 50, alignSelf: 'center'}}>
        {`${
          (dateRange.startDate?.getMonth() as any) + 1
        }/${dateRange.startDate?.getDate()}/${dateRange.startDate?.getFullYear()} - ${
          (dateRange.endDate?.getMonth() as any) + 1
        }/${dateRange.endDate?.getDate()}/${dateRange.endDate?.getFullYear()}`}
      </Text>
    );
  };

  const handleModalClose = () => {
    store.setNewEventModalOpen(false);
    setName('');
    setLocation('');
  };

  const onDismiss = useCallback(() => {
    setDatePickerOpen(false);
  }, [setDatePickerOpen]);

  const onConfirm = useCallback(
    ({startDate, endDate}: IDates) => {
      setDatePickerOpen(false);
      setDateRange({startDate, endDate});
    },
    [setDatePickerOpen, setDateRange],
  );

  const submitData = async (event: any) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    };
    await fetch(`http://10.0.2.2:3000/new_event/${event}`, options)
      .then(r => r.json())
      .then(data => console.log(data))
      .then(() => eventFetch());
    store.setNewEventModalOpen(false);
  };

  return (
    <Portal>
      <Modal
        visible={store.newEventModalOpen}
        dismissable={false}
        style={{
          backgroundColor: '#FFF',
          marginHorizontal: 50,
          marginTop: 100,
          maxHeight: 500,
        }}>
        <DatePickerModal
          locale="en"
          mode="range"
          visible={datePickerOpen}
          onDismiss={onDismiss}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onConfirm={onConfirm}
        />
        <View>
          <ScrollView
            contentContainerStyle={{padding: 15, justifyContent: 'center'}}>
            <Headline
              style={{
                alignSelf: 'center',
                fontSize: 30,
                textAlign: 'center',
              }}>
              Add New Event
            </Headline>
            <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                {
                  type: 'text',
                  name: 'name',
                  rules: {
                    required: {
                      value: true,
                      message: 'Event name is required.',
                    },
                  },
                  textInputProps: {
                    label: 'Name',
                    left: <TextInput.Icon name={'script-text-outline'} />,
                    right: (
                      <TextInput
                        value={name}
                        dense={true}
                        theme={{colors: {primary: colors.accent}}}
                        style={{maxHeight: 50, width: '85%'}}
                        onChangeText={text => setName(text)}
                      />
                    ),
                  },
                },
                {
                  type: 'text',
                  name: 'location',
                  rules: {
                    required: {
                      value: true,
                      message: 'Event location is required.',
                    },
                  },
                  textInputProps: {
                    label: 'Location',
                    left: <TextInput.Icon name={'map-marker'} />,
                    right: (
                      <TextInput
                        value={location}
                        dense={true}
                        theme={{colors: {primary: colors.accent}}}
                        style={{maxHeight: 50, width: '85%'}}
                        onChangeText={text => setLocation(text)}
                      />
                    ),
                  },
                },
                {
                  name: 'Date Field',
                  type: 'custom',
                  JSX: DateField,
                },
              ]}
            />
            <Button mode="contained" onPress={() => setDatePickerOpen(true)}>
              Select Dates
            </Button>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Button mode="contained" onPress={handleModalClose}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit((data: any) => {
                  console.log('form data', data);
                  submitData(data);
                })}>
                Add
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(AddEventModal);

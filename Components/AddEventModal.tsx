import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
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

interface IProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

interface IDates {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const AddEventModal = ({edit, setEdit}: IProps) => {
  const {colors} = useTheme();
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [dateRange, setDateRange] = useState<IDates>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const {control, setFocus, handleSubmit, setValue} = useForm({
    defaultValues: {
      id: -1,
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
    setValue('id', -1);
    setValue('name', '');
    setValue('location', '');
    setDateRange({startDate: new Date(), endDate: new Date()});
    setEdit(false);
  };

  const onDismiss = useCallback(() => {
    setDatePickerOpen(false);
  }, [setDatePickerOpen]);

  const onConfirm = useCallback(
    ({startDate, endDate}: IDates) => {
      const endDateOffset = new Date(endDate as Date);
      endDateOffset.setDate(endDateOffset.getDate() - 1);
      setDatePickerOpen(false);
      setDateRange({startDate, endDate});
      setValue('startDate', startDate);
      setValue('endDate', endDateOffset);
    },
    [setDatePickerOpen, setDateRange, setValue],
  );

  const submitData = async (event: any) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    };
    await fetch('http://10.0.2.2:3000/new_event', options)
      .then(r => r.json())
      .then(data => console.log('/new_event', data))
      .then(() => eventFetch());
    setEdit(false);
    store.setNewEventModalOpen(false);
    setValue('id', -1);
    setValue('name', '');
    setValue('location', '');
    setDateRange({startDate: new Date(), endDate: new Date()});
  };

  useEffect(() => {
    runInAction(() => {
      if (edit && store.selectedEvent) {
        setValue('id', store.selectedEvent.event_id);
        setValue('name', store.selectedEvent.name);
        setValue('location', store.selectedEvent.location);
        setValue('startDate', new Date(store.selectedEvent.start_date));
        setValue('endDate', new Date(store.selectedEvent.end_date));
        setDateRange({
          startDate: new Date(store.selectedEvent.start_date),
          endDate: new Date(store.selectedEvent.end_date),
        });
      }
    });
  }, [edit, setValue]);

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
              {edit ? 'Edit Event' : 'Add New Event'}
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
                  submitData(data);
                })}>
                {edit ? 'Edit' : 'Add'}
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default observer(AddEventModal);

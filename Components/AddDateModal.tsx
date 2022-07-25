import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {storeAnnotation} from 'mobx/dist/internal';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {
  Headline,
  Modal,
  Portal,
  Button,
  //useTheme,
  Text,
  Checkbox,
} from 'react-native-paper';
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

const AddDateModal = ({edit, setEdit}: IProps) => {
  //const {colors} = useTheme();
  const [date, setDate] = useState<Date | null>(null);
  const [dateOptions, setDateOptions] = useState<Date[] | null>(null);
  const {control, setFocus, handleSubmit, setValue} = useForm({
    defaultValues: {
      id: -1,
      name: '',
      location: '',
    },
    mode: 'onChange',
  });

  const MealTypePicker = () => {
    return (
      <View>
        <Text>Which meals would you like to plan for?</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View>
            <Checkbox.Item label="Breakfast" status="checked" />
            <Checkbox.Item label="Lunch" status="checked" />
          </View>
          <View>
            <Checkbox.Item label="Dinner" status="checked" />
            <Checkbox.Item label="Snack" status="checked" />
          </View>
        </View>
      </View>
    );
  };

  const handleModalClose = () => {
    store.setNewDateModalOpen(false);
    setValue('id', -1);
    setValue('name', '');
    setValue('location', '');
    setEdit(false);
  };

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
      .then(data => console.log(data))
      .then(() => eventFetch());
    setEdit(false);
    store.setNewEventModalOpen(false);
    setValue('id', -1);
    setValue('name', '');
    setValue('location', '');
  };

  useEffect(() => {
    runInAction(() => {
      if (edit && store.selectedEvent) {
        setValue('id', store.selectedEvent.event_id);
        setValue('name', store.selectedEvent.name);
        setValue('location', store.selectedEvent.location);
      }
    });
  }, [edit, setValue]);

  return (
    <Portal>
      <Modal
        visible={store.newDateModalOpen}
        dismissable={false}
        style={{
          backgroundColor: '#FFF',
          marginHorizontal: 50,
          marginTop: 100,
          maxHeight: 500,
        }}>
        <View>
          <ScrollView
            contentContainerStyle={{padding: 15, justifyContent: 'center'}}>
            <Headline
              style={{
                alignSelf: 'center',
                fontSize: 30,
                textAlign: 'center',
              }}>
              {edit ? 'Edit Date' : 'Add New Date'}
            </Headline>
            <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                {
                  type: 'select',
                  name: 'dates',
                  rules: {
                    required: {
                      value: true,
                      message: 'Meal date is required.',
                    },
                  },
                  textInputProps: {
                    label: 'Date',
                  },
                  options: [
                    {
                      label: 'test_1',
                      value: 1,
                    },
                    {
                      label: 'test_2',
                      value: 2,
                    },
                  ],
                },
                {
                  name: 'Meal Type Picker',
                  type: 'custom',
                  JSX: MealTypePicker,
                },
              ]}
            />
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

export default observer(AddDateModal);

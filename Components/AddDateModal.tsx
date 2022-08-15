import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
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
import {OPTIONS} from 'react-native-paper-form-builder/dist/Types/Types';
import {eventFetch} from '../Fetches/EventFetch';
import {mealFetch} from '../Fetches/MealFetch';
import store, {MealTypes} from '../Store/Store';

interface IProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

const AddDateModal = ({edit, setEdit}: IProps) => {
  //const {colors} = useTheme();
  const [date, setDate] = useState<Date | null>(null);
  const [dateOptions, setDateOptions] = useState<OPTIONS | undefined>(
    undefined,
  );
  const [mealTypes, setMealTypes] = useState<MealTypes[]>([]);
  const [mealTypeErrorMsg, setMealTypeErrorMsg] = useState<string>('');
  const {control, setFocus, handleSubmit, setValue, resetField} = useForm({
    defaultValues: {
      event_id: -1,
      dates: [],
    },
    mode: 'onChange',
  });

  const MealTypePicker = () => {
    const handleCheckType = (type: MealTypes) => {
      let newTypes = [...mealTypes];
      if (newTypes.includes(type)) {
        newTypes = newTypes.filter((el: any) => el !== type);
      } else {
        newTypes.push(type);
      }
      setMealTypes(newTypes);
    };

    return (
      <View>
        <Text>Which meals would you like to plan for?</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View>
            <Checkbox.Item
              label="Breakfast"
              status={mealTypes.includes('Breakfast') ? 'checked' : 'unchecked'}
              onPress={() => handleCheckType('Breakfast')}
            />
            <Checkbox.Item
              label="Lunch"
              status={mealTypes.includes('Lunch') ? 'checked' : 'unchecked'}
              onPress={() => handleCheckType('Lunch')}
            />
          </View>
          <View>
            <Checkbox.Item
              label="Dinner"
              status={mealTypes.includes('Dinner') ? 'checked' : 'unchecked'}
              onPress={() => handleCheckType('Dinner')}
            />
            <Checkbox.Item
              label="Snack"
              status={mealTypes.includes('Snack') ? 'checked' : 'unchecked'}
              onPress={() => handleCheckType('Snack')}
            />
          </View>
        </View>
        <Text style={{color: 'red'}}>{mealTypeErrorMsg}</Text>
      </View>
    );
  };

  const handleModalClose = () => {
    store.setNewDateModalOpen(false);
    setDate(null);
    setMealTypes([]);
    setEdit(false);
    resetField('dates');
    setMealTypeErrorMsg('');
  };

  const submitData = async (event: any) => {
    console.log('submit event', event);
    if (event['Meal Type Picker'] === undefined) {
      setMealTypeErrorMsg('You must pick at least one meal to plan.');
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    };
    try {
      await fetch(
        `http://10.0.2.2:3000/new_meal_date/${date}/${Array.from(
          new Set(mealTypes),
        )}/${store.selectedEvent?.event_id}`,
        options,
      )
        .then(r => r.json())
        .then(data => {
          console.log('/new_meal_date', data);
          if (data.status === 400) {
            console.log(data.message);
            setMealTypeErrorMsg(data.message);
          } else {
            setMealTypeErrorMsg('');
            handleModalClose();
          }
        })
        .then(() => eventFetch())
        .then(() => mealFetch());
      setEdit(false);
    } catch (err) {
      console.log('Error', err);
    }
  };

  useEffect(() => {
    runInAction(() => {
      // if (edit && store.selectedEvent) {
      // }
      setValue('event_id', store.selectedEvent?.event_id as number);
      const numDays: number =
        new Date(
          Date.parse(store.selectedEvent?.end_date as string),
        ).getDate() -
        new Date(
          Date.parse(store.selectedEvent?.start_date as string),
        ).getDate() +
        1;

      let dateArr: {label: string; value: string}[] = [];
      let currentDate: Date = new Date(
        Date.parse(store.selectedEvent?.start_date as string),
      );

      for (let x = 1; x <= numDays; x++) {
        dateArr.push({
          label: currentDate.toDateString(),
          value: currentDate.toDateString(),
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setDateOptions(dateArr);
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
                    onChange: e =>
                      setDate(new Date(Date.parse(e.target.value))),
                  },
                  textInputProps: {
                    label: 'Date',
                    value: date?.toDateString(),
                  },
                  options: dateOptions,
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

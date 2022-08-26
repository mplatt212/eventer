import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {
  Headline,
  Modal,
  Portal,
  TextInput,
  Button,
  useTheme,
} from 'react-native-paper';
import {FormBuilder} from 'react-native-paper-form-builder';
import {ingredientsFetch} from '../Fetches/IngredientsFetch';
import store from '../Store/Store';

interface IProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  menuItemID: number;
  meals: any;
}

interface IDates {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

const AddIngredientModal = ({edit, setEdit, menuItemID, meals}: IProps) => {
  const {colors} = useTheme();
  const [ingName, setIngName] = useState<string>('');
  const {control, setFocus, handleSubmit, setValue} = useForm({
    defaultValues: {
      id: -1,
      name: '',
    },
    mode: 'onChange',
  });

  const handleModalClose = () => {
    store.setNewIngredientModalOpen(false);
    setValue('id', -1);
    setValue('name', '');
    setEdit(false);
  };

  const submitData = async (ingData: any) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingData),
    };
    console.log(ingData.name);
    await fetch(
      `http://192.168.1.15:3000/add_ingredient/${menuItemID}/${ingData.name}`,
      options,
    )
      .then(r => r.json())
      .then(data => console.log(data))
      .then(() =>
        ingredientsFetch(
          store.selectedEvent?.event_id as number,
          meals.date.slice(0, 19).replace('T', ' ').split(' ')[0],
        ),
      );
    setEdit(false);
    handleModalClose();
  };

  useEffect(() => {
    runInAction(() => {
      if (edit && store.selectedEvent) {
        setValue('id', store.selectedEvent.event_id);
        setValue('name', store.selectedEvent.name);
      }
    });
  }, [edit, setValue]);

  return (
    <Portal>
      <Modal
        visible={store.newIngredientModalOpen}
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
              {edit ? 'Edit Ingredient' : 'Add New Ingredient'}
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
                      message: 'Ingredient name is required.',
                    },
                  },
                  textInputProps: {
                    label: 'Ingredient',
                    left: <TextInput.Icon name={'script-text-outline'} />,
                    right: (
                      <TextInput
                        value={ingName}
                        dense={true}
                        theme={{colors: {primary: colors.accent}}}
                        style={{maxHeight: 50, width: '85%'}}
                        onChangeText={text => setIngName(text)}
                      />
                    ),
                  },
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

export default observer(AddIngredientModal);

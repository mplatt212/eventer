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
} from 'react-native-paper';
import {FormBuilder} from 'react-native-paper-form-builder';
import store from '../../Store/Store';

interface IProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  mealID: number;
  handleRefresh: () => void;
}

const AddMenuItemModal = ({edit, setEdit, mealID, handleRefresh}: IProps) => {
  //const {colors} = useTheme();
  const [menuItem, setMenuItem] = useState<string>('');
  const {control, setFocus, handleSubmit, setValue} = useForm({
    defaultValues: {
      meal_id: -1,
      menu_item: menuItem,
    },
    mode: 'onChange',
  });

  const handleModalClose = () => {
    store.setNewMenuItemModalOpen(false);
    setMenuItem('');
    setValue('menu_item', '');
    setEdit(false);
    handleRefresh();
  };

  const submitData = async (item: any) => {
    console.log('submit event', item);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    };
    try {
      await fetch(
        `process.env.REACT_APP_BASE_URL/new_menu_item/${mealID}/${menuItem}`,
        options,
      )
        .then(r => r.json())
        .then(data => {
          console.log('/new_meal_date', data);
          handleModalClose();
        });
      setEdit(false);
    } catch (err) {
      console.log('Error', err);
    }
  };

  useEffect(() => {
    setValue('meal_id', mealID);
  }, [mealID, setValue]);

  return (
    <Portal>
      <Modal
        visible={store.newMenuItemModalOpen}
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
              {edit ? 'Edit Meal' : 'Add New Menu Item'}
            </Headline>
            <FormBuilder
              control={control}
              setFocus={setFocus}
              formConfigArray={[
                {
                  type: 'text',
                  name: 'menu_item',
                  rules: {
                    required: {
                      value: true,
                      message: 'New menu item is required.',
                    },
                    onChange: e => setMenuItem(e.target.value),
                  },
                  textInputProps: {
                    label: 'Menu Item',
                    value: menuItem,
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

export default observer(AddMenuItemModal);

import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Headline, Surface, Text} from 'react-native-paper';
import AddDateModal from '../Components/AddDateModal';
import store from '../Store/Store';
import {IProps} from './Home';

const MealsList = ({navigation}: IProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  const handleAddDate = () => {
    store.setNewDateModalOpen(true);
  };

  return (
    <View style={{paddingHorizontal: 25}}>
      <AddDateModal edit={edit} setEdit={setEdit} />
      <Headline style={{marginTop: 25, textAlign: 'center'}}>
        Meal Plan
      </Headline>
      <Surface
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
        onTouchStart={() => navigation.navigate('Meal Details')}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{maxWidth: '50%'}}>
            <Headline style={{fontSize: 20}}>Day 1</Headline>
            <Text style={{fontStyle: 'italic', marginTop: 10}}>Breakfast</Text>
            <Text>Eggs, bacon and toast.</Text>
            <Text style={{fontStyle: 'italic', marginTop: 10}}>Lunch</Text>
            <Text>Sandwiches, chips and fruit.</Text>
          </View>
          <View style={{maxWidth: '50%'}}>
            <Headline style={{fontSize: 20}}>October 1st</Headline>
            <Text style={{fontStyle: 'italic', marginTop: 10}}>Dinner</Text>
            <Text>Cheeseburgers, fries and roasted veggies.</Text>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Headline style={{fontSize: 20}}>Ingredients</Headline>
          <Text style={{fontStyle: 'italic'}}>
            Breakfast: 5, Lunch: 7, Dinner: 10
          </Text>
        </View>
      </Surface>
      <Button mode="contained" style={{marginTop: 15}} onPress={handleAddDate}>
        Add Date
      </Button>
    </View>
  );
};

export default observer(MealsList);

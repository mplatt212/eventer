import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  Button,
  Headline,
  List,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import AddMenuItemModal from '../Components/AddMenuItemModal';
import store from '../Store/Store';
import {IProps} from './Home';

const MealDetails = ({route}: IProps) => {
  const {colors} = useTheme();
  const {meals} = route.params;
  const [edit, setEdit] = useState<boolean>(false);
  const [mealID, setMealID] = useState<number>(-1);

  const handleNewMenuItem = (id: number) => {
    store.setNewMenuItemModalOpen(true);
    setMealID(id);
  };

  return (
    <ScrollView style={{paddingHorizontal: 25}}>
      <AddMenuItemModal edit={edit} setEdit={setEdit} mealID={mealID} />
      <Headline style={{marginVertical: 25, alignSelf: 'center'}}>
        Meal Details
      </Headline>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>
          Day{' '}
          {new Date(meals.date).getDate() -
            new Date(store.selectedEvent?.start_date as string).getDate() +
            1}
        </Text>
        <Text style={{fontSize: 18}}>
          {new Date(meals.date).toLocaleString('default', {
            month: 'long',
          }) +
            ' ' +
            new Date(meals.date).getDate()}
        </Text>
      </View>
      <Surface
        style={{
          marginVertical: 10,
          borderRadius: 5,
          borderColor: '#000',
          borderWidth: 1,
          elevation: 7,
        }}>
        {meals.meals.map((el: any) => el.meal).includes('Breakfast') && (
          <List.Section>
            <List.AccordionGroup>
              <List.Subheader>Breakfast</List.Subheader>
              {meals.meals.map((el: any) => {
                if (el.meal === 'Breakfast' && el.food_items.length > 0) {
                  return el.food_items.map((food: any, index: number) => {
                    return (
                      <List.Accordion
                        key={index}
                        title={
                          <Text style={{color: colors.accent}}>{food}</Text>
                        }
                        id="1"
                        style={{borderColor: '#000', borderRightWidth: 1}}>
                        <List.Item title="Eggs" />
                        <Button
                          mode="contained"
                          style={{
                            width: '75%',
                            alignSelf: 'center',
                            backgroundColor: colors.accent,
                          }}
                          onPress={() => console.log('Ingredient added!')}>
                          Add Ingredient
                        </Button>
                      </List.Accordion>
                    );
                  });
                }
              })}
            </List.AccordionGroup>
          </List.Section>
        )}
        <Button
          mode="contained"
          style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}
          onPress={() =>
            handleNewMenuItem(
              meals.meals.filter((el: any) => el.meal === 'Breakfast')[0]
                .meal_id,
            )
          }>
          Add Menu Item
        </Button>
      </Surface>
      <Surface
        style={{
          marginVertical: 10,
          borderRadius: 5,
          borderColor: '#000',
          borderWidth: 1,
          elevation: 7,
        }}>
        <List.Section>
          <List.AccordionGroup>
            <List.Subheader>Lunch</List.Subheader>
            {meals.meals.map((el: any) => {
              if (el.meal === 'Lunch' && el.food_items.length > 0) {
                return el.food_items.map((food: any, index: number) => {
                  return (
                    <List.Accordion
                      key={index}
                      title={<Text style={{color: colors.accent}}>{food}</Text>}
                      id="1"
                      style={{borderColor: '#000', borderRightWidth: 1}}>
                      <List.Item title="Eggs" />
                      <Button
                        mode="contained"
                        style={{
                          width: '75%',
                          alignSelf: 'center',
                          backgroundColor: colors.accent,
                        }}
                        onPress={() => console.log('Ingredient added!')}>
                        Add Ingredient
                      </Button>
                    </List.Accordion>
                  );
                });
              }
            })}
          </List.AccordionGroup>
        </List.Section>
        <Button
          mode="contained"
          style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}>
          Add Menu Item
        </Button>
      </Surface>
      <Surface
        style={{
          marginVertical: 10,
          borderRadius: 5,
          borderColor: '#000',
          borderWidth: 1,
          elevation: 7,
        }}>
        <List.Section>
          <List.AccordionGroup>
            <List.Subheader>Dinner</List.Subheader>
            {meals.meals.map((el: any) => {
              if (el.meal === 'Dinner' && el.food_items.length > 0) {
                return el.food_items.map((food: any, index: number) => {
                  return (
                    <List.Accordion
                      key={index}
                      title={<Text style={{color: colors.accent}}>{food}</Text>}
                      id="1"
                      style={{borderColor: '#000', borderRightWidth: 1}}>
                      <List.Item title="Eggs" />
                      <Button
                        mode="contained"
                        style={{
                          width: '75%',
                          alignSelf: 'center',
                          backgroundColor: colors.accent,
                        }}
                        onPress={() => console.log('Ingredient added!')}>
                        Add Ingredient
                      </Button>
                    </List.Accordion>
                  );
                });
              }
            })}
          </List.AccordionGroup>
        </List.Section>
        <Button
          mode="contained"
          style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}>
          Add Menu Item
        </Button>
      </Surface>
      <Surface
        style={{
          marginVertical: 10,
          borderRadius: 5,
          borderColor: '#000',
          borderWidth: 1,
          elevation: 7,
        }}>
        {meals.meals.map((el: any) => el.meal).includes('Snack') && (
          <List.Section>
            <List.AccordionGroup>
              <List.Subheader>Snacks</List.Subheader>
              {meals.meals.map((el: any) => {
                if (el.meal === 'Breakfast' && el.food_items.length > 0) {
                  return el.food_items.map((food: any, index: number) => {
                    return (
                      <List.Accordion
                        key={index}
                        title={
                          <Text style={{color: colors.accent}}>{food}</Text>
                        }
                        id="1"
                        style={{borderColor: '#000', borderRightWidth: 1}}>
                        <List.Item title="Eggs" />
                        <Button
                          mode="contained"
                          style={{
                            width: '75%',
                            alignSelf: 'center',
                            backgroundColor: colors.accent,
                          }}
                          onPress={() => console.log('Ingredient added!')}>
                          Add Ingredient
                        </Button>
                      </List.Accordion>
                    );
                  });
                }
              })}
            </List.AccordionGroup>
          </List.Section>
        )}
        <Button
          mode="contained"
          style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}>
          Add Menu Item
        </Button>
      </Surface>
    </ScrollView>
  );
};

export default MealDetails;

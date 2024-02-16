import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, Headline, Surface, Text} from 'react-native-paper';
import AddDateModal from '../Components/AddDateModal';
import {mealFetch} from '../Fetches/MealFetch';
import {getDayDiff} from '../Functions';
import store from '../Store/Store';
import {IProps} from './Home';

const MealsList = ({navigation}: IProps) => {
  const [edit, setEdit] = useState<boolean>(false);

  const handleAddDate = () => {
    store.setNewDateModalOpen(true);
  };

  useEffect(() => {
    runInAction(() => {
      mealFetch();
    });
  }, []);

  return (
    <View style={{paddingHorizontal: 25}}>
      <AddDateModal edit={edit} setEdit={setEdit} />
      <Headline style={{marginTop: 25, textAlign: 'center'}}>
        Meal Plan
      </Headline>
      <FlatList
        data={store.meals}
        style={{maxHeight: '80%'}}
        renderItem={({item}) => (
          <TouchableWithoutFeedback>
            <Surface
              style={{
                backgroundColor:
                  getDayDiff(
                    new Date(item.date),
                    new Date(store.selectedEvent?.start_date as string),
                  ) >
                  getDayDiff(
                    new Date(store.selectedEvent?.end_date as string),
                    new Date(store.selectedEvent?.start_date as string),
                  )
                    ? 'red'
                    : '#F2F2FF',
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
              onTouchEnd={() =>
                navigation.navigate('Meal Details', {meals: item})
              }>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{maxWidth: '50%'}}>
                  <Headline style={{fontSize: 20}}>
                    Day{' '}
                    {getDayDiff(
                      new Date(item.date),
                      new Date(store.selectedEvent?.start_date as string),
                    ) + 1}
                  </Headline>
                  {item.meals.map(el => el.meal).includes('Breakfast') && (
                    <View>
                      <Text style={{fontStyle: 'italic', marginTop: 10}}>
                        Breakfast
                      </Text>
                      <Text>
                        {item.meals.map((el: any) => {
                          if (
                            el.meal === 'Breakfast' &&
                            el.food_items.length > 0
                          ) {
                            return el.food_items.map(
                              (food: any, index: number) => {
                                if (index !== el.food_items.length - 1) {
                                  return (
                                    <Text key={index}>{food.menu_item} | </Text>
                                  );
                                } else {
                                  return (
                                    <Text key={index}>{food.menu_item}</Text>
                                  );
                                }
                              },
                            );
                          } else {
                            return '';
                          }
                        })}
                      </Text>
                    </View>
                  )}
                  {item.meals.map(el => el.meal).includes('Lunch') && (
                    <View>
                      <Text style={{fontStyle: 'italic', marginTop: 10}}>
                        Lunch
                      </Text>
                      <Text>
                        {item.meals.map((el: any) => {
                          if (el.meal === 'Lunch' && el.food_items.length > 0) {
                            return el.food_items.map(
                              (food: any, index: number) => {
                                if (index !== el.food_items.length - 1) {
                                  return (
                                    <Text key={index}>{food.menu_item} | </Text>
                                  );
                                } else {
                                  return (
                                    <Text key={index}>{food.menu_item}</Text>
                                  );
                                }
                              },
                            );
                          } else {
                            return '';
                          }
                        })}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{maxWidth: '50%'}}>
                  <Headline style={{fontSize: 20}}>
                    {new Date(item.date).toLocaleString('default', {
                      month: 'long',
                    }) +
                      ' ' +
                      new Date(item.date).getDate()}
                  </Headline>
                  {item.meals.map(el => el.meal).includes('Dinner') && (
                    <View>
                      <Text style={{fontStyle: 'italic', marginTop: 10}}>
                        Dinner
                      </Text>
                      <Text>
                        {item.meals.map((el: any) => {
                          if (
                            el.meal === 'Dinner' &&
                            el.food_items.length > 0
                          ) {
                            return el.food_items.map(
                              (food: any, index: number) => {
                                if (index !== el.food_items.length - 1) {
                                  return (
                                    <Text key={index}>{food.menu_item} | </Text>
                                  );
                                } else {
                                  return (
                                    <Text key={index}>{food.menu_item}</Text>
                                  );
                                }
                              },
                            );
                          } else {
                            return '';
                          }
                        })}
                      </Text>
                    </View>
                  )}
                  {item.meals.map(el => el.meal).includes('Snack') && (
                    <View>
                      <Text style={{fontStyle: 'italic', marginTop: 10}}>
                        Snack
                      </Text>
                      <Text>
                        {item.meals.map((el: any) => {
                          if (el.meal === 'Snack' && el.food_items.length > 0) {
                            return el.food_items.map(
                              (food: any, index: number) => {
                                if (index !== el.food_items.length - 1) {
                                  return (
                                    <Text key={index}>{food.menu_item} | </Text>
                                  );
                                } else {
                                  return (
                                    <Text key={index}>{food.menu_item}</Text>
                                  );
                                }
                              },
                            );
                          } else {
                            return '';
                          }
                        })}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <Headline style={{fontSize: 20}}>Ingredients</Headline>
                <Text style={{fontStyle: 'italic'}}>
                  Breakfast: 5, Lunch: 7, Dinner: 10
                </Text>
              </View>
            </Surface>
          </TouchableWithoutFeedback>
        )}
      />

      <Button mode="contained" style={{marginTop: 15}} onPress={handleAddDate}>
        Add Date
      </Button>
    </View>
  );
};

export default observer(MealsList);

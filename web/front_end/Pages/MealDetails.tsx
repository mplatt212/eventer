import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {
  Avatar,
  Button,
  Headline,
  IconButton,
  List,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import AddIngredientModal from '../Components/Meal Details/AddIngredientModal';
import AddMenuItemModal from '../Components/Meal Details/AddMenuItemModal';
import {ingredientDelete} from '../Fetches/IngredientDelete';
import {ingredientsFetch} from '../Fetches/IngredientsFetch';
import {mealFetch} from '../Fetches/MealFetch';
import {menuItemDelete} from '../Fetches/MenuItemDelete';
import {userTakeFoodItem} from '../Fetches/UserTake';
import {getDayDiff} from '../Functions';
import store from '../Store/Store';
import {IProps} from './Home';

const MealDetails = ({route}: IProps) => {
  const {colors} = useTheme();
  //const {meals} = route.params;
  const [meals, setMeals] = useState<any>(route.params.meals);
  const [edit, setEdit] = useState<boolean>(false);
  const [mealID, setMealID] = useState<number>(-1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [menuItemID, setMenuItemID] = useState<number>(-1);

  const handleNewMenuItem = (id: number) => {
    store.setNewMenuItemModalOpen(true);
    setMealID(id);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    mealFetch()
      .then(() => {
        const newMeals: any = store.meals.filter(
          (el: any) => el.date === meals.date,
        )[0];
        console.log(newMeals);
        setMeals(newMeals);
      })
      .then(() => setRefreshing(false));
  };

  const handleDeleteMenuItem = async (id: number) => {
    menuItemDelete(id).then(() => handleRefresh());
  };

  const handleAddIngredient = (foodItemID: number) => {
    store.setNewIngredientModalOpen(true);
    setMenuItemID(foodItemID);
  };

  const handleTakeItem = (id: number) => {
    userTakeFoodItem(id).then(() =>
      ingredientsFetch(
        store.selectedEvent?.event_id as number,
        meals.date.slice(0, 19).replace('T', ' ').split(' ')[0],
      ),
    );
  };

  const handleDeleteIng = (id: number) => {
    ingredientDelete(id).then(() => {
      ingredientsFetch(
        store.selectedEvent?.event_id as number,
        meals.date.slice(0, 19).replace('T', ' ').split(' ')[0],
      );
    });
  };

  useEffect(() => {
    ingredientsFetch(
      store.selectedEvent?.event_id as number,
      meals.date.slice(0, 19).replace('T', ' ').split(' ')[0],
    );
  }, [meals.date]);

  return (
    <>
      <AddIngredientModal
        edit={edit}
        setEdit={setEdit}
        menuItemID={menuItemID}
        meals={meals}
      />
      <ScrollView
        style={{paddingHorizontal: 25}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <AddMenuItemModal
          edit={edit}
          setEdit={setEdit}
          mealID={mealID}
          handleRefresh={handleRefresh}
        />
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
            {getDayDiff(
              new Date(meals.date),
              new Date(store.selectedEvent?.start_date as string),
            ) + 1}
          </Text>
          <Text style={{fontSize: 18}}>
            {new Date(meals.date).toLocaleString('default', {
              month: 'long',
            }) +
              ' ' +
              new Date(meals.date).getDate()}
          </Text>
        </View>
        {meals.meals
          .map((el: any) => el.meal)
          .map((meal: any, index: number) => (
            <Surface
              key={index}
              style={{
                marginVertical: 10,
                borderRadius: 5,
                borderColor: '#000',
                borderWidth: 1,
                elevation: 7,
              }}>
              {meals.meals.map((el: any) => el.meal).includes(meal) && (
                <List.Section>
                  <List.Subheader>{meal}</List.Subheader>
                  {meals.meals.map((el: any) => {
                    if (el.meal === meal && el.food_items.length > 0) {
                      return el.food_items.map((food: any, index_2: number) => {
                        return (
                          <List.Accordion
                            key={index_2}
                            left={() =>
                              food.user_id ? (
                                <IconButton
                                  style={{alignSelf: 'center'}}
                                  icon={() => (
                                    <Avatar.Text
                                      size={35}
                                      label={`${
                                        food.first_name.split(0, 1)[0]
                                      }${food.last_name.split(0, 1)[0]}`}
                                    />
                                  )}
                                />
                              ) : (
                                <IconButton icon="account" color="lightblue" />
                              )
                            }
                            title={
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                }}>
                                <Text style={{color: colors.accent}}>
                                  {food.menu_item}
                                </Text>
                              </View>
                            }
                            id="1">
                            {store.ingredients.length > 0 &&
                              store.ingredients.map(
                                (ing: any, ingIndex: number) => {
                                  if (ing.menu_item_id === food.id) {
                                    return (
                                      <List.Item
                                        key={ingIndex}
                                        title={ing.ing}
                                        right={() => (
                                          <View
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                            }}>
                                            {ing.user_id ? (
                                              <IconButton
                                                icon={() => (
                                                  <Avatar.Text
                                                    size={35}
                                                    label={`${
                                                      ing.first_name.split(
                                                        0,
                                                        1,
                                                      )[0]
                                                    }${
                                                      ing.last_name.split(
                                                        0,
                                                        1,
                                                      )[0]
                                                    }`}
                                                    style={{
                                                      alignSelf: 'center',
                                                    }}
                                                  />
                                                )}
                                              />
                                            ) : (
                                              <IconButton
                                                icon="account"
                                                color="lightblue"
                                              />
                                            )}
                                            <IconButton
                                              icon="delete"
                                              onPress={() =>
                                                handleDeleteIng(ing.ingred_id)
                                              }
                                            />
                                          </View>
                                        )}
                                      />
                                    );
                                  }
                                },
                              )}
                            <List.Item
                              left={() => (
                                <View style={{width: 0, padding: 0}} />
                              )}
                              title={() => (
                                <View
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginHorizontal: 10,
                                    alignContent: 'center',
                                  }}>
                                  <Button
                                    mode="contained"
                                    style={{
                                      backgroundColor: colors.accent,
                                    }}
                                    icon="plus"
                                    onPress={() =>
                                      handleAddIngredient(food.id)
                                    }>
                                    Add Ingredient
                                  </Button>
                                  <Button
                                    mode="contained"
                                    style={{
                                      backgroundColor: 'lightblue',
                                      marginTop: 5,
                                    }}
                                    icon="account"
                                    onPress={() => handleTakeItem(food.id)}>
                                    {food.user_id
                                      ? `Drop ${food.menu_item}`
                                      : `Take ${food.menu_item}`}
                                  </Button>
                                  <Button
                                    mode="contained"
                                    style={{
                                      backgroundColor: colors.error,
                                      marginTop: 5,
                                    }}
                                    icon="delete"
                                    onPress={() =>
                                      handleDeleteMenuItem(food.id)
                                    }>
                                    {`Delete ${food.menu_item}`}
                                  </Button>
                                </View>
                              )}
                            />
                          </List.Accordion>
                        );
                      });
                    }
                  })}
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
          ))}
      </ScrollView>
    </>
  );
};

export default observer(MealDetails);

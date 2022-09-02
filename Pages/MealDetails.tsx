import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {
  Button,
  Headline,
  IconButton,
  List,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import AddIngredientModal from '../Components/AddIngredientModal';
import AddMenuItemModal from '../Components/AddMenuItemModal';
import {ingredientDelete} from '../Fetches/IngredientDelete';
import {ingredientsFetch} from '../Fetches/IngredientsFetch';
import {mealFetch} from '../Fetches/MealFetch';
import {menuItemDelete} from '../Fetches/MenuItemDelete';
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

  const handleDeleteIng = (id: number) => {
    console.log(id);
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
              <List.Subheader>Breakfast</List.Subheader>
              {meals.meals.map((el: any) => {
                if (el.meal === 'Breakfast' && el.food_items.length > 0) {
                  return el.food_items.map((food: any, index: number) => {
                    return (
                      <List.Accordion
                        key={index}
                        title={
                          <Text style={{color: colors.accent}}>
                            {food.menu_item}
                          </Text>
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
                                      <IconButton
                                        icon="delete"
                                        onPress={() =>
                                          handleDeleteIng(ing.ingred_id)
                                        }
                                      />
                                    )}
                                  />
                                );
                              }
                            },
                          )}
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginHorizontal: 10,
                          }}>
                          <Button
                            mode="contained"
                            style={{
                              backgroundColor: colors.accent,
                            }}
                            icon="plus"
                            onPress={() => handleAddIngredient(food.id)}>
                            Add Ingredient
                          </Button>
                          <Button
                            mode="contained"
                            style={{
                              backgroundColor: colors.error,
                              marginTop: 5,
                            }}
                            icon="delete"
                            onPress={() => handleDeleteMenuItem(food.id)}>
                            {`Delete ${food.menu_item}`}
                          </Button>
                        </View>
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
        <Surface
          style={{
            marginVertical: 10,
            borderRadius: 5,
            borderColor: '#000',
            borderWidth: 1,
            elevation: 7,
          }}>
          <List.Section>
            <List.Subheader>Lunch</List.Subheader>
            {meals.meals.map((el: any) => {
              if (el.meal === 'Lunch' && el.food_items.length > 0) {
                return el.food_items.map((food: any, index: number) => {
                  return (
                    <List.Accordion
                      key={index}
                      title={
                        <Text style={{color: colors.accent}}>
                          {food.menu_item}
                        </Text>
                      }
                      id="1">
                      {store.ingredients.length > 0 &&
                        store.ingredients.map((ing: any, ingIndex: number) => {
                          if (ing.menu_item_id === food.id) {
                            return (
                              <List.Item
                                key={ingIndex}
                                title={ing.ing}
                                right={() => (
                                  <IconButton
                                    icon="delete"
                                    onPress={() =>
                                      handleDeleteIng(ing.ingred_id)
                                    }
                                  />
                                )}
                              />
                            );
                          }
                        })}
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginHorizontal: 10,
                        }}>
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: colors.accent,
                          }}
                          icon="plus"
                          onPress={() => handleAddIngredient(food.id)}>
                          Add Ingredient
                        </Button>
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: colors.error,
                            marginTop: 5,
                          }}
                          icon="delete"
                          onPress={() => handleDeleteMenuItem(food.id)}>
                          {`Delete ${food.menu_item}`}
                        </Button>
                      </View>
                    </List.Accordion>
                  );
                });
              }
            })}
          </List.Section>
          <Button
            mode="contained"
            style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}
            onPress={() =>
              handleNewMenuItem(
                meals.meals.filter((el: any) => el.meal === 'Lunch')[0].meal_id,
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
            <List.Subheader>Dinner</List.Subheader>
            {meals.meals.map((el: any) => {
              if (el.meal === 'Dinner' && el.food_items.length > 0) {
                return el.food_items.map((food: any, index: number) => {
                  return (
                    <List.Accordion
                      key={index}
                      title={
                        <Text style={{color: colors.accent}}>
                          {food.menu_item}
                        </Text>
                      }
                      id="1">
                      {store.ingredients.length > 0 &&
                        store.ingredients.map((ing: any, ingIndex: number) => {
                          if (ing.menu_item_id === food.id) {
                            return (
                              <List.Item
                                key={ingIndex}
                                title={ing.ing}
                                right={() => (
                                  <IconButton
                                    icon="delete"
                                    onPress={() =>
                                      handleDeleteIng(ing.ingred_id)
                                    }
                                  />
                                )}
                              />
                            );
                          }
                        })}
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginHorizontal: 10,
                        }}>
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: colors.accent,
                          }}
                          icon="plus"
                          onPress={() => handleAddIngredient(food.id)}>
                          Add Ingredient
                        </Button>
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: colors.error,
                            marginTop: 5,
                          }}
                          icon="delete"
                          onPress={() => handleDeleteMenuItem(food.id)}>
                          {`Delete ${food.menu_item}`}
                        </Button>
                      </View>
                    </List.Accordion>
                  );
                });
              }
            })}
          </List.Section>
          <Button
            mode="contained"
            style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}
            onPress={() =>
              handleNewMenuItem(
                meals.meals.filter((el: any) => el.meal === 'Dinner')[0]
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
          {meals.meals.map((el: any) => el.meal).includes('Snack') && (
            <List.Section>
              <List.Subheader>Snacks</List.Subheader>
              {meals.meals.map((el: any) => {
                if (el.meal === 'Snack' && el.food_items.length > 0) {
                  return el.food_items.map((food: any, index: number) => {
                    return (
                      <List.Accordion
                        key={index}
                        title={
                          <Text style={{color: colors.accent}}>
                            {food.menu_item}
                          </Text>
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
                                      <IconButton
                                        icon="delete"
                                        onPress={() =>
                                          handleDeleteIng(ing.ingred_id)
                                        }
                                      />
                                    )}
                                  />
                                );
                              }
                            },
                          )}
                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginHorizontal: 10,
                          }}>
                          <Button
                            mode="contained"
                            style={{
                              backgroundColor: colors.accent,
                            }}
                            icon="plus"
                            onPress={() => handleAddIngredient(food.id)}>
                            Add Ingredient
                          </Button>
                          <Button
                            mode="contained"
                            style={{
                              backgroundColor: colors.error,
                              marginTop: 5,
                            }}
                            icon="delete"
                            onPress={() => handleDeleteMenuItem(food.id)}>
                            {`Delete ${food.menu_item}`}
                          </Button>
                        </View>
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
                meals.meals.filter((el: any) => el.meal === 'Snack')[0].meal_id,
              )
            }>
            Add Menu Item
          </Button>
        </Surface>
      </ScrollView>
    </>
  );
};

export default observer(MealDetails);

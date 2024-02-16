import store from '../Store/Store';

export const userTakeFoodItem = async (food_item_id: number) => {
  const options = {
    method: 'POST',
  };

  try {
    await fetch(
      `process.env.REACT_APP_BASE_URL/user_take_food_item/${food_item_id}/${store.authStore.userID}`,
      options,
    ).then(data => console.log(data));
  } catch (err) {
    console.log(err);
  }
};

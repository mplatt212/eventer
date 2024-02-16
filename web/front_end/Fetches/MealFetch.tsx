import store from '../Store/Store';

export const mealFetch = async () => {
  const options = {
    method: 'GET',
  };

  try {
    await fetch(
      `process.env.REACT_APP_BASE_URL/meals/${store.selectedEvent?.event_id}`,
      options,
    )
      .then(r => r.json())
      .then(data => {
        console.log('/meals', data);
        store.setMeals(data);
      });
  } catch (err) {
    console.log(err);
  }
};

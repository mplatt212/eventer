import store from '../Store/Store';

export const mealFetch = async () => {
  const options = {
    method: 'GET',
  };

  try {
    await fetch(
      `http://192.168.1.15:3000/meals/${store.selectedEvent?.event_id}`,
      options,
    )
      .then(r => r.json())
      .then(data => {
        store.setMeals(data);
      });
  } catch (err) {
    console.log(err);
  }
};

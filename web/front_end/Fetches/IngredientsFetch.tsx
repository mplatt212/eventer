import store from '../Store/Store';

export const ingredientsFetch = async (event_id: number, date: Date) => {
  const options = {
    method: 'GET',
  };

  try {
    await fetch(
      `process.env.REACT_APP_BASE_URL/ingredients/${event_id}/${date}`,
      options,
    )
      .then(r => r.json())
      .then(data => {
        console.log('/ingredients', data);
        store.setIngredients(data);
      });
  } catch (err) {
    console.log(err);
  }
};

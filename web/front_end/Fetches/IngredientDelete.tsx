export const ingredientDelete = async (id: number) => {
  const options = {
    method: 'POST',
  };

  try {
    await fetch(`process.env.REACT_APP_BASE_URL/delete_ingredient/${id}`, options)
      .then(r => r.json())
      .then(data => {
        console.log('/delete_event', data);
      });
  } catch (err) {
    console.log(err);
  }
};

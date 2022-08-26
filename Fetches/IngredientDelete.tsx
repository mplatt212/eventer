export const ingredientDelete = async (id: number) => {
  const options = {
    method: 'POST',
  };

  try {
    await fetch(`http://192.168.1.15:3000/delete_ingredient/${id}`, options)
      .then(r => r.json())
      .then(data => {
        console.log('/delete_event', data);
      });
  } catch (err) {
    console.log(err);
  }
};

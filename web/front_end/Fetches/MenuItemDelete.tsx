export const menuItemDelete = async (id: number) => {
  const options = {
    method: 'POST',
  };

  try {
    await fetch(`process.env.REACT_APP_BASE_URL/delete_menu_item/${id}`, options)
      .then(r => r.json())
      .then(data => {
        console.log('/delete_menu_item', data);
      });
  } catch (err) {
    console.log(err);
  }
};

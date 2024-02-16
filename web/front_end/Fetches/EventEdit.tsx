export const eventEdit = async (id: number) => {
  const options = {
    method: 'GET',
  };

  try {
  const url = `${process.env.REACT_APP_BASE_URL}/fetch_event/${id}`;
    await fetch(url, options)
      .then(r => r.json())
      .then(data => {
        console.log('/fetch_event', data);
      });
  } catch (err) {
    console.log(err);
  }
};

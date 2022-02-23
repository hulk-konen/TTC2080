
async function getNames() {
  let url = 'nimet.json';
  try {
      let res = await fetch(url);
      return await res.json();
  } catch (error) {
      console.log(error);
  }
}

async function showList() {
  let data =  await getNames();
  results.innerHTML = "";
  data
    .filter((item) => {
      return item.toLowerCase().includes(search_term, 0)
    })
    .forEach((e) => {
      const li = document.createElement("li");
      li.innerHTML = `<i>Name:</i> ${e}`;
      results.appendChild(li);
    });
};

showList();


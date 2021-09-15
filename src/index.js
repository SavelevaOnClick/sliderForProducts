const cardSection = document.getElementById("card-section");

async function getDataProducts() {
  const data = await (
    await fetch(
      "https://laser-engraving-5eb5d-default-rtdb.firebaseio.com/products.json"
    )
  ).json();
  return data;
}

// function createBlock() {
//   getDataProducts().then((resp) => {
//     resp.forEach((item) => {
//       console.log(item);
//       new Card(item, cardSection);
//     });
//   });
// }
function createBlock() {
  getDataProducts().then((resp) => {
    Object.keys(resp).forEach((item) => {
      console.log(resp[item]);
      new Card(resp[item], cardSection);
    });
  });
}
createBlock();

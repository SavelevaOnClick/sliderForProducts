const cardSection = document.getElementById("card-section");
async function getDataProducts() {
  const data = await (await fetch("http://localhost:3000/products")).json();
  return data;
}

// async function elem() {
//   getDataProducts().then((array) => {
//     array.forEach(outputData(elem));
//   });
// }
//
// function outputData(item) {
//   Object.keys(item).forEach((key) => {
//     if (item[key].toString().indexOf("http") !== -1) {
//       document.body.appendChild(document.createElement("img")).src = item[key];
//     } else {
//       document.body.appendChild(document.createElement("p")).innerText =
//         item[key];
//     }
//   });
// }
// elem();

function createBlock() {
  getDataProducts().then((resp) => {
    resp.forEach((item) => {
      console.log(item);
      new Card(item, cardSection);
    });
  });
}

createBlock();

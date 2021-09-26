class Card {
  constructor(data, container) {
    this.title = data.title;
    this.src = data.image;
    this.price = data.price;
    this.text = data.about;
    this.card = container.appendChild(document.createElement("div"));
    this.card.classList.add("production-card");
    this.card.innerHTML = this.template();
    this.card.querySelector(".cardBtnContent").onclick = this.eventButton.bind(
      this
    );
  }
  template() {
    return `
    <h2>${this.title}</h2>
    <div class="card-img">
    <img src="${this.src}" alt="${this.title}" />
    </div>
    <div class="card-content">
    <p class="cardTextContent">
    ${this.text}
    </p>
    <button class="cardBtnContent">
    читать дальше
    </button>
    </div>
    <span class="card-price">
    ${this.price}
    </span>
  `;
  }
  eventButton(event) {
    this.card.querySelector("div > p").classList.toggle("cardTextContent");
  }
}

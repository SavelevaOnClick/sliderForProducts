class Card {
  constructor(data, container) {
    this.title = data.title;
    this.src = data.image;
    this.price = data.price;
    this.card = container.appendChild(document.createElement("div"));
    this.card.classList.add("production-card");
    this.card.innerHTML = this.template();
    console.log(this.title);
  }
  template() {
    return `<h2 class="production-menu">${this.title}</h2>
      <div class="production-image">
        <img src="${this.src}" alt="${this.title}" />
      </div>
      <p class="production-price">${this.price}</p>
      `;
  }
}

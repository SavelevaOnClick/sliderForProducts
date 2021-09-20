const wrapper = document.querySelector(".wrapper");

class Card {
  constructor(data, continer = wrapper) {
    this.title = data.title;
    this.src = data.image;
    this.price = data.price;
    this.card = document.createElement("div");
    this.card.classList.add("production-card");
    this.card.innerHTML = this.template();
    continer.appendChild(this.card);
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

class Slider {
  constructor(container = document.body) {
    this.sliderSection = container.appendChild(document.createElement("div"));
    this.sliderSection.setAttribute("class", "slider-section");
    this.slider = this.sliderSection.appendChild(document.createElement("div"));
    this.slider.setAttribute("class", "slider");
    this.arrowLeft = document.createElement("button");
    this.sliderSection.appendChild(this.arrowLeft);

    this.arrowRight = document.createElement("button");
    this.sliderSection.appendChild(this.arrowRight);
    this.arrowLeft.classList.add("arrow-left");
    this.arrowRight.classList.add("arrow-right");
    this.sliders = [];
    this.getDataProducts().then((resp) => {
      Object.keys(resp).forEach((elem, index) => {
        const slid = this.slider.appendChild(document.createElement("div"));
        slid.style.order = index + 1;
        slid.classList.add("slid");
        new Card(resp[elem], slid);
        this.sliders.push(slid);
      });
      this.createWidthAndHeight();
    });
    this.sliders.forEach((elem) => elem.classList.add("slid"));

    window.addEventListener("resize", (event) => this.createWidthAndHeight());
    this.arrowRight.addEventListener("click", (event) => {
      this.goToRight();
    });
    this.arrowLeft.addEventListener("click", (event) => this.goToLeft());
  }

  createWidthAndHeight() {
    this.adaptiveWidthOfSlidMini(
      innerWidth < 426 ? 1 : innerWidth < 769 ? 2 : 4
    );
  }

  goToLeft() {
    this.sliders.forEach((slid) => {
      slid.style.order =
        parseInt(getComputedStyle(slid).order) !== 1
          ? parseInt(getComputedStyle(slid).order) - 1
          : this.sliders.length;
    });
  }

  goToRight() {
    this.sliders.forEach((slid) => {
      slid.style.order =
        parseInt(getComputedStyle(slid).order) !== this.sliders.length
          ? parseInt(getComputedStyle(slid).order) + 1
          : 1;
    });
  }

  adaptiveWidthOfSlidMini(slidNumber) {
    console.log(this.sliderSection.offsetWidth);
    this.sliders.forEach((item) =>
      Object.assign(item.style, {
        flexBasis: `${
          (this.sliderSection.offsetWidth -
            (this.sliderSection.offsetWidth / 100) * (slidNumber * 4)) /
          slidNumber
        }px`,
        height: "auto",
        // height: `${
        //   (this.sliderSection.offsetWidth -
        //     (this.sliderSection.offsetWidth / 100) * (slidNumber * 4)) /
        //   slidNumber
        // }px`,
      })
    );
  }
  async getDataProducts() {
    const data = await (
      await fetch(
        "https://laser-engraving-5eb5d-default-rtdb.firebaseio.com/products.json"
      )
    ).json();
    return data;
  }
}

new Slider(wrapper);

//Получаемый извне каталог с ценами
const catalog = [
    {title: 'big', price: 100, caloricity: 40},
    {title: 'small', price: 50, caloricity: 20},
    {title: 'cheese', price: 10, caloricity: 20},
    {title: 'salad', price: 20, caloricity: 5},
    {title: 'potato', price: 15, caloricity: 10},
    {title: 'spices', price: 15, caloricity: 0},
    {title: 'mayonnaise', price: 20, caloricity: 5},
];
//Пустые массивы, чтобы собрать выбранные пользователем ингредиенты и товары
let sizes = [];
let stuffings = [];
let toppings = [];

//Функция-обработчик кликов
function getProduct(event) {
    let product = event.currentTarget;
    if (product.checked) {
        if (product.value === "big") {
            removeProduct("small");
            sizes.push(product.value);
        } else if (product.value === "small") {
            removeProduct("big");
            sizes.push(product.value);
        } else if (product.classList.contains("toppings")) {
            toppings.push(product.value);
        } else {
            stuffings.push(product.value);
        }
    } else {
        if (product.classList.contains("toppings")) {
            removeTopping(product.value);
        } else {
            removeStuffing(product.value);
        }
    }
    console.log(hamburger.getProperties(sizes, stuffings, toppings));
    console.log(hamburger.calculatePriceAndCalories(catalog));
}

//Функции для удаления ненужных элементов
function removeProduct(product) {
    sizes = Array.from(new Set(sizes));
    sizes.splice(sizes.indexOf(product), 1);
}

function removeStuffing(product) {
    stuffings = Array.from(new Set(stuffings));
    stuffings.splice(stuffings.indexOf(product), 1);
}

function removeTopping(product) {
    toppings = Array.from(new Set(toppings));
    toppings.splice(toppings.indexOf(product), 1);
}

//Класс гамбургер
class Hamburger {
    constructor() {
        this.sizeHamburger = [];
        this.stuffing = [];
        this.topping = [];
        this.price = 0;
        this.caloricity = 0;
    }

    // Получить список cвойств
    getProperties(sizes, stuffings, toppings) {
        this.sizeHamburger = sizes;
        this.stuffing = stuffings;
        this.topping = toppings;
        description.innerHTML = `<div class="description__properties"><p>${this.sizeHamburger}</p><p>${this.stuffing}</p><p>${this.topping}</p></div>`;
        return `<div class="properties-item"><p>${this.sizeHamburger}</p><p>${this.stuffing}</p><p>${this.topping}</p></div>`;
    }

    // Узнать цену и калорийность
    calculatePriceAndCalories(catalog) {
        for (let i = 0; i < catalog.length; i++) {
            for (let j = 0; j < this.sizeHamburger.length; j++) {
                if (catalog[i].title === this.sizeHamburger[j]) {
                    console.log(this.topping[j])
                    this.price = catalog[i].price;
                    this.caloricity = catalog[i].caloricity;
                }
            }

        }
        for (let i = 0; i < catalog.length; i++) {
            for (let j = 0; j < this.stuffing.length; j++) {
                if (catalog[i].title === this.stuffing[j]) {
                    console.log(this.stuffing[j])
                    this.price += catalog[i].price;
                    this.caloricity += catalog[i].caloricity;
                }
            }

        }
        for (let i = 0; i < catalog.length; i++) {
            for (let j = 0; j < this.topping.length; j++) {
                if (catalog[i].title === this.topping[j]) {
                    console.log(this.topping[j])
                    this.price += catalog[i].price;
                    this.caloricity += catalog[i].caloricity;
                }
            }

        }
        priceAndCaloricity.innerHTML = `<div class="price-caloricity__item"><p>Price: ${this.price}</p><p> Caloricity: ${this.caloricity}</p></div>`;
        return `<div class="price-caloricity__item"><p>Price: ${this.price}</p><p>Caloricity: ${this.caloricity}</p></div>`;
    }

//Функция для вывода всех свойств с ценой и калорийностью для подтверждения заказа
    render() {
        return `Your hamburger:\nSize: ${this.sizeHamburger}\nStuffing: ${this.stuffing}\nTopping: ${this.topping}\nPrice: ${this.price}\nCaloricity: ${this.caloricity}\nAre you ready to order?`;
    }

}

const description = document.querySelector(".description");
const form = document.querySelector(".form");
const priceAndCaloricity = document.querySelector(".price-caloricity");
const hamburger = new Hamburger();
document.addEventListener("DOMContentLoaded", function () {

    const checkboxes = document.querySelectorAll('.choose');
    checkboxes.forEach((item) => {
        item.addEventListener("change", getProduct);
    });
    const btn = document.querySelector(".form__button");
    btn.addEventListener("click", () => {
        if (hamburger.sizeHamburger.length !== 0) {
            let answer = confirm(hamburger.render());
            if (answer === true) {
                form.reset();
                description.innerHTML = "";
                priceAndCaloricity.innerHTML = "";
                hamburger.sizeHamburger = [];
                hamburger.stuffing = [];
                hamburger.topping = [];
                sizes = [];
                stuffings = [];
                toppings = [];
            }else{
                return 0;
            }

        } else {
            alert("Unknown parameters");
        }

    });

});




const form = document.querySelector(".calc-form");
const products = document.querySelector("#products");
const orders = document.querySelector("#orders");
const package = document.querySelector("#package");
const accounting = document.querySelector("#accounting");
const terminal = document.querySelector("#terminal");
const summary = document.querySelector(".calc-summary");
const totalPrice = document.querySelector("#total-price");

function Order() {
  this.products = 0;
  this.orders = 0;
  this.package = null;
  this.accounting = null;
  this.terminal = null;
  this.total = 0;
}

Order.prototype.prices = {
  products: 0.5,
  orders: 0.25,
  package: {
    basic: 0,
    professional: 25,
    premium: 60,
  },
  accounting: 35,
  terminal: 5,
};

Order.prototype.setProduct = function (product) {
  this.products = product * this.prices.products;
};
Order.prototype.setOrder = function (order) {
  this.orders = order * this.prices.orders;
};
Order.prototype.setPackage = function (package) {
  if (package === "basic") {
    this.package = this.prices.package.basic;
  }
  if (package === "professional") {
    this.package = this.prices.package.professional;
  }
  if (package === "premium") {
    this.package = this.prices.package.premium;
  }
};
Order.prototype.setAccounting = function (value) {
  this.accounting = value * this.prices.accounting;
};

Order.prototype.setTerminal = function (value) {
  this.terminal = value * this.prices.terminal;
};

Order.prototype.getTotal = function () {
  this.total =
    this.products +
    this.orders +
    this.package +
    this.accounting +
    this.terminal;
  return this.total;
};
Order.prototype.showTotal = function () {
  if (this.total > 0) {
    totalPrice.classList.remove("d-none");
    totalPrice.lastElementChild.innerText = "$" + this.total;
  } else {
    totalPrice.classList.add("d-none");
  }
};

const newOrder = new Order();

function getInputValue(e) {
  if (
    (e.currentTarget.id === "products" && Number(e.currentTarget.value) <= 0) ||
    !Number.isInteger(Number(e.currentTarget.value))
  ) {
    console.log("Value should be Integer and greater than 0");
    newOrder.setProduct(0);
  } else if (
    (e.currentTarget.id === "orders" && Number(e.currentTarget.value) <= 0) ||
    !Number.isInteger(Number(e.currentTarget.value))
  ) {
    console.log("Value should be Integer and greater than 0");
    newOrder.setOrder(0);
  } else if (e.currentTarget.id === "products") {
    newOrder.setProduct(Number(e.currentTarget.value));
  } else if (e.currentTarget.id === "orders") {
    newOrder.setOrder(Number(e.currentTarget.value));
  }
  newOrder.getTotal();
  newOrder.showTotal();
}
function showInputSummary(e) {
  const inputSummary = summary.querySelector(
    "[data-id=" + e.currentTarget.id + "]"
  );
  const itemCalc = inputSummary.querySelector(".item-calc");
  const itemPrice = inputSummary.querySelector(".item-price");
  if (
    Number(e.currentTarget.value) <= 0 ||
    !Number.isInteger(Number(e.currentTarget.value))
  ) {
    inputSummary.classList.add("d-none");
    return false;
  } else {
    inputSummary.classList.remove("d-none");
    itemCalc.innerText =
      e.currentTarget.value + " * $" + inputSummary.dataset.price;
    itemPrice.innerText =
      "$" + e.currentTarget.value * inputSummary.dataset.price;
  }
}

function dropdownSelect(e) {
  e.currentTarget.lastElementChild.classList.toggle("d-none");
  e.currentTarget.firstElementChild.classList.toggle("select-input--open");
  e.currentTarget.firstElementChild.innerText = e.target.innerText;
  newOrder.setPackage(e.target.innerText.toLowerCase());
  newOrder.getTotal();
  newOrder.showTotal();
  if (
    e.currentTarget.innerText === "Basic" ||
    e.currentTarget.innerText === "Professional" ||
    e.currentTarget.innerText === "Premium"
  ) {
    const dropdownSummary = summary.querySelector("[data-id='package']");
    const itemCalc = dropdownSummary.querySelector(".item-calc");
    const itemPrice = dropdownSummary.querySelector(".item-price");
    dropdownSummary.classList.remove("d-none");
    itemCalc.innerText = e.target.innerText;
    itemPrice.innerText = "$" + e.target.dataset.price;
  }
}

function checkboxSelect(e) {
  const accountingSummary = summary.querySelector("[data-id='accounting']");
  const terminalSummary = summary.querySelector("[data-id='terminal']");
  if (accounting.checked) {
    accountingSummary.classList.remove("d-none");
    accountingSummary.querySelector(".item-price").innerText =
      "$" + accounting.dataset.price;
    newOrder.setAccounting(1);
  } else if (!accounting.checked) {
    accountingSummary.classList.add("d-none");
    newOrder.setAccounting(0);
  }
  if (terminal.checked) {
    terminalSummary.classList.remove("d-none");
    terminalSummary.querySelector(".item-price").innerText =
      "$" + terminal.dataset.price;
    newOrder.setTerminal(1);
  } else if (!terminal.checked) {
    terminalSummary.classList.add("d-none");
    newOrder.setTerminal(0);
  }
  newOrder.getTotal();
  newOrder.showTotal();
}

products.addEventListener("change", getInputValue);
products.addEventListener("keyup", getInputValue);
products.addEventListener("change", showInputSummary);
products.addEventListener("keyup", showInputSummary);

orders.addEventListener("change", getInputValue);
orders.addEventListener("keyup", getInputValue);
orders.addEventListener("change", showInputSummary);
orders.addEventListener("keyup", showInputSummary);

package.addEventListener("click", dropdownSelect);
accounting.addEventListener("click", checkboxSelect);
terminal.addEventListener("click", checkboxSelect);




//Rozwiązanie bez konstruktora

// //form
// const form = document.querySelector(".calc-form");
// //form inputs
// const products = document.querySelector("#products");
// const orders = document.querySelector("#orders");
// //form select
// const package = document.querySelector("#package");
// const packageSelect = package.querySelector(".select-input");
// const packageDropdownElements = package.querySelectorAll(".select-dropdown li");
// //form checkboxes
// const accounting = document.querySelector("#accounting");
// const terminal = document.querySelector("#terminal");
// // summary
// const summary = document.querySelector(".calc-summary");
// const itemCalc = summary.querySelectorAll(".item-calc");
// const itemPrice = summary.querySelectorAll(".item-price");
// //total
// const totalPrice = document.querySelector("#total-price");

// const prices = {
//   products: 0.5,
//   orders: 0.25,
//   package: {
//     basic: 0,
//     professional: 25,
//     premium: 60,
//   },
//   accounting: 35,
//   terminal: 5,
// };

// function summaryTotal(price, itemIndex) {
//   let summaryTotal = Number(this.value) * price;
//   itemCalc[itemIndex].innerText = this.value + " * $" + price;
//   itemPrice[itemIndex].innerText = "$" + summaryTotal;
// }
// function showSummary() {
//   if (
//     (this.id === "products" && Number(this.value) <= 0) ||
//     !Number.isInteger(Number(this.value))
//   ) {
//     summary.firstElementChild.children[0].classList.add("d-none");
//     summaryTotal.bind(this)(0, 0);
//     return false;
//   }
//   if (
//     (this.id === "orders" && Number(this.value) <= 0) ||
//     !Number.isInteger(Number(this.value))
//   ) {
//     summary.firstElementChild.children[1].classList.add("d-none");
//     summaryTotal.bind(this)(0, 1);
//     return false;
//   }
//   if (this.id === "products") {
//     summary.firstElementChild.children[0].classList.remove("d-none");
//     summaryTotal.bind(this)(prices.products, 0);
//   } else if (this.id === "orders") {
//     summary.firstElementChild.children[1].classList.remove("d-none");
//     summaryTotal.bind(this)(prices.orders, 1);
//   }
// }

// function showSelectSummary() {
//     this.parentElement.previousElementSibling.innerText = this.innerText;
//     this.parentElement.classList.add("d-none");
//     summary.firstElementChild.children[2].classList.remove("d-none");
//     itemCalc[2].innerText = this.innerText;
//     if (this === packageDropdownElements[0]) {
//       itemPrice[2].innerText = "$" + prices.package.basic;
//     } else if (this === packageDropdownElements[1]) {
//       itemPrice[2].innerText = "$" + prices.package.professional;
//     } else if (this === packageDropdownElements[2]) {
//       itemPrice[2].innerText = "$" + prices.package.premium;
//     }
//   }

// function showSelectDropdown() {
//   this.nextElementSibling.classList.toggle("d-none");
//   this.classList.toggle("select-input--open");
//   packageDropdownElements.forEach(function (el) {
//     el.addEventListener("click", showSelectSummary);
//   });
// }

// function showAndHideCheckboxSummary() {
// if (this.id === "accounting" && accounting.checked) {
//     summary.firstElementChild.children[3].classList.remove("d-none");
//     summary.firstElementChild.children[3].lastElementChild.innerText = "$" + prices.accounting;
// } else if (!accounting.checked) {
//     summary.firstElementChild.children[3].classList.add("d-none");
//     summary.firstElementChild.children[3].lastElementChild.innerText = "$0";
// }
// if (this.id === "terminal" && terminal.checked) {
//     summary.firstElementChild.children[4].classList.remove("d-none");
//     summary.firstElementChild.children[4].lastElementChild.innerText = "$" + prices.terminal;
// } else if (!terminal.checked) {
//     summary.firstElementChild.children[4].classList.add("d-none");
//     summary.firstElementChild.children[4].lastElementChild.innerText = "$0";
// }
// }

// function showTotal() {
//     totalPrice.classList.remove("d-none");
//     let total = 0;
//     for (let i = 0; i < itemPrice.length; i++) {
//         const numberFromString = itemPrice[i].innerText.substr(1);
//         total = total + Number(numberFromString);
//     }
//     totalPrice.lastElementChild.innerText = "$" + total;
//     }

// //listeners

// products.addEventListener("change", showSummary);
// orders.addEventListener("change", showSummary);
// packageSelect.addEventListener("click", showSelectDropdown);
// accounting.addEventListener("click", showAndHideCheckboxSummary);
// terminal.addEventListener("click", showAndHideCheckboxSummary);
// form.addEventListener("click", showTotal);

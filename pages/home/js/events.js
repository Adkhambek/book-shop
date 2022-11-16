import * as staticHTML from "./innerHTML.js";
import * as helper from "./utils/helpers.js";
import * as fragments from "./fragments.js";
import { getData } from "./data.js";

const body = document.querySelector("body");
let total = 0;

export default async function () {
    const btns = document.querySelectorAll(".read-more");
    const modal = document.querySelector(".modal");
    const bagBtns = document.querySelectorAll(".bag");
    const orderList = document.querySelector(".order__list");
    const totalPriceHeading = document.querySelector(".order__price");
    const list = document.querySelector(".list");
    const grid = document.querySelector(".grid");
    const filter = document.querySelector(".filter");
    const search = document.querySelector(".search");
    const searchBtn = document.querySelector(".search-btn");
    const resetBtn = document.querySelector(".reset-btn");
    const confirmOrderBtn = document.querySelector(".order__btn");
    const cleanOrderBtn = document.querySelector(".clean-btn");
    const removeOrderBtns = document.querySelectorAll(".order__close-btn");

    displayModal(btns);
    addOrder(bagBtns);

    list.addEventListener("click", () => {
        const lis = document.querySelectorAll(".catalog__item");
        list.classList.add("select");
        grid.classList.remove("select");
        for (const li of lis) {
            li.setAttribute("class", "catalog__item-flex");
            const elements = li.querySelector(".book-label").children;
            elements[elements.length - 1].classList.remove("hidden");
            for (const element of elements) {
                if (element.hidden) element.hidden = false;
            }
        }
    });

    grid.addEventListener("click", () => {
        const lis = document.querySelectorAll(".catalog__item-flex");
        list.classList.remove("select");
        grid.classList.add("select");
        for (const li of lis) {
            li.setAttribute("class", "catalog__item");
            const elements = li.querySelector(".book-label").children;
            elements[elements.length - 1].classList.add("hidden");
            elements[0].hidden = true;
            elements[3].hidden = true;
        }
    });

    filter.addEventListener("change", async (event) => {
        if (list.classList.contains("select")) {
            list.classList.remove("select");
            grid.classList.add("select");
        }
        const value = event.target.value;
        const books = helper.sort(await getData(), value);
        const ul = document.querySelector(".catalog__list");
        ul.innerHTML = null;
        ul.append(fragments.getCatalogList(books));

        const btns = document.querySelectorAll(".read-more");
        const bagBtns = document.querySelectorAll(".bag");

        addOrder(bagBtns);
        displayModal(btns);
    });

    searchBtn.addEventListener("click", async (event) => {
        if (list.classList.contains("select")) {
            list.classList.remove("select");
            grid.classList.add("select");
        }

        const books = helper.search(await getData(), search.value);
        const ul = document.querySelector(".catalog__list");

        if (search.value) resetBtn.hidden = false;

        ul.innerHTML = null;

        ul.append(fragments.getCatalogList(books));

        const btns = document.querySelectorAll(".read-more");
        const bagBtns = document.querySelectorAll(".bag");

        addOrder(bagBtns);
        displayModal(btns);

        search.value = "";
    });

    resetBtn.addEventListener("click", async (event) => {
        if (list.classList.contains("select")) {
            list.classList.remove("select");
            grid.classList.add("select");
        }
        event.target.closest("button").hidden = true;
        const ul = document.querySelector(".catalog__list");
        ul.innerHTML = null;
        const books = await getData();
        ul.append(fragments.getCatalogList(books));

        const btns = document.querySelectorAll(".read-more");
        const bagBtns = document.querySelectorAll(".bag");

        addOrder(bagBtns);
        displayModal(btns);
    });

    removeOrderBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {});
    });

    function addOrder(btns) {
        btns.forEach((btn) => {
            btn.addEventListener("click", async (event) => {
                if (cleanOrderBtn.hidden) {
                    confirmOrderBtn.hidden = false;
                    cleanOrderBtn.hidden = false;
                }
                const id = event.target.closest("button").dataset.id;
                const book = helper.findById(await getData(), +id);
                total += book.price;
                totalPriceHeading.textContent = "$" + total;
                orderList.append(fragments.getOrderListItem(book));
            });
        });
    }

    function displayModal(btns) {
        btns.forEach((btn) => {
            btn.addEventListener("click", async (event) => {
                const id = event.target.closest("button").dataset.id;
                const book = helper.findById(await getData(), +id);

                btn.closest("div").style.zIndex = -1;
                body.style.overflowY = "hidden";
                modal.hidden = false;
                modal.innerHTML = staticHTML.modal(book);

                const closeBtn = modal.querySelector(".modal__close-btn");

                function close() {
                    modal.hidden = true;
                    body.removeAttribute("style");
                    btn.closest("div").removeAttribute("style");
                }

                closeBtn.addEventListener("click", () => close());

                const modalBagBtn = modal.querySelector(".card-btn");

                modalBagBtn.addEventListener("click", async (event) => {
                    if (cleanOrderBtn.hidden) {
                        confirmOrderBtn.hidden = false;
                        cleanOrderBtn.hidden = false;
                    }

                    const id = event.target.closest("button").dataset.id;
                    const book = helper.findById(await getData(), +id);
                    total += book.price;
                    totalPriceHeading.textContent = "$" + total;
                    orderList.append(fragments.getOrderListItem(book));

                    close();
                });
            });
        });
    }
}

import { getData } from "./data.js";
import * as staticHTML from "./innerHTML.js";
import { findById, truncate } from "./utils/helpers.js";

export function getHeader() {
    const fragment = new DocumentFragment();
    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    header.className = "app__header";
    h1.className = "app__title";
    h1.textContent = "Welcome to amazing book shop";
    header.append(h1);
    fragment.append(header);
    return fragment;
}

export async function getAppMain() {
    const fragment = new DocumentFragment();
    const appMain = document.createElement("div");
    appMain.className = "app__main";
    appMain.append(await getCatalog());
    appMain.append(getOrder());
    fragment.append(appMain);
    return fragment;
}

export function getModal() {
    const fragment = new DocumentFragment();
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.hidden = true;
    fragment.append(modal);
    return fragment;
}

export function getCatalogList(books) {
    const fragment = new DocumentFragment();
    for (const book of books) {
        const li = document.createElement("li");
        li.className = "catalog__item";
        li.draggable = true;
        li.setAttribute("data-id", book.id);
        book.title = truncate(book.title, 60);
        li.innerHTML = staticHTML.catalogItem(book);
        fragment.append(li);
    }

    return fragment;
}

export function getOrderListItem(book) {
    const fragment = new DocumentFragment();
    const li = document.createElement("li");
    li.className = "order__item";
    book.title = truncate(book.title, 60);
    li.innerHTML = staticHTML.getOrderListItem(book);
    staticHTML.getOrderListItem(book);
    fragment.append(li);
    return fragment;
}

async function getCatalog() {
    const books = await getData();
    const fragment = new DocumentFragment();
    const catalog = document.createElement("div");
    const header = document.createElement("header");
    const topBar = document.createElement("div");
    const ul = document.createElement("ul");
    const reset = document.createElement("button");

    catalog.className = "catalog";
    header.className = "catalog__header";
    topBar.className = "catalog__top-bar";
    ul.className = "catalog__list";
    reset.className = "reset-btn";

    header.innerHTML = staticHTML.catalogHeader;
    topBar.innerHTML = staticHTML.catalogTopBar;
    reset.textContent = "Reset";
    reset.hidden = true;

    ul.append(await getCatalogList(books));
    catalog.append(header);
    catalog.append(topBar);
    catalog.append(reset);
    catalog.append(ul);
    fragment.append(catalog);
    return fragment;
}

function getOrder() {
    const fragment = new DocumentFragment();
    const order = document.createElement("div");
    order.className = "order";
    order.innerHTML = staticHTML.order;
    fragment.append(order);
    return fragment;
}

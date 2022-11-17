export const catalogHeader = `<div class="catalog__search">
<img
    src="../../assets/images/icons/search.svg"
    alt="search icon"
/>
<input
    class ="search"
    type="search"
    placeholder="Search for books"
/>
<button class="search-btn" type="button">Search</button>
</div>`;

export const catalogTopBar = `<div class="catalog__filter">
<p>Sort by:</p>
<select class="filter" name="sortBy" id="sortBy">
    <option value="id-ascending">
        Id, low to high
    </option>
    <option value="id-descending">
        Id, high to low
    </option>
    <option value="title-ascending">
        Alphabetically, A-Z
    </option>
    <option value="title-descending">
        Alphabetically, Z-A
    </option>
    <option value="price-ascending">
        Price, low to high
    </option>
    <option value="price-descending">
        Price, high to low
    </option>
</select>
</div>
<div class="catalog__right">
<button type="button" class="grid select">
    <i class="fas fa-th-large"></i>
</button>
<button type="button" class="list">
    <i class="fas fa-list-ul"></i>
</button>
</div>`;

export const order = `<h2 class="order__title">
    Total sum: <span class="order__price">$0</span>
</h2>
<a href="/book-shop/pages/order" class="order__btn hidden" hidden>Confirm Order</a>
<ul class="order__list"></ul>
<button class="order__btn clean-btn hidden">Clean</button>`;

export const modal = (book) => {
    return `<div class="modal__card">
    <button type="button" class="modal__close-btn">
        <img
            src="../../assets/images/icons/x.svg"
            alt="close btn"
        />
    </button>
    <img
        class="modal__book-image"
        src="../../assets/images/books/${book.imageLink}"
        alt="book cover"
    />
    <div class="modal__text-box">
        <h2 class="modal__book-title">${book.title}</h2>
        <p class="modal__book-author">${book.author}</p>
        <p class="modal__book-price">$${book.price}</p>
        <p class="book-description">${book.description}</p>
        <button type="button" data-id="${book.id}" class="card-btn">Add to card</button>
    </div>
</div>`;
};

export const catalogItem = (book) => {
    return `<div class="surface-box">
        <button data-id="${book.id}" class="read-more">
            <i class="fas fa-search-plus"></i>
        </button>
        <button data-id="${book.id}" class="bag">
            <i class="fas fa-shopping-bag"></i>
        </button>
    </div>
    <img
        src="../../assets/images/books/${book.imageLink}"
        alt="${book.title}"
    />
    <div class="book-label">
        <p class="book-author" hidden>
            ${book.author}
        </p>
        <h2 class="book-name">${book.title}</h2>
        <p class="book-price">$${book.price}</p>
        <p class="book-description" hidden>
            ${book.description}
        </p>
        <button type="button" data-id="${book.id}" class="bag card-btn hidden">
            Add to card
        </button>
    </div>`;
};

export function getOrderListItem(book) {
    return `<button class="order__close-btn">
        <img
            src="../../assets/images/icons/x.svg"
            alt=""
            class="order__close-img"
        />
    </button>

    <img
        class="order__book-image"
        src="../../assets/images/books/${book.imageLink}"
        alt="book cover"
    />
    <div class="order__book-label">
        <p class="order__book-author">
        ${book.author}
        </p>
        <h3 class="order__book-name">
        ${book.title}
        </h3>
        <p class="order__book-price">$${book.price}</p>
    </div>`;
}

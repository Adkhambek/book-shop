export function findById(books, id) {
    return books.find((val) => val.id === id);
}

export function sort(books, by) {
    let result;
    switch (by) {
        case "id-descending":
            result = books.sort((a, b) => b.id - a.id);
            break;
        case "title-ascending":
            result = books.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "title-descending":
            result = books.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case "price-ascending":
            result = books.sort((a, b) => a.price - b.price);
            break;
        case "price-descending":
            result = books.sort((a, b) => b.price - a.price);
            break;
        default:
            result = books.sort((a, b) => a.id - b.id);
            break;
    }

    return result;
}

export function search(books, key) {
    return books.filter((val) => {
        const title = val.title.toLowerCase();
        return title.includes(key.toLowerCase())
    });
}

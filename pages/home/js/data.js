export async function getData() {
    const data = await fetch("./books.json");
    return await data.json();
}

const app = document.querySelector(".app");
const body = document.querySelector("body");
import * as fragments from "./fragments.js";
import events from "./events.js";

async function renderHTML() {
    app.append(fragments.getHeader());
    app.append(await fragments.getAppMain());
    body.append(fragments.getModal());
    await events();
}
renderHTML();

import { e as escape_html } from "../../chunks/escaping.js";
import "clsx";
import { c as pop, p as push } from "../../chunks/index.js";
import { io } from "socket.io-client";
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (is_boolean) return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
const socket = io("https://imposterselfmadebackend.onrender.com/", {
  autoConnect: false
});
function _page($$payload, $$props) {
  push();
  let username = "";
  let assignedWord = "";
  socket.on("NewWord", (data) => {
    console.log("Empfangen:", data);
    assignedWord = data.word ?? `Tipp: ${data.hint}`;
  });
  socket.on("username-taken", (name) => {
    alert(`Der Name ${name} ist bereits vergeben`);
  });
  socket.on("joined-successfully", (name) => {
    alert(`Willkommen ${name}`);
  });
  $$payload.out += `<section><h1 class="ml-2 mb-3 text-4xl">Login</h1> <div class="mt-4 ml-4"><input type="text" placeholder="Name"${attr("value", username)}/> <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 rounded">Login</button></div> <br/> <div class="ml-2 mt-10"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Spiel starten</button> <p class="mt-2">Dein Wort:</p> <span class="text-xl font-bold mt-2">${escape_html(assignedWord)}</span></div></section>`;
  pop();
}
export {
  _page as default
};

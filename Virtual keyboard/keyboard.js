let keys = document.querySelectorAll(".key");
let space = document.querySelector(".space");
let deleteBtn = document.querySelector(".delete-btn");
let caps = document.querySelector(".caps-lock");
let textArea = document.querySelector("#text-area");
let isCaps = true;
let displaybtn = document.querySelector('.display');
let keyboard = document.querySelector('.keyboard')

const storedText = localStorage.getItem('userText');
function bootup() {
  if (storedText) {
    textArea.innerText = storedText;
    }
}

bootup();
// caps lock
function tocaps() {
  keys.forEach((key) => {
    let text = key.textContent;
    if (text.length === 1) {
      if (isCaps) {
        key.innerHTML = text.toUpperCase();
      } else {
        key.innerHTML = text.toLowerCase();
      }
    }
  });
}

//virtual keyboard on/off

displaybtn.addEventListener('click', () => {
  keyboard.classList.toggle('active');
  displaybtn.classList.toggle('active2');
})

// typing
keys.forEach((key) => {
  key.addEventListener("click", () => {
    let text = key.textContent;
    if (text === "Space") {
      textArea.innerHTML += " ";
    } else if (text === "Enter") {
      textArea.innerHTML += "<br>";
    } else if (text === "Backspace") {
      let content = textArea.innerHTML;
      if (content.endsWith("<br>")) {
        textArea.innerHTML = content.slice(0, -4);
      } else {
        textArea.innerHTML = content.slice(0, -1);
      }
    } else if (text === "Caps Lock") {
      isCaps = !isCaps;
      tocaps();
      caps.classList.toggle("underline");
    } else {
      textArea.innerHTML += text;
    }
    localStorage.setItem('userText', textArea.innerText);
  });
});

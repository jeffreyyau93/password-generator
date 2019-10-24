// Dom elements
const resultElm = document.getElementById("result");
const clipboardElm = document.getElementById("clipboard");
const lengthElm = document.getElementById("length");
const uppercaseElm = document.getElementById("uppercase");
const lowercaseElm = document.getElementById("lowercase");
const numbersElm = document.getElementById("numbers");
const symbolsElm = document.getElementById("symbols");
const generateElm = document.getElementById("generate");

const randFunc = {
  upper: genRandUpper,
  lower: genRandLower,
  number: genRandNum,
  symbol: genRandSymbol
};

// Generate event listener
generateElm.addEventListener("click", () => {
  const length = +lengthElm.value;
  const hasUpper = uppercaseElm.checked;
  const hasLower = lowercaseElm.checked;
  const hasNumber = numbersElm.checked;
  const hasSymbol = symbolsElm.checked;

  resultElm.innerText = genPass(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

// Copy password to clipboard
clipboardElm.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultElm.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("已複製密碼到剪貼簿");
});

// Generate password function
function genPass(upper, lower, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = upper + lower + number + symbol;
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generator functions
function genRandUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function genRandLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function genRandNum() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function genRandSymbol() {
  const symbol = "!@#$%^&*(){}[]=<>/,.";
  return symbol[Math.floor(Math.random() * symbol.length)];
}

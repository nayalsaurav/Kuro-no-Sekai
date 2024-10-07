
const paswordLength = document.getElementById('length');
const rangeValue = document.getElementById('range-value');
const number = document.getElementById('number');
const lowerCase = document.getElementById('lowercase-character');
const upperCase = document.getElementById('uppercase-character');
const specialChar = document.getElementById('special-character');
const generatebtn = document.getElementById('generatebtn');
const passValue = document.getElementById('pasword-value');

paswordLength.addEventListener('input',()=>{
    rangeValue.textContent=paswordLength.value;
});


generatebtn.addEventListener('click',()=>{
    passValue.value = generatePassword();
});

let uppercaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercaseString = "abcdefghijklmnopqrstuvwxyz";
let specialCharString = "~!@#$%^&*";
let numberString = "0123456789"; 

function generatePassword() {
    let selectedStrings = "";
    let currentPassword ="";
    selectedStrings+= upperCase.checked ? uppercaseString:"";
    selectedStrings+= lowerCase.checked ? lowercaseString:"";
    selectedStrings+= number.checked ? numberString:"";
    selectedStrings+= specialChar.checked ? specialCharString:"";
    let currSize = paswordLength.value;
    for(let i=0;i<currSize;i++){
        currentPassword += selectedStrings.charAt(Math.floor(Math.random()*selectedStrings.length));
    }
    return currentPassword;
}

copyIcon.addEventListener('click',()=>{
    navigator.clipboard.write(passValue);
});
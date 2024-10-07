
const length = document.getElementById('length');
const rangeValue = document.getElementById('range-value');
const number = document.getElementById('number');
const lowerCase = document.getElementById('lowercase-character');
const upperCase = document.getElementById('uppercase-character');
const specialChar = document.getElementById('special-character');

length.addEventListener('input',()=>{
    rangeValue.textContent=length.value;
});

// function isSelected(option) {
//     option.
// }
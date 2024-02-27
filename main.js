const customTip = document.querySelector(".custom-tip");
const customTipCheck = document.querySelector("#custom");

customTip.addEventListener("focus", () => {
  customTipCheck.checked = true;
});

function updateCalc() {
  document.querySelector('#billError').style.opacity = '0';
  document.querySelector('#billError').style.opacity = '0';

  var billInput = document.querySelector("#billInput");
  var peopleInput = document.querySelector("#peopleInput");
  const bill = Number(billInput.value);
  const people = Number(peopleInput.value);
  const tipPercentage = document.querySelector('.tip-option > input[type="radio"]:checked') ? document.querySelector('.tip-option > input[type="radio"]:checked').id : null;

  if (bill !== null && people !== null && tipPercentage !== null && bill !== 0 && people !== 0 && tipPercentage !== '0%' && tipPercentage !== "0") {
    calcReset.removeAttribute("disabled");
    console.log("values are filled");
    const tip = tipPercentage !== 'custom' ? Number(tipPercentage.replace("%", "")) : Number(document.querySelector("#customTip").value.replace("%", ""));

    console.log(bill, tip, people);

    const rawTipPerPerson = (bill / people) * (tip / 100);
    const tipPerPerson = sliceToPrice(rawTipPerPerson);

    console.log("Tip amount per person: " + tipPerPerson);

    var tipPerPersonDisplay = document.querySelector("#tipPerPersonDisplay");

    tipPerPersonDisplay.innerHTML = `$${tipPerPerson}`;

    const rawTotalPerPerson = (bill / people) * (tip / 100) + (bill / people);
    const totalPerPerson = sliceToPrice(rawTotalPerPerson);

    console.log("Total per person: " + totalPerPerson);

    var totalPerPersonDisplay = document.querySelector("#totalPerPersonDisplay");

    totalPerPersonDisplay.innerHTML = `$${totalPerPerson}`
  }
}

function sliceToPrice(num) {
  const stringNum = num.toString();
  const dotIndex = stringNum.indexOf(".");
  if (dotIndex === -1) {
    return num;
  }
  return parseFloat(stringNum.substring(0, dotIndex + 3));
}

billInput.addEventListener("input", updateCalc);
peopleInput.addEventListener("input", updateCalc);
const percentages = document.querySelectorAll('.tip-option > input[type="radio"]');

percentages.forEach(percentage => {
  percentage.addEventListener("click", () => {
    updateCalc();
  })
})
const customTipInput = document.querySelector("#customTip");

customTipInput.addEventListener("input", updateCalc);

const calcReset = document.querySelector("#calcReset");

calcReset.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  document.querySelector('.tip-option > input[type="radio"]:checked').checked = false;

  tipPerPersonDisplay.innerHTML = "$0.00";
  totalPerPersonDisplay.innerHTML = "$0.00";

  calcReset.setAttribute("disabled", "");
})

calcReset.setAttribute("disabled", "");

billInput.addEventListener("input", () => {
  if (Number(billInput.value) === 0 && billInput.value !== "") {
    document.querySelector('#billError').style.opacity = '1';
    billInput.style.outlineColor = "#d8735f";
  } else {
    document.querySelector('#billError').style.opacity = '0';
    billInput.style.outlineColor = "var(--primary-cyan)";
  }
})

peopleInput.addEventListener("input", () => {
  if (Number(peopleInput.value) === 0 && peopleInput.value !== "") {
    document.querySelector('#peopleError').style.opacity = '1';
    peopleInput.style.outlineColor = "#d8735f";
  } else {
    document.querySelector('#peopleError').style.opacity = '0';
    peopleInput.style.outlineColor = "var(--primary-cyan)";
  }
})
let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
let checkBoxValues = JSON.parse(localStorage.getItem('checkBoxValues')) || {};
let checkBoxesCount = document.querySelector('.checkBoxesCount');
let checkedBoxesCount = document.querySelector('.checkedBoxesCount');
let progress = document.querySelector('.progress__bar');
let resetButton = document.querySelector('.reset-button');
let checkBoxesLength = checkBoxes.length;

// checkBoxesCount.textContent = checkBoxesLength;

function updateStorage(element) {
  checkBoxValues[element.id] = element.checked;
  localStorage.setItem('checkBoxValues', JSON.stringify(checkBoxValues));
}

function updateCounter() {
  let globalCheckedCounter = 0;
  document.querySelectorAll('input:checked').forEach((el) => {
    globalCheckedCounter += 1;
  });

  checkedBoxesCount.textContent = globalCheckedCounter;
  progress.style.transform = `scaleX(${globalCheckedCounter / checkBoxesLength})`;
  localStorage.setItem('checkedBoxesCountFromStorage', globalCheckedCounter);

  updateStorage(this);
}

function loadIds() {
  checkBoxes.forEach((element) => {
    let generateId = content => content.toLocaleLowerCase().replace(/[ ,.!?;:'-]/g, '');

    element.setAttribute('id', generateId(element.parentNode.textContent));
  });
}

function loadValues() {
  checkBoxesCount.textContent = checkBoxesLength;

  let initialCounterValue = localStorage.getItem('checkedBoxesCountFromStorage') || 0;
  checkedBoxesCount.textContent = initialCounterValue;

  Object.keys(checkBoxValues).forEach((key) => {
    document.getElementById(key).checked = checkBoxValues[key]
  });
}

function resetCheckboxes() {
  checkBoxes.forEach(element => element.checked = false);
  Object.keys(checkBoxValues).forEach(key => delete checkBoxValues[key]);
  updateCounter();
}

checkBoxes.forEach(checkBox => checkBox.addEventListener('click', updateCounter));

resetButton.addEventListener('click', resetCheckboxes);

loadIds()
loadValues();

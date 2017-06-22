'use strict';

let checkBoxes = document.querySelectorAll('input[type="checkbox"]'),
    checkBoxValues = JSON.parse(localStorage.getItem('checkBoxValues')) || {},
    checkBoxesCount = document.querySelector('.checkBoxesCount'),
    checkedBoxesCount = document.querySelector('.checkedBoxesCount'),
    progress = document.querySelector('.progress-bar'),
    resetButton = document.querySelector('.reset-button'),
    checkBoxesLength = checkBoxes.length;

function loadIds() {
  checkBoxes.forEach(element => {
    let generateId = content => content.toLocaleLowerCase().replace(/[ ,.!?;:'-]/g, '');
    element.setAttribute('id', generateId(element.parentNode.textContent));
  });
}

function loadValues() {
  let initialCounterValue = localStorage.getItem('checkedBoxesCountFromStorage') || 0,
      initialCheckedCounterValue = localStorage.getItem('checkedBoxesCountFromStorage') || 0;

  checkBoxesCount.textContent = checkBoxesLength;
  checkedBoxesCount.textContent = initialCounterValue;
  progress.style.transform = `scaleX(${initialCheckedCounterValue / checkBoxesLength})`;

  Object.keys(checkBoxValues).forEach(key => {
    document.getElementById(key).checked = checkBoxValues[key]
  });
}

function updateStorage(element) {
  checkBoxValues[element.id] = element.checked;
  localStorage.setItem('checkBoxValues', JSON.stringify(checkBoxValues));
}

function updateCounter() {
  let globalCheckedCounter = 0;

  document.querySelectorAll('input:checked').forEach(() => {
    globalCheckedCounter += 1;
  });

  checkedBoxesCount.textContent = globalCheckedCounter;
  progress.style.transform = `scaleX(${globalCheckedCounter / checkBoxesLength})`;
  localStorage.setItem('checkedBoxesCountFromStorage', globalCheckedCounter);

  updateStorage(this);
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

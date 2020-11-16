var buttons = document.getElementById("buttons");
var bar = document.getElementById("progress-bar");
var dropdown_menu = document.getElementById('bar');
var optionList = document.getElementById("bar");
var selectedBarId = '';
var activeProgressRef = '';
var progressValue = 0;
var progressMaxLimit = 100;

fetch('http://pb-api.herokuapp.com/bars')
  .then(res => res.json())
  .then((out) => {
    const buttonValueList = out.buttons;
    const progressBarValueList = out.bars;
    progressMaxLimit = out.limit;

    buttonValueList.forEach(function(item) {
      const newButtonElem = document.createElement('button');
      newButtonElem.value = item;
      newButtonElem.innerText = item
      newButtonElem.onclick = f1;
      buttons.append(newButtonElem)
    })
    progressBarValueList.forEach(function(item, index) {
      const id = "progress" + (index + 1);
      newbar = document.createElement('progress');
      newbar.id = id
      newbar.value = item;
      newbar.max = progressMaxLimit;
      bar.appendChild(newbar);

      new_menu = document.createElement('option');
      new_menu.value = id;
      new_menu.innerHTML = id;
      dropdown_menu.appendChild(new_menu);


    })

    handleoptionchange()

  }).catch(err => console.error(err));

function f1(e) {
  const delta = parseInt(e.target.value);
  if (progressValue <= 0 && delta < 0) {
    progressValue = 0
    activeProgressRef.value = 0
    return;
  }
  progressValue += delta;
  activeProgressRef.value = progressValue;
  if (progressValue >= progressMaxLimit) {
    activeProgressRef.style.background = 'red'
  } else {
    activeProgressRef.style.background = 'green'
  }

}

function handleoptionchange() {
  selectedBarId = optionList.options[optionList.selectedIndex].value
  activeProgressRef = document.getElementById(selectedBarId);
  progressValue = activeProgressRef.value
}

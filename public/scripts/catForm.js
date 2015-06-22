var slider = document.querySelector('input[type="range"]');
var ageDisplay = document.getElementById('cat-age');

ageDisplay.innerHTML = slider.value;

slider.addEventListener("input", function (event) {
  ageDisplay.innerHTML = this.value;
});

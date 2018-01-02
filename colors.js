let iro = require("iro.js");
let colorCheckerInterval;
var colorIsChanging = false;

let colorPickerElem = document.getElementById("color-picker-container")
let colorPicker = new iro.ColorPicker(colorPickerElem, {
  width: 320,
  height: 320,
  color: "#DCD0F3"
});

colorPicker.on("color:change", function(color, changes) {
  socket.emit('color change', color.hexString);
  document.body.style.backgroundColor = color.hexString
});

function setBgToId(id, color){
  document.getElementById(id).style.backgroundColor = "#" + color
}

function setTxtToId(id, color){
  document.getElementById(id).style.color = "#" + color
}

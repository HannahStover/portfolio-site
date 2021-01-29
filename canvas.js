let context;
// Chcek for the canvas tag onload.

if (window.addEventListener) {
  window.addEventListener(
    'load',
    function () {
      let canvas, canvaso, contexto;
      init();
    },
    false
  );
}

//Default tool. (chalk, line, rectangle)
let tool;
let tool_default = 'chalk';

function init() {
  canvaso = document.getElementById('drawingCanvas');
  if (!canvaso) {
    alert('Error! The canvas element was not found!');
    return;
  }
  if (!canvaso.getContext) {
    alert('Error! No canvas.getContext!');
    return;
  }
  //Create 2d canvas.
  contexto = canvaso.getContext('2d');
  if (!contexto) {
    alert('Error! Failed to getContext!');
    return;
  }

  //Build the temp canvas.
  let container = canvaso.parentNode;
  canvas = document.createElement('canvas');
  if (!canvas) {
    alert('Error! Cannot create a new canvas element!');
    return;
  }
  canvas.id = 'tempCanvas';
  canvas.width = canvaso.width;
  canvas.height = canvaso.height;
  container.appendChild(canvas);
  context = canvas.getContext('2d');
  context.strokeStyle = '#FFFFFF'; //Default line color.
  context.lineWidth = 1.0; //Default stroke weight.

  // Fill transparent canvas with dark grey (so we can use the color to erase.)
  context.fillStyle = '#424242';
  context.fillRect(0, 0, 897, 532); //Top, Left, Width, Height of canvas.
}

//Create a select field with our tools.

let tools_select = document.getElementById('selector');
if (!tools_select) {
  alert('Error! Failed to get the select element!');
  return;
}
tools_select.addEventListener('change', ev_tool_change, false);

//Activate the default tool (chalk).

if (tools[tool_default]) {
  tool = new tools[tool_default]();
  tools_select.value = tool_default;
}

//Event Listeners

canvas.addEventListener('mousedown', ev_canvas, false);
canvas.addEventListener('mousemove', ev_canvas, false);
canvas.addEventListener('mouseup', ev_canvas, false);

//Get the mouse position.
function ev_canvas(ev) {
  if (ev.layerX || ev.layerX == 0) {
    //Firefox
    ev._x = ev.layerX;
    ev._y = ev.layerY;
  }
}
if (ev.offsetX || ev.offsetX == 0) {
  // Opera
  ev._y = ev.offsetX;
  ev._y = ev.offsetY;
}
// Get the tool's event handler.
let func = ool[ev.type];
if (funct) {
  funct(ev);
}
function ev_tool_change(ev) {
  if (tools[this.value]) {
    tool = new tools[this.value]();
  }
}
// Create the temporary canvas on top of the canvas, which is cleared each time the user draws.
function img_update() {
  contexto.drawImage(canvas, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
}
let tools = {};
//Chalk tool.
tools.chalk = function () {
  let tool = this;
  this.started = false;
  //Begin drawing with the chalk tool
  this.mousedown = function (ev) {
    context.beginPath();
    context.moveTo(ev._x, ev._y);
    tool.started = true;
  };
  this.mousemove = function (ev) {
    if (tool.started) {
      context.lineTo(ev._x, ev._y);
      context.stroke();
    }
  };
  this.mouseup = function (ev) {
    if (tool.started) {
      tool.mousemove(ev);
      tool.started = false;
      img_update();
    }
  };
};

// The rectangle tool.
tools.rect = function () {
  let tool = this;
  this.started = false;
  this.mousedown = function (ev) {
    tool.started = true;
    tool.x0 = ev._x;
    tool.y0 = ev._y;
  };
  this.mousemove = function (ev) {
    if (!tool.started) {
      return;
    }
    // This creates a rectangle on the canvas.
    let x = Math.min(ev._x, tool.x0),
      y = Math.min(ev._y - tool.y0),
      w = Math.abs(ev._x - tool.x0),
      h = Math.abs(ev._y - tool.y0);
    context.clearRect(0, 0, canvas.width, canvas.height); // clears the rectangle onload

    if (!w || !h) {
      return;
    }
    context.strokeRect(x, y, w, h);
  };
  // Now when you select the rectangle tool, you can draw rectangles
  this.mouseup = function (ev) {
    if (tool.started) {
      tool.mousemove(ev);
      tool.started = false;
      img_update();
    }
  };
};
// The line tool.
tools.line = function () {
  let tool = this;
  this.started = false;
  this.mousedown = function (ev) {
    tool.started = true;
    tool.x0 = ev._x;
    tool.y0 = ev._y;
  };
  this.mousemove = function (ev) {
    if (!tool.started) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Begin the line
    context.beginPath();
    context.moveTo(tool.x0, tool.y0);
    context.lineTo(ev._x, ev._y);
    context.stroke();
    context.closePath();
  };
  // Now you can draw lines when the line tool is selected
  this.mouseup = function (ev) {
    if (tool.started) {
      tool.mousemove(ev);
      tool.started = false;
      img_update();
    }
  };
};

// let canvas, canvaso, contexto;
// //Default tool. (chalk, line, rectangle)
// let tool;
// let tool_default = 'chalk';

// function init() {
//   canvaso = document.getElementById('drawingCanvas');
//   if (!canvaso) {
//     alert('Error! The canvas element was not found!');
//     return;
//   }
//   if (!canvaso.getContext) {
//     alert('Error! No canvas.getContext!');
//     return;
//   }
//   //Create 2d canvas.
//   contexto = canvaso.getContext('2d');
//   if (!contexto) {
//     alert('Error! Failed to getContext!');
//     return;
//   }

//   //Build the temp canvas.
//   let container = canvaso.parentNode;
//   canvas = document.createElement('canvas');
//   if (!canvas) {
//     alert('Error! Cannot create a new canvas element!');
//     return;
//   }
//   canvas.id = 'tempCanvas';
//   canvas.width = canvaso.width;
//   canvas.height = canvaso.height;
//   container.appendChild(canvas);
//   context = canvas.getContext('2d');
//   context.strokeStyle = '#FFFFFF'; //Default line color.
//   context.lineWidth = 1.0; //Default stroke weight.

//   // Fill transparent canvas with dark grey (so we can use the color to erase.)
//   context.fillStyle = '#424242';
//   context.fillRect(0, 0, 897, 532); //Top, Left, Width, Height of canvas.
// }

// //Create a select field with our tools.

// let tools_select = document.getElementById('selector');
// if (!tools_select) {
//     alert('Error! Failed to get the select element!');
//     return;
// }
// tools_select.addEventListener('change', ev_tool_change,false);

// //Activate the default tool (chalk).

// if (tools[tool_default]) {
//     tool = new tools[tool_default]();
//     tools_select.value = tool_default;
// }

// //Event Listeners

// canvas.addEventListener('mousedown', ev_canvas, false);
// canvas.addEventListener('mousemove', ev_canvas, false);
// canvas.addEventListener('mouseup', ev_canvas, false);

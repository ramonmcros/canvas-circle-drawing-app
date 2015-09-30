window.onload = function() {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var canvasBrush = document.getElementById('brush');
  var ctxb = canvasBrush.getContext('2d');

  var btnSave = document.getElementById('button__save');
  var btnClear = document.getElementById('button__clear');
  var btnSettings = document.getElementById('button__settings');
  var mousePressed = false;
  var ctrlPressed = false;

  /****** Settings ******/
  var settings = document.getElementById('settings');
  // Stroke width
  var strWidth = document.getElementById('stroke-width');
  var strWidthValue = strWidth.value;
  // First color
  var firstHue = document.getElementById('first-hue');
  var firstSaturation = document.getElementById('first-saturation');
  var firstLightness = document.getElementById('first-lightness');
  // Second color
  var secondHue = document.getElementById('second-hue');
  var secondSaturation = document.getElementById('second-saturation');
  var secondLightness = document.getElementById('second-lightness');
  // Background color
  var backgroundHue = document.getElementById('background-hue');
  var backgroundSaturation = document.getElementById('background-saturation');
  var backgroundLightness = document.getElementById('background-lightness');

  function getHSL(hue, saturation, lightness) {
    return 'hsl(' + hue.value + ', ' + saturation.value + '%, ' + lightness.value + '%)';
  }

  function setBrush() {
    firstColor = getHSL(firstHue, firstSaturation, firstLightness);
    secondColor = getHSL(secondHue, secondSaturation, secondLightness);
    strWidthValue = strWidth.value;
    brush();
  }

  settings.addEventListener('input', function(evt) {
    if (evt.target.parentNode.id === 'background-color') {
      setBackground();
    } else {
      setBrush();
    }
  });

  var canvasBgColor;
  var firstColor = getHSL(firstHue, firstSaturation, firstLightness);//'cyan';//'#0000FF';
  var secondColor = getHSL(secondHue, secondSaturation, secondLightness);//'blue';//'#FF0000';

  function init() {
  setBackground();
  brush();
  }

  window.addEventListener('keydown', function(evt) {
    if(evt.ctrlKey) {
      evt.preventDefault();
      ctrlPressed = true;
      brush();
    }
    console.log(ctrlPressed);
  });

  window.addEventListener('keyup', function(evt) {
    if(!evt.ctrlKey) {
      evt.preventDefault();
      ctrlPressed = false;
      brush();
    }
    console.log(ctrlPressed);
  });

  function setBackground() {
    canvasBgColor = getHSL(backgroundHue, backgroundSaturation, backgroundLightness);
    ctx.fillStyle = canvasBgColor;
    ctx.fillRect(0, 0, 800, 600);
    ctx.fill();
  }

  function setColors() {
    if(ctrlPressed) {
      ctxb.fillStyle = firstColor;
      ctxb.strokeStyle = secondColor;
      ctx.fillStyle = firstColor;
      ctx.strokeStyle = secondColor;
    } else {
      ctxb.fillStyle = secondColor;
      ctxb.strokeStyle = firstColor;
      ctx.fillStyle = secondColor;
      ctx.strokeStyle = firstColor;
    }
  }

  function brush() {
    ctxb.fillStyle = '#FFFFFF';
    ctxb.fillRect(0, 0, 100, 100);
    ctxb.fill();
    setColors();
    ctxb.lineWidth = strWidthValue;
    ctxb.arc(50, 50, 25, 0, 2 * Math.PI);
    ctxb.stroke();
    ctxb.fill();
  }

  function draw(mouseX, mouseY) {
    ctx.beginPath();
    setColors();
    ctx.lineWidth = strWidthValue;
    ctx.arc(mouseX, mouseY, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  window.addEventListener('mousedown', function(evt) {
    mousePressed = true;
  });

  window.addEventListener('mouseup', function(evt) {
    mousePressed = false;
  });

  canvas.addEventListener('mousemove', function(evt) {
    if(mousePressed) {
    var mouseX = evt.offsetX;
    var mouseY = evt.offsetY;
    draw(mouseX, mouseY);
    }
  });

  // Save to PNG
  btnSave.addEventListener('click', function() {
    this.href = canvas.toDataURL();
    this.download = 'canvase.png';
    console.log(this);
  }, false);

  //Clear the canvas
  btnClear.addEventListener('click', setBackground, false);

  //Show and hide #settings
  btnSettings.addEventListener('click', function() {
    settings.classList.toggle('settings--hidden');

  }, false);

  init();
};

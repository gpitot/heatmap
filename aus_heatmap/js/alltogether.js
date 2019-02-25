"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(canvas, detectCanvas, map, mapimg, detectmapImg) {
    var _this = this;

    _classCallCheck(this, Canvas);

    this.canvas = canvas;

    if (mapimg.complete) {
      this.canvas.width = mapimg.width;
      this.canvas.height = mapimg.height;
    }

    mapimg.onload = function () {
      _this.canvas.width = mapimg.width;
      _this.canvas.height = mapimg.height;
    };

    this.ctx = canvas.getContext('2d');
    this.detectCanvas = detectCanvas;
    this.detectCtx = detectCanvas.getContext('2d');
    this.map = map;
    this.mouseMove = this.mouseMove.bind(this);
    this.drawHighlights = this.drawHighlights.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
    this.map.drawHighlights = this.drawHighlights;
    detectMapImageLoaded = detectMapImageLoaded.bind(this);

    if (detectmapImg.complete) {
      detectMapImageLoaded();
    }

    detectmapImg.onload = function () {
      detectMapImageLoaded();
    };

    function detectMapImageLoaded() {
      this.detectCanvas.width = detectmapImg.width;
      this.detectCanvas.height = detectmapImg.height;
      this.origin = {
        x: this.canvas.getBoundingClientRect().x,
        y: this.canvas.getBoundingClientRect().y //detectmapImg.style.display = "none";

      };
      this.detectCtx.drawImage(detectmapImg, 0, 0, this.detectCanvas.width, this.detectCanvas.height);
      this.canvas.addEventListener('mousemove', this.mouseMove);
      this.canvas.addEventListener('click', this.mouseMove);
    }
  }

  _createClass(Canvas, [{
    key: "mouseClick",
    value: function mouseClick(e) {
      /*
      const pos = {
          x : e.clientX - this.origin.x,
          y : e.clientY - this.origin.y
      }
      const xPercent = (e.clientX - this.origin.x) / 9;
      const yPercent = (e.clientY - this.origin.y) / 9;
      */
      var pos = {
        x: e.clientX - this.canvas.getBoundingClientRect().left,
        y: e.clientY - this.canvas.getBoundingClientRect().top
      };
      var data = this.detectCtx.getImageData(pos.x, pos.y, 1, 1).data;
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      //give map coords of mouseover relative to 0 , 0
      var pos = {
        x: e.clientX - this.canvas.getBoundingClientRect().left,
        y: e.clientY - this.canvas.getBoundingClientRect().top //send data of color of detect map

      };
      var rgb = this.detectCtx.getImageData(pos.x, pos.y, 1, 1).data.slice(0, 3).join('');
      this.map.mouseMove(rgb);
    }
  }, {
    key: "drawHighlights",
    value: function drawHighlights(state) {
      //clear canvas
      var ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (state !== null) {
        ctx.drawImage(state.image, 0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }]);

  return Canvas;
}();

var Map =
/*#__PURE__*/
function () {
  function Map(data, sign, dimensions) {
    var _this2 = this;

    _classCallCheck(this, Map);

    //data is coords and heat,
    //sign is heat of current mouse pos
    this.current = null;
    this.data = data;
    this.sign = sign;
    this.dimensions = dimensions;
    this.data.forEach(function (d) {
      d.color = _this2.getColorFromTemp(d.temp);
      d.image = _this2.loadImages(d);
    });
  }

  _createClass(Map, [{
    key: "getColorFromTemp",
    value: function getColorFromTemp(temp) {
      //max temp for now is 80
      return 255 - Math.ceil(255 * (temp / 60));
    }
  }, {
    key: "loadImages",
    value: function loadImages(state) {
      var image = new Image();
      image.src = state.src;
      return image;
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(rgb) {
      var closest = this.getState(rgb);

      if (closest !== this.current) {
        this.current = closest;
        this.updateSign();

        if (this.current === null || this.current.image.complete) {
          this.drawHighlights(this.current);
        }
      }
    }
  }, {
    key: "getState",
    value: function getState(rgb) {
      //gets state of current pos
      var data = this.data;

      for (var i = 0; i < data.length; i++) {
        var _c = data[i].detectColor;
        if (rgb === _c) return data[i];
      }

      return null;
    }
  }, {
    key: "getClosestCity",
    value: function getClosestCity(coord) {
      var closest = null;
      var closestDist = null;
      var data = this.data;

      for (var i = 0; i < data.length; i++) {
        var _c2 = data[i].coords;
        var xDist = Math.abs(coord.x - _c2.x);
        var yDist = Math.abs(coord.y - _c2.y);

        if (xDist < 20 && yDist < 20) {
          if (closestDist > xDist + yDist || closestDist === null) {
            closest = data[i];
            closestDist = xDist + yDist;
          }
        }
      }

      return closest;
    }
  }, {
    key: "updateSign",
    value: function updateSign() {
      if (this.current === null) {
        this.sign.getElementsByClassName('.temp').innerHTML = '';
        this.sign.getElementsByClassName('.city').innerHTML = '';
        return;
      }

      this.sign.style.background = "rgb(".concat(this.current.color, ", 0, 0)"); //this.sign.style.background = `rgb(240, 0, 0)`;

      this.sign.getElementsByClassName('temp')[0].innerHTML = this.current.temp + '&deg; C';
      this.sign.getElementsByClassName('city')[0].innerHTML = this.current.city;
    }
  }]);

  return Map;
}();
/*
Sydney 43.4
Canberra 41.6
Melbourne 42.8
Adelaide 46.6
Perth 402.1   
Darwin 34.5
Alice Springs 45.6    
Townsville 39.3
Hobart 37.9   
Brisbane 34.8
*/
///data 


var states = [{
  detectColor: '10000',
  state: 'wa',
  city: 'Perth',
  temp: 42.1,
  src: 'images/wa.png'
}, {
  detectColor: '00200',
  state: 'nt',
  city: 'Darwin',
  temp: 34.5,
  coords_percent: {
    x1: 38.7,
    y1: 3.3,
    x2: 62,
    y2: 45.3
  },
  src: 'images/nt.png'
}, {
  detectColor: '20000',
  state: 'sa',
  city: 'Adelaide',
  temp: 46.6,
  src: 'images/sa.png'
}, {
  detectColor: '2001000',
  state: 'qld',
  city: 'Brisbane',
  temp: 34.8,
  src: 'images/qld.png'
}, {
  detectColor: '00100',
  state: 'nsw',
  city: 'Sydney',
  temp: 43.4,
  src: 'images/nsw.png'
}, {
  detectColor: '02000',
  state: 'tas',
  city: 'Hobart',
  temp: 37.9,
  src: 'images/tas.png'
}, {
  detectColor: '01000',
  state: 'vic',
  city: 'Melbourne',
  temp: 42.8,
  src: 'images/vic.png'
}, {
  detectColor: '2550200',
  state: 'act',
  city: 'Canberra',
  temp: 42.8,
  src: 'images/act.png'
}];
console.log('[map] load');
var c = document.getElementById('heatmap');
var d = document.getElementById('detect-heatmap');
var sign = document.getElementById("sign");
var map = new Map(states, sign, {
  width: mapimg.width,
  height: mapimg.height
});
var canvas = new Canvas(c, d, map, document.getElementById('mapimg'), document.getElementById('detect-mapimg'));
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
    console.log('BEGIN LOAD');

    if (mapimg.complete) {
      this.canvas.width = mapimg.width;
      this.canvas.height = mapimg.height;
      console.log('MAP IMAGE COMPLETE');
    }

    mapimg.onload = function () {
      _this.canvas.width = mapimg.width;
      _this.canvas.height = mapimg.height;
      console.log('MAP IMAGE LOADED');
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
      console.log('DETECT IMAGE DIMENSIONS - ', detectmapImg.width, detectmapImg.height);
      setTimeout(function () {
        console.log('DELAYED DETECT IMAGE DIMENSIONS - ', detectmapImg.width, detectmapImg.height);
      }, 50);
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
      console.log('mouse pos', e.clientX, e.clientY);
      var pos = {
        x: e.clientX - this.canvas.getBoundingClientRect().left,
        y: e.clientY - this.canvas.getBoundingClientRect().top
      };
      var data = this.detectCtx.getImageData(pos.x, pos.y, 1, 1).data;
      console.log(data[0], data[1], data[2]);
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
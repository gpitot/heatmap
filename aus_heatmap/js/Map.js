"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Map =
/*#__PURE__*/
function () {
  function Map(data, sign, dimensions) {
    var _this = this;

    _classCallCheck(this, Map);

    //data is coords and heat,
    //sign is heat of current mouse pos
    this.current = null;
    this.data = data;
    this.sign = sign;
    this.dimensions = dimensions;
    this.data.forEach(function (d) {
      d.color = _this.getColorFromTemp(d.temp);
      d.image = _this.loadImages(d);
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
        var c = data[i].detectColor;
        if (rgb === c) return data[i];
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
        var c = data[i].coords;
        var xDist = Math.abs(coord.x - c.x);
        var yDist = Math.abs(coord.y - c.y);

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

      this.sign.getElementsByClassName('temp')[0].innerHTML = this.current.temp;
      this.sign.getElementsByClassName('city')[0].innerHTML = this.current.city;
    }
  }]);

  return Map;
}();
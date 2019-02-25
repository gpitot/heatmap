"use strict";

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
console.log('load');
var c = document.getElementById('heatmap');
var d = document.getElementById('detect-heatmap');
var sign = document.getElementById("sign");
var map = new Map(states, sign, {
  width: mapimg.width,
  height: mapimg.height
});
var canvas = new Canvas(c, d, map, document.getElementById('mapimg'), document.getElementById('detect-mapimg'));
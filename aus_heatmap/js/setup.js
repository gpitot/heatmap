const c = document.getElementById('heatmap');

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
const states = [
    {
        state : 'wa',
        city : 'Perth',
        temp : 42.1,
        coords_percent : {
            x1 : 0,
            y1: 11.6,
            x2 : 38.6, 
            y2: 73
        },
        src : 'redmap.jpg'
    },

    {
        state : 'nt',
        city : 'Darwin',
        temp : 34.5,
        coords_percent : {
            x1 : 38.7,
            y1: 3.3,
            x2 : 62, 
            y2: 45.3
        },
        src : 'redmap.png'
    },

    {
        state : 'sa',
        city : 'Adelaide',
        temp : 46.6,
        coords_percent : {
            x1 : 38.7,
            y1: 45.4,
            x2 : 67.5, 
            y2: 79.3
        },
        src : 'ausmap.jpg'
    },

    {
        state : 'qld',
        city : 'Brisbane',
        temp : 34.8,
        coords_percent : {
            x1 : 63,
            y1: 2.6,
            x2 : 100, 
            y2: 55
        }
    },

    {
        state : 'nsw',
        city : 'Sydney',
        temp : 43.4,
        coords_percent : {
            x1 : 69,
            y1: 54,
            x2 : 100, 
            y2: 80
        }
    },

    {
        state : 'tas',
        city : 'Hobart',
        temp : 37.9,
        coords_percent : {
            x1 : 73,
            y1: 84,
            x2 : 83, 
            y2: 95
        }
    }
]


const sign = document.getElementById("sign");

const map = new Map(states, sign, {width: mapimg.width, height:mapimg.height});
const canvas = new Canvas(c, map, document.getElementById('mapimg'));
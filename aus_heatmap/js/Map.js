class Map {
    constructor(data, sign, dimensions) {
        //data is coords and heat,
        //sign is heat of current mouse pos
        this.current = null;
        this.data = data;
        this.sign = sign;
        this.dimensions = dimensions;

        this.setUpRealSizes = this.setUpRealSizes.bind(this);

        this.data.forEach((d)=>{
            d.color = this.getColorFromTemp(d.temp);
            d.coords = this.setUpRealSizes(d);
            d.image = this.loadImages(d);
        });
    }

    setUpRealSizes(state) {
        const {x1, y1, x2, y2} = state.coords_percent;
        return {
            x1 : (x1 / 100) * this.dimensions.width,
            y1 : (y1 / 100) * this.dimensions.height,
            x2 : (x2 / 100) * this.dimensions.width,
            y2 : (y2 / 100) * this.dimensions.width
        }

    }
    getColorFromTemp(temp) {
        //max temp for now is 80
        return 255 - Math.ceil(255 * (temp / 60));
    }

    loadImages(state) {
        const image = new Image();
        image.src = state.src;
        return image;
    }
    


    mouseMove(coord) {
        const closest = this.getState(coord);
        if (closest !== this.current && closest !== null) {
            this.current = closest;
            this.updateSign();

            if (this.current.image.complete) {
                console.log('COMPLETE');
                this.drawHighlights(this.current);
            }
            
        }
    }


    getState(coord) {
        //gets state of current pos
        const data = this.data;
        for (let i=0;i<data.length;i++) {
            let c = data[i].coords;
            if (coord.x >= c.x1 && coord.x <= c.x2 && coord.y >= c.y1 && coord.y <= c.y2) {
                return data[i];
            }
        }
        return null;
    }

    getClosestCity(coord) {
        let closest = null;
        let closestDist = null;
        const data = this.data;
        for (let i=0;i<data.length;i++) {
            let c = data[i].coords;
            let xDist = Math.abs(coord.x - c.x);
            let yDist = Math.abs(coord.y - c.y);
            if (xDist < 20 && yDist < 20) {
                if (closestDist > (xDist + yDist) || closestDist === null) {
                    closest = data[i];
                    closestDist = xDist + yDist;
                }
            }
            
        }

        return closest;
    }

    


    updateSign() {
        this.sign.style.background = `rgb(${this.current.color}, 0, 0)`;
        //this.sign.style.background = `rgb(240, 0, 0)`;
        this.sign.querySelector('.temp').innerHTML = this.current.temp;
        this.sign.querySelector('.city').innerHTML = this.current.city;
    }
}
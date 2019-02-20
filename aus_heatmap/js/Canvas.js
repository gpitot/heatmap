class Canvas {
    constructor(canvas, map, mapimg) {
        this.canvas = canvas;
        this.canvas.width = mapimg.width;
        this.canvas.height = mapimg.height;
        this.ctx = canvas.getContext('2d');
        this.map = map;
        

        this.origin = {
            x : this.canvas.getBoundingClientRect().x,
            y : this.canvas.getBoundingClientRect().y
        }


        this.mouseMove = this.mouseMove.bind(this);
        this.drawHighlights = this.drawHighlights.bind(this);
        this.mouseClick = this.mouseClick.bind(this);

        this.map.drawHighlights = this.drawHighlights;

        this.canvas.addEventListener('mousemove', this.mouseMove);


        this.canvas.addEventListener('click', this.mouseClick);
    }

    mouseClick(e) {
        const xPercent = (e.clientX - this.origin.x) / 6;
        const yPercent = (e.clientY - this.origin.y) / 6;

    }


    mouseMove(e) {
        //give map coords of mouseover relative to 0 , 0
        const real = {
            x : e.clientX - this.origin.x,
            y : e.clientY - this.origin.y
        }
        this.map.mouseMove(real)
    }


    drawHighlights(state) {
        //clear canvas
        const ctx = this.ctx;
        
        ctx.drawImage(state.image, 0, 0, this.canvas.width, this.canvas.height);
    }


    
}

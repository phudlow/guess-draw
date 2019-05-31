class MarkingSurface {
    constructor(options) {
        this.options = options;

        // Init canvas
        this.canvas = document.createElement('canvas');
        this.ctx    = this.canvas.getContext('2d');
        options.height && this.canvas.setAttribute("height", options.height); 
        options.width  && this.canvas.setAttribute("width",  options.width);
        options.parentNode = options.parentNode || document.querySelector('body');
        options.parentNode.appendChild(this.canvas);

        // Assign event handers
        window.onmouseup = this.markerUp.bind(this);
        this.canvas.onmousedown = this.markerDown.bind(this);
        this.canvas.onmousemove = this.mark.bind(this);
        window.ontouchend = window.touchcancel = this.markerUp.bind(this);
        this.canvas.ontouchstart = this.markerDown.bind(this);
        this.canvas.ontouchmove = this.mark.bind(this);

        this.markerData = options.markerData || [];
        this.marking    = false;

        if (options.markerData) {
            this.applyMarkerData();
        }
    }

    applyMarkerData (data) {
        let pt;
        let newLine = false;

        data = data || this.markerData;

        while (data.length) {
            pt = data.shift();
    
            if (pt === 'markerUp') {
                newLine = true;
            }
            if (pt === 'clear') {
                this._doClear();
            }
            else if (newLine === true) {
                this.ctx.beginPath();
                this.ctx.moveTo(pt[0], pt[1]);
                newLine = false;
            }
            else {
                this.ctx.lineTo(pt[0], pt[1]);
                this.ctx.stroke();
            }
        }
    }

    clear() {
        this._doClear();
        this.markerData.push('clear');
    }

    _doClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
    }

    markerDown (e) {
        this.drawing = true;
        this.ctx.moveTo(e.offsetX, e.offsetY);
        this.markerData.push([e.offsetX, e.offsetY]);
    }
    
    markerUp (e) {
        if (this.drawing) {
            this.drawing = false;
            this.markerData.push('markerUp');
        }
    }
    
    mark (e) {
        if (!this.drawing) {
            return;
        }
        this.markerData.push([e.offsetX, e.offsetY]);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.markerData.push([e.offsetX, e.offsetY]);
    }
}

export default MarkingSurface;
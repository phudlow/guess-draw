import React, { Component } from 'react';

class MarkingSurface extends Component {
    constructor(props) {
        super(props);

        this.drawing = false;
        this.markerData = [];

        this.markerDown = this.markerDown.bind(this);
        this.markerUp   = this.markerUp.bind(this);
        this.mark       = this.mark.bind(this);
        this.clear      = this.clear.bind(this);

        // Assign event handers to window for marking done
        window.onmouseup = window.ontouchend = window.touchcancel = this.markerUp;
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext("2d");

        if (this.props.markerData) {
            this.applyMarkerData(this.props.markerData);
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
        this.ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        this.ctx.beginPath();
        this.markerData.push('clear');
    }

    markerDown (e) {
        const { offsetX, offsetY } = e.nativeEvent;
        this.drawing = true;
        this.ctx.moveTo(offsetX, offsetY);
        this.markerData.push([offsetX, offsetY]);
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
        const { offsetX, offsetY } = e.nativeEvent;
        this.markerData.push([offsetX, offsetY]);
        this.ctx.lineTo(offsetX, offsetY);
        this.ctx.stroke();
        this.markerData.push([offsetX, offsetY]);
    }

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={this.props.width}
                    height={this.props.height}
                    onMouseDown={this.markerDown}
                    onMouseMove={this.mark}
                    onTouchStart={this.markerDown}
                    onTouchMove={this.mark}
                >
                    Canvas is not supported on your device.
                </canvas>
                <br />
                <button id="clear" onClick={this.clear}>Clear</button>
            </div>
        )
    }
}

export default MarkingSurface;

import './index.scss';

import MarkingSurface from './MarkingSurface';
import testMarkerData from './testMarkerData';

let surface = new MarkingSurface({
    parentNode: document.getElementById('marking-container'),
    height: 300,
    width: 500,
    markerData: testMarkerData
});

document.getElementById('clear').onclick = surface.clear.bind(surface);
document.getElementById('draw').onclick  = surface.clear.bind(surface);
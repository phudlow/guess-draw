import React from 'react';

import MarkingSurface from './MarkingSurface';

function Game() {
    return (
        <div>
            <MarkingSurface 
                markerData={require('./testMarkerData')}
                height={300}
                width={500}
            />
        </div>
    );
}

export default Game;

import AFRAME from 'aframe';

AFRAME.registerPrimitive('a-wall', {
    defaultComponents: {
        geometry: {
            primitive: 'plane',
            width: 20,
            height: 5
        },
        position: { x: 0, y: 1, z: -3},
        material: {
            color: 'yellow'
        },
        rotation: {
            x: -90,
            y: 0,
            z: 0
        },
        repeat: false
    },

    // Defined mappings from HTML attributes to component properties (using dots as delimiters).
    // If we set `depth="5"` in HTML, then the primitive will automatically set `geometry="depth: 5"`.
    mappings: {
        depth: 'geometry.depth',
        height: 'geometry.height',
        width: 'geometry.width'
    }

});
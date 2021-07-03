import AFRAME from 'aframe';

AFRAME.registerPrimitive('a-sun', {
    defaultComponents: {
        geometry: {primitive: 'sphere'},
        position: { x: 0, y: 1, z: -3},
        material: {
            color: 'yellow'
        },
        animation: {
            property: 'rotation',
            to: {
                y: 360
            },
            dur: 10 * 1000,
            loop: true,
            easing: 'linear'
        }
    },

    // Defined mappings from HTML attributes to component properties (using dots as delimiters).
    // If we set `depth="5"` in HTML, then the primitive will automatically set `geometry="depth: 5"`.
    mappings: {
        depth: 'geometry.depth',
        height: 'geometry.height',
        width: 'geometry.width'
    }

});
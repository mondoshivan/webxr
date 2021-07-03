import * as _ from 'lodash';
// import './styles/style.css';

// elements
import './elements/sun'

// systems
import './scripts/system'

// components
import './scripts/color-class';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

function aScene() {
    return document.createElement('a-scene');
}

document.body.appendChild(aScene());





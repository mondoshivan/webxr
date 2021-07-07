import * as _ from 'lodash';
// import './styles/style.css';

// elements
import './elements/sun'

// systems
import './scripts/system'

// components
import './scripts/color-class';

// assets
import { Models }  from './models/models';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

function aAssets() {
    const element = document.createElement('a-assets');
    const assets = new Models();
    for (let asset of assets.get()) {
        let assetElement = document.createElement('a-assets-item');
        assetElement.setAttribute('id', asset.id);
        assetElement.setAttribute('src', asset.src);
        element.appendChild(assetElement);
    }
    return element;

}

function aScene() {
    const element = document.createElement('a-scene');
    element.appendChild(aAssets());
    return element;
}

document.body.appendChild(aScene());





import * as _ from 'lodash';
// import './styles/style.css';

// elements
import './elements/sun'
import './elements/wall'

// systems
import './scripts/system'

// components
import './scripts/color-class';

// assets
import {Models, ModelType} from './models/models';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

function aAssetsItem(id: string, src: string) : HTMLElement {
    let assetElement = document.createElement('a-assets-item');
    assetElement.setAttribute('id', id);
    assetElement.setAttribute('src', src);
    return assetElement;
}

function aAssets() : HTMLElement {
    const element = document.createElement('a-assets');
    const models = new Models();
    for (let model of models.get()) {
        if (model.type === ModelType.GLTF && model.id && model.src) {
            element.appendChild(aAssetsItem(model.id, model.src));
        }
    }
    return element;

}

function aScene() : HTMLElement {
    const element = document.createElement('a-scene');
    element.appendChild(aAssets());
    return element;
}

document.body.appendChild(aScene());





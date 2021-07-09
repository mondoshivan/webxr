// import * as _ from 'lodash';
// import './styles/style.css';

// components
import './components/hero';
import './components/wall';
import './components/room';

// systems
import './systems/init'

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
    // const models = new Models();
    // for (let model of models.get()) {
    //     if (model.type === ModelType.GLTF && model.src) {
    //         element.appendChild(aAssetsItem(model.id, model.src));
    //     }
    // }
    return element;

}

function aScene() : HTMLElement {
    const element = document.createElement('a-scene');
    element.appendChild(aAssets());
    return element;
}

document.body.appendChild(aScene());
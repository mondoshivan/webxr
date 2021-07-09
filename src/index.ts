// import * as _ from 'lodash';
// import './styles/style.css';

// assets
// import {Models, ModelType} from './models/models';

// elements
// import './elements/sun'
// import './elements/wall'

// components
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

// import * as THREE from 'three';
//
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
//
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
//
// camera.position.z = 5;
//
// function animate() {
//     requestAnimationFrame( animate );
//
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//
//     renderer.render( scene, camera );
// }
// animate();
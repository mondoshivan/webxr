import * as _ from 'lodash';
// import './styles/style.css';
// import Icon from './images/icon.png';
import './scripts/color-class';

function aScene() {
    const aScene = document.createElement('a-scene');
    const box = document.createElement('a-box');
    box.setAttribute("position", "0 0 -3");
    box.setAttribute("color", "red");
    box.setAttribute("color-component", "");
    aScene.appendChild(box);
    return aScene;
}

document.body.appendChild(aScene());

import {BaseSystem, system} from "aframe-typescript-class-components";
import {Schema} from "aframe";
import SkyImage from '../images/nasa-space.jpg';
import { Models, ModelType  }  from '../models/models';

export interface SystemData {
    color: string;
}

@system("first-system")
export class System extends BaseSystem<SystemData> {

    static schema: Schema<SystemData> = {
        color: {type: "string", default: "blue"}
    };

    init(): void {
        console.log('init system');

        const el = this.el;


        // sky image
        const skyImageEl = new Image();
        skyImageEl.setAttribute('id', 'sky');
        skyImageEl.src = SkyImage;
        skyImageEl.crossOrigin = 'anonymous';

        // a-sky
        const aSky = document.createElement('a-sky');
        aSky.setAttribute('color', '#FFFFFF');
        aSky.setAttribute('src', SkyImage);

        const skyAnimationParams = {
            property: 'rotation',
            to: {
                y: 360
            },
            dur: 60 * 1000,
            loop: true,
            easing: 'linear'
        };

        aSky.setAttribute('animation', skyAnimationParams);

        // sun
        const sun = document.createElement('a-sun');
        sun.object3D.position.set(0, 1, -3);

        // models
        const assets = new Models();
        for (let model of assets.get()) {
            if (model.type == ModelType.GLTF) {
                const modelElement = document.createElement('a-gltf-model');
                modelElement.setAttribute('src', `#${model.id}`);
                modelElement.object3D.position.set(2, 0, -3);
                el.sceneEl?.appendChild(modelElement);
            }
        }

        // moon
        const moon = document.createElement('a-sphere');
        moon.setAttribute('material', 'color: green');
        moon.object3D.scale.set(0.5, 0.5, 0.5);
        moon.object3D.position.set(5, 0, 0);

        // append
        sun.appendChild(moon);
        el.sceneEl?.appendChild(sun);
        el.sceneEl?.appendChild(aSky);
    }

}
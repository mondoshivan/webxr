import {BaseSystem, system} from "aframe-typescript-class-components";
import {Schema} from "aframe";
import SkyImage from '../images/nasa-space.jpg';
import { Models, Model  }  from '../models/models';
import * as AFRAME from 'aframe';
const {THREE} = AFRAME;

export interface SystemData {
    color: string;
}

@system("first-system")
export class System extends BaseSystem<SystemData> {

    // static schema: Schema<SystemData> = {
    //     color: {type: "string", default: "blue"}
    // };

    createEntity(model: Model): HTMLElement {
        const modelElement = document.createElement(`a-${model.type}`);

        if (model.children.length > 0) {
            for (const child of model.children) {
                modelElement.appendChild(this.createEntity(child));
            }
        }

        //if (model.id)
        //    modelElement.setAttribute('src', `#${model.id}`);

        modelElement.setAttribute('id', model.id);

        modelElement.object3D.position.set(model.position.y, model.position.y, model.position.y);
        modelElement.object3D.rotation.set(model.rotation.x, model.rotation.y, model.rotation.z);

        modelElement.setAttribute('geometry', `width: ${model.geometry.width}; height: ${model.geometry.height}, depth: ${model.geometry.depth}`);

        if (model.material?.color)
            modelElement.setAttribute('material', 'color', model.material.color);

        if (model.material?.side)
            modelElement.setAttribute('material', 'side', model.material.side);

        if (model.components) {
            for (const component of model.components) {
                modelElement.setAttribute(component, '');
            }
        }

        model.setHtmlElement(modelElement);
        return modelElement;
    }

    addModels(): void {
        const el = this.el;
        const models = new Models();
        for (let model of models.get()) {
            const modelElement = this.createEntity(model);
            el.sceneEl?.appendChild(modelElement);
        }
    }

    addPrimitives(): void {
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

    threeD() : void {
        // Create geometry.
        const geometry = new THREE.BoxBufferGeometry(1, 1, 1);

        // Create material.
        const material = new THREE.MeshStandardMaterial({color: 'green'});

        // Create mesh.
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(-5, 0, -5);

        // Set mesh on entity.
        this.el.sceneEl?.setObject3D('hurz', mesh);
    }

    addWalls(): void {
        const el = this.el;
        const wall = document.createElement('a-wall');
        wall.object3D.position.set(0, 1, -3);
        el.sceneEl?.appendChild(wall);
    }

    init(): void {
        // this.addModels();
        // this.addPrimitives();
        // this.addWalls();
        this.threeD();
    }

}
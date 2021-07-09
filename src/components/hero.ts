import { BaseComponent, component } from "aframe-typescript-class-components";
import * as AFRAME from 'aframe';
const {THREE}  = AFRAME;

namespace WebXR {

    interface IHeroData {
        cameraPosition: {
            x: number,
            y: number,
            z: number
        }
    }

    @component("hero-component")
    export class HeroClassComponent extends BaseComponent<IHeroData> {
        static schema: AFRAME.Schema<IHeroData> = {
            cameraPosition: {type: "map", default: {x:0, y:1.6, z:0}}
        };

        init(): void {
            const data = this.data;
            const el = this.el;

            el.appendChild(this.buildCamera());
            //el.setAttribute('wasd-controls', '');

            el.addEventListener('xbuttondown',  this.accelerate);

            document.addEventListener('keydown', this.keyPress);
        }

        remove(): void {
            const el = this.el;
            el.removeEventListener('xbuttondown', this.accelerate);
            document.removeEventListener('keydown', this.keyPress);
        }

        keyPress(event: KeyboardEvent): void {
            const el = this.el;

            if (event.code === 'ArrowUp') {
                this.accelerate();
            } else if (event.code === 'ArrowLeft') {
                const x = el.object3D.rotation.x;
                const y = el.object3D.rotation.y;
                const z = THREE.MathUtils.degToRad(THREE.MathUtils.radToDeg(el.object3D.rotation.z) - 1);
                el.object3D.rotation.set(x, y, z);
            } else if (event.code === 'ArrowRight') {
                const x = el.object3D.rotation.x;
                const y = el.object3D.rotation.y;
                const z = THREE.MathUtils.degToRad(THREE.MathUtils.radToDeg(el.object3D.rotation.z) + 1);
                el.object3D.rotation.set(x, y, z);
            }
        }

        accelerate(): void {

        }

        buildCamera(): HTMLElement {
            const data = this.data;
            const element = document.createElement(`a-entity`);
            element.setAttribute('camera', {
                active: true,
                zoom: 1,
            });
            element.setAttribute('look-controls', '');
            //element.setAttribute('id', 'hero-camera');
            element.object3D.position.set(data.cameraPosition.x, data.cameraPosition.y, data.cameraPosition.z);
            return element;
        }
    }

}
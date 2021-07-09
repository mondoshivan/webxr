import {BaseSystem, system} from "aframe-typescript-class-components";
import '../components/wall';
import * as AFRAME from 'aframe';

const {THREE} = AFRAME;

namespace WebXR {

    export interface WallData {
        geometry: {
            width: number,
            height: number,
            depth: number
        };
        position: {
            x: number,
            y: number,
            z: number
        };
        rotation: {
            x: number,
            y: number,
            z: number
        };
    }

    export interface SystemData {
        color: string;
    }

    @system("webxr-system")
    export class System extends BaseSystem<SystemData> {

        static schema: AFRAME.Schema<SystemData> = {
            color: {type: "string", default: "blue"}
        };

        init(): void {
            const data = this.data;
            const el = this.el;

            el.sceneEl?.appendChild(this.buildRoom());
        }

        buildRoom() : HTMLElement {
            const modelElement = document.createElement(`a-entity`);
            modelElement.setAttribute('room-component', '');
            return modelElement;
        }

    }
}

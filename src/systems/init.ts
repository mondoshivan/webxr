import {BaseSystem, system} from "aframe-typescript-class-components";
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
            el.sceneEl?.appendChild(this.buildHero());
        }

        buildRoom(): HTMLElement {
            const element = document.createElement(`a-entity`);
            element.setAttribute('room-component', {
                geometry: {
                    width: 50,
                    height: 10,
                    depth: 50
                },
                visible: {
                    ceiling: false,
                    floor: true,
                    back: true,
                    front: true,
                    left: true,
                    right: true
                },
                position: {
                    x: 0,
                    y: -20,
                    z: -20
                }
            });
            //element.setAttribute('id', 'room');
            return element;
        }

        buildHero(): HTMLElement {
            const element = document.createElement(`a-entity`);
            element.setAttribute('hero-component', '');
            // element.setAttribute('rotation-reader-component', '');
            // element.setAttribute('id', 'hero');
            return element;
        }

    }
}

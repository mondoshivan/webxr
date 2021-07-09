import { BaseComponent, component } from "aframe-typescript-class-components";
import * as AFRAME from 'aframe';
const {THREE}  = AFRAME;
import {IWallData} from "./i_wall_data";

namespace WebXR {

    @component("wall-component")
    export class WallClassComponent extends BaseComponent<IWallData> {
        static schema: AFRAME.Schema<IWallData> = {
            material: {type: "map", default: { color: 'green'} },
            position: {type: "map", default: { x: 0, y: 0, z: -20}},
            geometry: {type: "map",  default: {width: 20, height: 10, depth: 1}},
        };

        init(): void {
            const data = this.data;
            const el = this.el;

            el.object3D.position.set(data.position.x, data.position.y, data.position.z);
            const geometry = new THREE.BoxBufferGeometry(data.geometry.width, data.geometry.height, data.geometry.depth);
            const material = new THREE.MeshStandardMaterial({color: data.material.color});
            const mesh = new THREE.Mesh(geometry, material);
            el.setObject3D('mesh', mesh);
        }
    }

}
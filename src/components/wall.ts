import { BaseComponent, component } from "aframe-typescript-class-components";
import * as AFRAME from 'aframe';
const {THREE}  = AFRAME;

namespace WebXR {

    export interface ComponentData {
        color: string;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        positionX: number;
        positionY: number;
        positionZ: number;
        width: number;
        height: number;
        depth: number;
    }

    @component("wall-component")
    export class WallClassComponent extends BaseComponent<ComponentData> {
        static schema: AFRAME.Schema<ComponentData> = {
            color: {type: "string", default: "blue"},
            rotationX: {type: "number", default: 0},
            rotationY: {type: "number", default: 0},
            rotationZ: {type: "number", default: 0},
            positionX: {type: "number", default: 0},
            positionY: {type: "number", default: -50},
            positionZ: {type: "number", default: 0},
            width: {type: "number", default: 20},
            height: {type: "number", default: 10},
            depth: {type: "number", default: 1}
        };

        init(): void {
            const data = this.data;
            const el = this.el;

            // el.setAttribute('material', 'color', data.color);

            const rotationX = THREE.MathUtils.degToRad(data.rotationX);
            const rotationY = THREE.MathUtils.degToRad(data.rotationY);
            const rotationZ = THREE.MathUtils.degToRad(data.rotationZ);
            el.object3D.position.set(data.positionX, data.positionY, data.positionZ);
            el.object3D.rotation.set(rotationX, rotationY, rotationZ);
            const geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
            const material = new THREE.MeshStandardMaterial({color: data.color});
            const mesh = new THREE.Mesh(geometry, material);
            el.setObject3D('mesh', mesh);

            // // Create geometry.
            // const geometry = new THREE.BoxBufferGeometry(0,0,0);
            //
            // // Create material.
            // const material = new THREE.MeshStandardMaterial({color: data.color});
            //
            // // Create mesh.
            // const mesh = new THREE.Mesh(geometry, material);
            //
            // // Set mesh on entity.
            // el.setObject3D('mesh', mesh);

        }
    }

}
import { BaseComponent, component } from "aframe-typescript-class-components";
import * as AFRAME from 'aframe';
const {THREE}  = AFRAME;

namespace WebXR {

    interface IRotationReaderData {

    }

    @component("rotation-reader-component")
    export class HeroClassComponent extends BaseComponent<IRotationReaderData> {
        static schema: AFRAME.Schema<IRotationReaderData> = {

        };

        init(): void {
            const data = this.data;
            const el = this.el;
        }

        tick(): void {

            // `rotation` is a three.js Euler using radians. `quaternion` also available.
            console.log(this.el.id, this.el.object3D.rotation);

            // `position` is a three.js Vector3.
            console.log(this.el.id, this.el.object3D.position);

        }

    }

}
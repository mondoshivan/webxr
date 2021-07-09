import * as AFRAME from 'aframe';
const {THREE}  = AFRAME;

export interface IWallData {
    material: {
        color: string;
    };
    geometry: {
        width: number;
        height: number;
        depth: number;
    };
    position: {
        x: number;
        y: number;
        z: number;
    };
}
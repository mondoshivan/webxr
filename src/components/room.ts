import {BaseComponent, component} from "aframe-typescript-class-components";
import * as AFRAME from 'aframe';
const { THREE } = AFRAME;


namespace WebXR {

    interface WallData {
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

    export interface ComponentData {
        width: number;
        height: number;
        depth: number;
        positionX: number;
        positionY: number;
        positionZ: number;
        rotationX: number;
        rotationY: number;
        rotationZ: number;
        wallStrength: number;
        wallComponent: string;
    }

    @component("room-component")
    export class RoomClassComponent extends BaseComponent<ComponentData> {
        static schema: AFRAME.Schema<ComponentData> = {
            width: {type: "number", default: 20},
            height: {type: "number", default: 50},
            depth: {type: "number", default: 10},
            positionX: {type: "number", default: 20},
            positionY: {type: "number", default: 0},
            positionZ: {type: "number", default: -50},
            rotationX: {type: "number", default: 0},
            rotationY: {type: "number", default: 0},
            rotationZ: {type: "number", default: 0},
            wallStrength: {type: "number", default: 2},
            wallComponent: {type: "string", default: "wall-component"}
        };

        init(): void {
            const el = this.el;
            const data = this.data;

            el.appendChild(this.buildWall(this.floorData()));
            el.appendChild(this.buildWall(this.rightWallData()));
            el.appendChild(this.buildWall(this.leftWallData()));
            el.appendChild(this.buildWall(this.backWallData()));

            el.object3D.position.set(data.positionX, data.positionY, data.positionZ);
            el.object3D.rotation.set(
                THREE.MathUtils.degToRad(data.rotationX),
                THREE.MathUtils.degToRad(data.rotationY),
                THREE.MathUtils.degToRad(data.rotationZ)
            );

        }

        floorData(): WallData {
            const data = this.data;

            return {
                geometry: {
                    width: data.width,
                    height: data.wallStrength,
                    depth: data.depth
                },
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };
        }

        rightWallData(): WallData {
            const data = this.data;

            return {
                geometry: {
                    width: data.wallStrength,
                    height: data.height,
                    depth: data.depth
                },
                position: {
                    x: data.width * 0.5 + data.wallStrength * 0.5,
                    y: data.height * 0.5 - data.wallStrength * 0.5,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };
        }

        leftWallData(): WallData {
            const data = this.data;

            return {
                geometry: {
                    width: data.wallStrength,
                    height: data.height,
                    depth: data.depth
                },
                position: {
                    x: (data.width * 0.5 + data.wallStrength * 0.5) * -1,
                    y: data.height * 0.5 - data.wallStrength * 0.5,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };
        }

        backWallData(): WallData {
            const data = this.data;

            return {
                geometry: {
                    width: data.width + data.wallStrength * 2,
                    height: data.height,
                    depth: data.wallStrength
                },
                position: {
                    x: 0,
                    y: data.height * 0.5 - data.wallStrength * 0.5,
                    z: (data.depth * 0.5 + data.wallStrength * 0.5) * -1
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };
        }

        buildWall(wall: WallData): HTMLElement {
            const data = this.data;
            const modelElement = document.createElement(`a-entity`);
            modelElement.setAttribute(data.wallComponent, {
                color: 'green',
                rotationX: wall.rotation.x,
                rotationY: wall.rotation.y,
                rotationZ: wall.rotation.z,
                positionX: wall.position.x,
                positionY: wall.position.y,
                positionZ: wall.position.z,
                width: wall.geometry.width,
                height: wall.geometry.height,
                depth: wall.geometry.depth
            });

            return modelElement;
        }
    }

}
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
        geometry: {
            width: number;
            height: number;
            depth: number;
        }
        rotation: {
            x: number;
            y: number;
            z: number;
        };
        wall: {
            strength: number,
            component: string
        };
        visible: {
            ceiling: boolean;
            floor: boolean;
            front: boolean;
            back: boolean;
            left: boolean;
            right: boolean;
        }
        position: {
            x: number;
            y: number;
            z: number;
        };
    }

    @component("room-component")
    export class RoomClassComponent extends BaseComponent<ComponentData> {
        static schema: AFRAME.Schema<ComponentData> = {
            geometry: {type: "map",  default: {width: 20, height: 20, depth: 20}},
            wall: {type: "map", default: {strength: 1, component: 'wall-component'}},
            visible: {type: "map", default: {ceiling: true, floor: true, front: true, back: true, left: true, right: true}},
            position: {type: "map", default: { x: 0, y: 0, z: -20}},
            rotation: {type: "map", default: { x: 0, y: 0, z: 0}}
        };

        init(): void {
            const el = this.el;
            const data = this.data;

            if (data.visible.floor)
                el.appendChild(this.buildWall(this.floorData()));

            if (data.visible.right)
                el.appendChild(this.buildWall(this.rightWallData()));

            if (data.visible.left)
                el.appendChild(this.buildWall(this.leftWallData()));

            if (data.visible.back)
                el.appendChild(this.buildWall(this.backWallData()));

            if (data.visible.front)
                el.appendChild(this.buildWall(this.frontWallData()));

            if (data.visible.ceiling)
                el.appendChild(this.buildWall(this.ceilingData()));

            el.object3D.position.set(data.position.x, data.position.y, data.position.z);
            el.object3D.rotation.set(
                THREE.MathUtils.degToRad(data.rotation.x),
                THREE.MathUtils.degToRad(data.rotation.y),
                THREE.MathUtils.degToRad(data.rotation.z)
            );

        }

        ceilingData(): WallData {
            const data = this.data;

            return {
                geometry: {
                    width: data.geometry.width,
                    height: data.wall.strength,
                    depth: data.geometry.depth
                },
                position: {
                    x: 0,
                    y: data.geometry.height - data.wall.strength,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };
        }

        frontWallData(): WallData {
            const data = this.data;

            return {
                geometry: {
                    width: data.geometry.width + data.wall.strength * 2,
                    height: data.geometry.height,
                    depth: data.wall.strength
                },
                position: {
                    x: 0,
                    y: data.geometry.height * 0.5 - data.wall.strength * 0.5,
                    z: data.geometry.depth * 0.5 + data.wall.strength * 0.5
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            };
        }


        floorData(): WallData {
            const data = this.data;

            return {
                geometry: {
                    width: data.geometry.width,
                    height: data.wall.strength,
                    depth: data.geometry.depth
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
                    width: data.wall.strength,
                    height: data.geometry.height,
                    depth: data.geometry.depth
                },
                position: {
                    x: data.geometry.width * 0.5 + data.wall.strength * 0.5,
                    y: data.geometry.height * 0.5 - data.wall.strength * 0.5,
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
                    width: data.wall.strength,
                    height: data.geometry.height,
                    depth: data.geometry.depth
                },
                position: {
                    x: (data.geometry.width * 0.5 + data.wall.strength * 0.5) * -1,
                    y: data.geometry.height * 0.5 - data.wall.strength * 0.5,
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
                    width: data.geometry.width + data.wall.strength* 2,
                    height: data.geometry.height,
                    depth: data.wall.strength
                },
                position: {
                    x: 0,
                    y: data.geometry.height * 0.5 - data.wall.strength * 0.5,
                    z: (data.geometry.depth * 0.5 + data.wall.strength * 0.5) * -1
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
            modelElement.setAttribute(data.wall.component, {
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
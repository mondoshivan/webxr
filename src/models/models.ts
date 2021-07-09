import WoodenCrate from './wooden_crate.glb';
import * as AFRAME from 'aframe';

export enum ModelType {
    GLTF = 'gltf-model',
    PLANE = 'plane',
    SPHERE = 'sphere',
    BOX = 'box'
}

export interface Geometry {
    width: number,
    height: number,
    depth: number
}

export interface Position {
    x: number,
    y: number,
    z: number
}

export interface Rotation {
    x: number,
    y: number,
    z: number
}

export interface Material {
    color: string,
    side?: string
}

interface Config {
    id: string,
    src?: string,
    geometry: Geometry,
    position: Position,
    type: ModelType,
    rotation: Rotation,
    material?: Material,
    components?: string[]
}

export class Model {

    readonly id: string;
    readonly src?: string;
    readonly type: ModelType;
    readonly position: Position;
    readonly rotation: Rotation;
    readonly geometry: Geometry;
    readonly material?: Material;
    readonly components: string[];
    readonly children: Model[] = [];

    private htmlElement?: HTMLElement;

    constructor(config: Config) {
        this.type = config.type;
        this.position = config.position;
        this.rotation = config.rotation;
        this.geometry = config.geometry;
        this.id = config.id;
        this.src = config.src;
        this.material = config.material;
        this.components = config.components || [] ;
    }

    public setHtmlElement(element: HTMLElement) {
        this.htmlElement = element;
    }

    public addChild(child: Model) {
        this.children.push(child);
    }
}

export class Models {

    models: Model[] = [];

    constructor() {
        // this.add(new Model ({
        //         id: "wooden-crate",
        //         src: WoodenCrate,
        //         type: ModelType.GLTF,
        //         position: {x: 3, y: 3, z: -3},
        //         rotation: {x: 0, y: 0, z: 0},
        //         geometry: {
        //             width: 5,
        //             height: 5
        //         }
        //     }
        // ));

        this.add(new Model ({
                id: 'wall',
                type: ModelType.BOX,
                position: {x: 0, y: 5, z: -5},
                rotation: {x: 0, y: 0, z: -20},
                geometry: {
                    width: 10,
                    height: 5,
                    depth: 1
                },
                material: {
                    color: 'green',
                    side: 'double'
                },
                components: ['color-component']
        }));

        const parent = new Model ({
            id: 'sun',
            type: ModelType.SPHERE,
            position: {x: -5, y: 0, z: -5},
            rotation: {x: 0, y: 0, z: -5},
            geometry: {
                width: 2,
                height: 2,
                depth: 1
            },
            material: {
                color: 'yellow'
            }
        });

        const child = new Model ({
            id: 'moon',
            type: ModelType.SPHERE,
            position: {x: 5, y: 0, z: 0},
            rotation: {x: 0, y: 5, z: 0},
            geometry: {
                width: 1,
                height: 1,
                depth: 1
            },
            material: {
                color: 'red'
            }
        });

        parent.addChild(child);
        this.add(parent);
    }

    public get(): Model[] {
        return this.models;
    }

    private add(asset: Model): this {
        this.models.push(asset);
        return this;
    }
}

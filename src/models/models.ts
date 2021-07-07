import WoodenCrate from './wooden_crate.glb';

export enum ModelType {
    GLTF = 'gltf-model',
    PLANE = 'plane'
}

export interface Geometry {
    primitive?: ModelType,
    width: number,
    height: number
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
    color: string
}

interface Config {
    id?: string,
    src?: string,
    geometry: Geometry,
    position: Position,
    type: ModelType,
    rotation: Rotation,
    material?: Material,
    components?: string[]
}

export class Model {

    readonly id?: string;
    readonly src?: string;
    readonly type: ModelType;
    readonly position: Position;
    readonly rotation: Rotation;
    readonly geometry: Geometry;
    readonly material?: Material;
    readonly components: string[];

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
}

export class Models {

    models: Model[] = [];

    constructor() {
        this.add(new Model ({
                id: "wooden-crate",
                src: WoodenCrate,
                type: ModelType.GLTF,
                position: {x: 3, y: 3, z: -3},
                rotation: {x: 0, y: 0, z: 0},
                geometry: {
                    width: 5,
                    height: 5
                }
            }
        ));
        this.add(new Model ({
                type: ModelType.PLANE,
                position: {x: 0, y: 0, z: -5},
                rotation: {x: 0, y: 0, z: 0},
                geometry: {
                    primitive: ModelType.PLANE,
                    width: 20,
                    height: 5
                },
                material: {
                    color: 'yellow'
                },
                components: ['color-component']
        }));
    }

    public get(): Model[] {
        return this.models;
    }

    private add(asset: Model): this {
        this.models.push(asset);
        return this;
    }
}

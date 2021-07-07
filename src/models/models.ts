import WoodenCrate from './wooden_crate.glb';

export enum ModelType {
    GLTF = 0
}

class Model {

    readonly id: string;
    readonly src: string;
    readonly type: ModelType;

    constructor(id: string, src: string, type: ModelType) {
      this.id = id;
      this.src = src;
      this.type = type;
    }
}

export class Models {

    assets: Model[] = [];

    constructor() {
        this.add(new Model(
            "wooden-crate",
            WoodenCrate,
            ModelType.GLTF
        ));
    }

    public get(): Model[] {
        return this.assets;
    }

    private add(asset: Model): this {
        this.assets.push(asset);
        return this;
    }
}

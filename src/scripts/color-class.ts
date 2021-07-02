import { BaseComponent, component } from "aframe-typescript-class-components";
import { Schema } from "aframe";

export interface ComponentData {
    color: string;
}

@component("color-component")
export class ColorClassComponent extends BaseComponent<ComponentData> {
    static schema: Schema<ComponentData> = {
        color: {type: "string", default: "yellow"}
    };

    init(): void {
        this.el.setAttribute("color", this.data.color);
    }
}
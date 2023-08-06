import Component from "../../../models/component";
import IComponentInitializer from "./componentInitializer.interface"

export default class ComponentInitializer implements IComponentInitializer {
    readonly totalComponents: number;

    constructor(totalComponents: number) {
        this.totalComponents = totalComponents;
    }

    initializeComponents(): Component[] {
        return Array.from({length: this.totalComponents}, () => {
            return new Component();
        })
    }
}
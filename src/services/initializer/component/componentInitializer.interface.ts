import Component from "../../../models/component";

export default interface IComponentInitializer {
    initializeComponents(): Component[];
}
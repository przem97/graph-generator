import Component from "../../../models/component";

export default interface ICoordinatesInitializer {
    initializeCoordinatesForComponent(component: Component): Component;
    initializeCoordinates(components: Component[]): Component[];
}
import Component from "../../../../models/component";

export default interface ICoordinatesInitializer {
    initializeCoordinates(components: Component[]): void;
}
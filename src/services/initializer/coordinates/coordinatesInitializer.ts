import _ from "lodash-es";
import Component from "../../../models/component";
import ICoordinatesInitializer from "./coordinatesInitializer.interface";

class CoordinatesInitializer implements ICoordinatesInitializer {
    xLowerBound: number;
    xUpperBound: number;
    yLowerBound: number;
    yUpperBound: number;

    constructor(xLowerBound: number, xUpperBound: number, yLowerBound: number, yUpperBound: number) {
        this.xLowerBound = xLowerBound;
        this.xUpperBound = xUpperBound;
        this.yLowerBound = yLowerBound;
        this.yUpperBound = yUpperBound;
    }

    initializeCoordinates(components: Component[]): void {
        for (let i = 0; i < components.length; i++) {
            for (let j = 0; j < components[i].vertices.length; j++) {
                components[i].vertices[j].x = _.round(_.random(this.xLowerBound, this.xUpperBound, true), 2);
                components[i].vertices[j].y = _.round(_.random(this.yLowerBound, this.yUpperBound, true), 2);
            }
        }
    }
}

export default CoordinatesInitializer;
import _ from "lodash";
import Vertex from "../../../models/vertex";
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

    initializeCoordinatesForComponent(component: Component): Component {
        const resultVertices: Vertex[] = [];
        for (let i = 0; i < component.vertices.length; i++) {
            const currentVertex = component.vertices[i];
            resultVertices.push(new Vertex(
                currentVertex.ordinal,
                _.round(_.random(this.xLowerBound, this.xUpperBound, true), 2),
                _.round(_.random(this.yLowerBound, this.yUpperBound, true), 2)
            ));
        }

        return new Component([ ...component.edges ], resultVertices);
    }

    initializeCoordinates(components: Component[]): Component[] {
        const resultComponents = [];

        for (let i = 0; i < components.length; i++) {
            for (let j = 0; j < components[i].vertices.length; j++) {
                resultComponents.push(this.initializeCoordinatesForComponent(components[i]));
            }
        }

        return resultComponents;
    }
}

export default CoordinatesInitializer;
import _ from "lodash";
import Edge from "../../../models/edge";
import Component from "../../../models/component";
import IComponentManager from "../../../utils/component/manager/componentManager.interface";
import IEdgeInitializer from "./edgeInitializer.interface";
import SetBasedComponentManager from "../../../utils/component/manager/setBasedComponentManager";

export default class EdgeInitializer implements IEdgeInitializer {
    readonly totalEdges: number;
    readonly edgeWeightLowerBound: number;
    readonly edgeWeightUpperBound: number;

    constructor(totalEdges: number,
                edgeWeightLowerBound: number,
                edgeWeightUpperBound: number) {
        this.totalEdges = totalEdges;
        this.edgeWeightLowerBound = edgeWeightLowerBound;
        this.edgeWeightUpperBound = edgeWeightUpperBound;
    }

    /**
     * The method for initializing edges within each of given components. If total number of edges is lesser than the least number of edges
     * necessary to initialize components, then every component is initialized with minimum number of edges (basically every component is a
     * tree). If total number of edges is greater than sum of maximum number of edges of every component then every component is initialized
     * as a complete graph.
     * @param {Array.<Component>} components - The list of components where the edges initialization have to be performed
     * @param {Number} totalEdges - Total number of edges which has to be populated within the graph
     * @returns 
     */
    initializeEdges(components: Component[]): Array<Component> {
        let currentEdges = 0
        let edgesNumber: number[] = [];

        // populate minimum number of edges necessary to create a component
        _.forEach(components, (component) => {
            let minimumEdgesNumber = component.vertices.length - 1
            currentEdges += minimumEdgesNumber
            edgesNumber.push(minimumEdgesNumber);
        })

        const remainingEdgesNumber = this.totalEdges - currentEdges
        const availableComponents = _.range(components.length).filter((index) => components[index].vertices.length > 2)
        
        // randomly populate remaining number of edges within the components
        for (let i = 0; i < remainingEdgesNumber; i += 1) {
            if (availableComponents.length <= 0) break

            // get random index of not yet fully bucket
            let randomIndex = _.random(availableComponents.length - 1)
            edgesNumber[availableComponents[randomIndex]] += 1

            let verticesNumber = components[availableComponents[randomIndex]].vertices.length
            // if bucket is full then remove it from the list of available buckets
            if (edgesNumber[availableComponents[randomIndex]] >= (verticesNumber * (verticesNumber - 1) / 2)) {
                availableComponents.splice(randomIndex, 1)
            }
        }

        const resultComponents: Component[] = [];

        // initialize edges within each component
        for (let i = 0; i < components.length; i += 1) {
            let graphManager: IComponentManager = new SetBasedComponentManager(components[i].vertices)
            
            // initialize tree in order to have complete component
            let edgesInitialized = graphManager.initializeTree()
            let size = edgesNumber[i] - edgesInitialized
            
            // add the remaining number of edges randomly
            graphManager.addRandomEdgesSize(size)
            
            resultComponents.push(new Component(graphManager.getEdges(), [ ...components[i].vertices ]));
        }

        return resultComponents;
    }

    initializeWeights(components: Array<Component>): Component[] {
        const newComponents: Component[] = [];

        for (let i = 0; i < components.length; i += 1) {
            let component = components[i];
            let edges: Edge[] = [];
            for (let j = 0; j < component.edges.length; j += 1) {
                let randomWeight = _.random(this.edgeWeightLowerBound, this.edgeWeightUpperBound, true);
                const weight = _.round(randomWeight, 2);
                edges.push(new Edge(component.edges[j].startVertex, component.edges[j].endVertex, weight));
            }

            newComponents.push(new Component(edges, [ ...component.vertices ]));
        }

        return newComponents;
    }
}
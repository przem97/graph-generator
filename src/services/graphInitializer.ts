import _ from 'lodash'
import Component from '../models/component'
import GraphManager from '../utils/graphManager'
import IGraphManager from '../utils/graphManager'
import IGraphInitializer from './graphInitializerInterface'

class GraphInitializer implements IGraphInitializer {
    initializeGraph(totalVertices: number, totalEdges: number, totalComponents: number): Array<Component> { 
        let components = this.initializeComponents(totalComponents)
        components = this.initializeVertices(components, totalVertices)
        return this.initializeEdges(components, totalEdges)
    }

    initializeComponents(totalComponents: number): Array<Component> {
        return Array.from({length: totalComponents}, () => {
            return new Component()
        })
    }

    initializeVertices(components: Array<Component>, totalVertices: number): Array<Component> {
        // populate one vertex per component
        for (let i = 0; i < components.length; i += 1) {
            components[i].vertices.push(i)
        }

        // fill components randomly with vertices
        for (let i = components.length; i < totalVertices; i += 1) {
            let componentIndex = Math.floor(Math.random() * components.length)
            components[componentIndex].vertices.push(i)
        }
        
        return components
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
    initializeEdges(components: Array<Component>, totalEdges: number): Array<Component> {
        let currentEdges = 0
        
        // populate minimum number of edges necessary to create a component
        _.forEach(components, (component) => {
            let minimumEdgesNumber = component.vertices.length - 1
            currentEdges += minimumEdgesNumber
            component.edgesNumber = minimumEdgesNumber
        })

        const remainingEdgesNumber = totalEdges - currentEdges
        const availableComponents = _.range(components.length).filter((index) => components[index].vertices.length > 2)
        
        // randomly populate remaining number of edges within the components
        for (let i = 0; i < remainingEdgesNumber; i += 1) {
            if (availableComponents.length <= 0) break

            // get random index of not yet fully bucket
            let randomIndex = _.random(availableComponents.length - 1)
            components[availableComponents[randomIndex]].edgesNumber += 1

            let verticesNumber = components[availableComponents[randomIndex]].vertices.length
            // if bucket is full then remove it from the list of available buckets
            if (components[availableComponents[randomIndex]].edgesNumber >= (verticesNumber * (verticesNumber - 1) / 2)) {
                availableComponents.splice(randomIndex, 1)
            }
        }
        
        // initialize edges within each component
        for (let i = 0; i < components.length; i += 1) {
            let graphManager: IGraphManager = new GraphManager(components[i].vertices)
            
            // initialize tree in order to have complete component
            let edgesInitialized = graphManager.initializeTree()
            let size = components[i].edgesNumber - edgesInitialized
            
            // add the remaining number of edges randomly
            graphManager.addRandomEdgesSize(size)
            
            components[i].edges = graphManager.getEdges()
        }

        return this.initializeWeights(components);
    }

    initializeWeights(components: Array<Component>): Array<Component> {
        for (let i = 0; i < components.length; i += 1) {
            let component = components[i];
            for (let j = 0; j < component.edges.length; j += 1) {
                component.edges[j].weight = _.round(_.random(0, 10, true), 2);
            }
        }

        return components;
    }
}


export default GraphInitializer
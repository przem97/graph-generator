import Edge from "./edge";
import Vertex from "./vertex";
import { Request } from "express";

class Component {
    readonly edges: Array<Edge>;
    readonly vertices: Array<Vertex>;

    constructor(edges: Edge[] = [], vertices: Vertex[] = []) {
        this.edges = edges;
        this.vertices = vertices;
    }

    isEmpty(): boolean {
        return this.edges.length === 0 && this.vertices.length === 0; 
    }

    static fromRequest(req: Request): Component {
        const graph = req.body.graph;
    
        const component: Component =  new Component();
        Object.assign(component, graph.component);
   
        return component;
    }

    static componentsFromRequest(req: Request): Component[] {
        const graph = req.body.graph;
        const components: Component[] = [];
    
        for (let i = 0; i < graph.components.length; i++) {
            const component: Component =  new Component();
            Object.assign(component, graph.components[i]);
            components.push(component);
        }
    
        return components;
    }
}

export default Component
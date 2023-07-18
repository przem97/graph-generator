import IComponentManager from "./componentManager.interface";
import SetBasedComponentManager from "./setBasedComponentManager";
import Vertex from "../../../models/vertex";
import Edge from "../../../models/edge";
import Component from "../../../models/component";
import _ from "lodash";

describe('isFull() method tests', () => {
    it('should indicate the graph with 4 vertices is full', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3)
        ]);

        componentManager.addEdge(new Edge(0, 1));
        componentManager.addEdge(new Edge(0, 2));
        componentManager.addEdge(new Edge(0, 3));
        componentManager.addEdge(new Edge(1, 2));
        componentManager.addEdge(new Edge(1, 3));
        componentManager.addEdge(new Edge(2, 3));

        // when
        
        // then
        expect(componentManager.isFull()).toBeTruthy();
    });

    it('should indicate the graph with 1 vertex is full', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([
            new Vertex(0)
        ]);
        
        // when
        
        // then
        expect(componentManager.isFull()).toBeTruthy();
    });

    it('should indicate the graph with no vertices is full', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([]);
        
        // when
        
        // then
        expect(componentManager.isFull()).toBeTruthy();
    });

    it('should indicate the graph with 2 vertices is not full', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([
            new Vertex(0),
            new Vertex(1)
        ]);
        
        // when
        
        // then
        expect(componentManager.isFull()).toBeFalsy();
    });

    it('should indicate the graph with 3 vertices is not full', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([
            new Vertex(0),
            new Vertex(1),
            new Vertex(2)
        ]);
        
        // when
        componentManager.addEdge(new Edge(0, 1));
        componentManager.addEdge(new Edge(1, 2));
        
        // then
        expect(componentManager.isFull()).toBeFalsy();
    });

    it('should indicate the graph with 5 vertices is not full', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3),
            new Vertex(4)
        ]);
        
        // when
        componentManager.addEdge(new Edge(0, 1));
        componentManager.addEdge(new Edge(2, 3));
        
        // then
        expect(componentManager.isFull()).toBeFalsy();
    });

    it('should indicate the tree graph with 6 vertices is not full', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3),
            new Vertex(4),
            new Vertex(5)
        ]);
        
        // when
        componentManager.initializeTree();
        
        // then
        expect(componentManager.isFull()).toBeFalsy();
    });
});

describe('initializeTree() method tests', () => {
    it('should initialize tree with 4 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([
            new Vertex(0),
            new Vertex(1),
            new Vertex(2),
            new Vertex(3)
        ]);
        
        // when
        componentManager.initializeTree();
        
        // then
        expect(componentManager.isFull()).toBeFalsy();
        expect(componentManager.getEdges().length).toEqual(3);
        expect(componentManager.getVertices().length).toEqual(4);
    });

    it('should initialize tree with 1 vertex', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([
            new Vertex(0)
        ]);
        
        // when
        componentManager.initializeTree();
        
        // then
        expect(componentManager.isFull()).toBeTruthy();
        expect(componentManager.getEdges().length).toEqual(0);
        expect(componentManager.getVertices().length).toEqual(1);
    });

    it('should initialize tree with 0 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([]);
        
        // when
        componentManager.initializeTree();
        
        // then
        expect(componentManager.isFull()).toBeTruthy();
        expect(componentManager.getEdges().length).toEqual(0);
        expect(componentManager.getVertices().length).toEqual(0);
    });

    it('should initialize tree with 1000 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(1000).map(n => new Vertex(n)));
        
        // when
        componentManager.initializeTree();
        
        // then
        expect(componentManager.isFull()).toBeFalsy();
        expect(componentManager.getEdges().length).toEqual(999);
        expect(componentManager.getVertices().length).toEqual(1000);
    });
});

describe('addEdge() method tests', () => {
    it('should add one edge', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(3).map(n => new Vertex(n)));
        
        // when
        componentManager.addEdge(new Edge(0, 1, 0.789));
        
        // then
        expect(componentManager.getEdges().length).toEqual(1);
        expect(componentManager.getVertices().length).toEqual(3);
        expect(componentManager.getEdges()[0].startVertex).toEqual(0);
        expect(componentManager.getEdges()[0].endVertex).toEqual(1);
        expect(componentManager.getEdges()[0].weight).toBeCloseTo(0.789);
    });

    it('should add 3 edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(3).map(n => new Vertex(n)));
        
        // when
        componentManager.addEdge(new Edge(0, 1));
        componentManager.addEdge(new Edge(0, 2));
        componentManager.addEdge(new Edge(1, 2));
        
        // then
        expect(componentManager.getEdges().length).toEqual(3);
        expect(componentManager.getVertices().length).toEqual(3);
        
        for (const edge of componentManager.getEdges()) {
            if (edge.startVertex === 0) {
                expect([1, 2]).toContain(edge.endVertex);
            } else if (edge.startVertex === 1) {
                expect(edge.endVertex).toEqual(2);
            }
        }
    });
});

describe('hasEdge() method tests', () => {
    it('should have specific edges in the graph with 3 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(3).map(n => new Vertex(n)));
        
        // when
        componentManager.addEdge(new Edge(0, 1));
        componentManager.addEdge(new Edge(1, 2));
        
        // then
        expect(componentManager.hasEdge(new Edge(0, 1))).toBeTruthy();
        expect(componentManager.hasEdge(new Edge(0, 2))).not.toBeTruthy();
        expect(componentManager.hasEdge(new Edge(1, 2))).toBeTruthy();
    });

    it('should not have specific edges in the graph with 1 vertex', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([new Vertex(0)]);
        
        // when
        
        // then
        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
                expect(componentManager.hasEdge(new Edge(i, j))).not.toBeTruthy();
            }
        }
    });

    it('should not have specific edges in the graph with 3 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(3).map(n => new Vertex(n)));
        
        // when
        componentManager.addEdge(new Edge(2, 3)); // add dummy edge
        componentManager.addEdge(new Edge(4, 2)); // add dummy edge
        
        // then
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                expect(componentManager.hasEdge(new Edge(i, j))).not.toBeTruthy();
            }
        }
    });

    it('should not have specific edges in the graph with 6 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(6).map(n => new Vertex(n)));
        
        // when
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                componentManager.addEdge(new Edge(i, j));
            }
        }
        
        // then
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                if (i !== j) {
                    expect(componentManager.hasEdge(new Edge(i, j))).toBeTruthy();
                } else {
                    expect(componentManager.hasEdge(new Edge(i, j))).not.toBeTruthy();
                }
            }
        }
    });

    it('should not have specific edges in the graph with 0 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([]);
        
        // when
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                componentManager.addEdge(new Edge(i, j));
            }
        }
        
        // then
        for (let i = 0; i < 60; i++) {
            for (let j = 0; j < 60; j++) {
                expect(componentManager.hasEdge(new Edge(i, j))).not.toBeTruthy();
            }
        }
    });
});

describe('hasVertex() method tests', () => {
    it('should have all vertices in the graph with 3 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(3).map(n => new Vertex(n)));
        
        // when

        // then
        for (let i = 0; i < 3; i++) {
            expect(componentManager.hasVertex(new Vertex(i))).toBeTruthy();
        }
    });

    it('should not have specific vertices in the graph with 1 vertex', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([new Vertex(0)]);
        
        // when
        const result = componentManager.hasVertex(new Vertex(3));
        
        // then
        expect(result).toBeFalsy();
    });

    it('should not have specific vertices in the graph with 2 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([new Vertex(0), new Vertex(3)]);
        
        // when
        const result = componentManager.hasVertex(new Vertex(2));
        
        // then
        expect(result).toBeFalsy();
    });
});

describe('removeEdge() method tests', () => {
    it('should remove edge from graph with 4 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(4).map(n => new Vertex(n)));
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                componentManager.addEdge(new Edge(i, j));
            }
        }

        // when
        componentManager.removeEdge(new Edge(2, 3));
        
        // then
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if ((i === 2 && j === 3) || (i === 3 && j == 2) || (i === j)) {
                    expect(componentManager.hasEdge(new Edge(i, j))).not.toBeTruthy();
                } else {
                    expect(componentManager.hasEdge(new Edge(i, j))).toBeTruthy();
                }
            }
        }
    });

    it('should remove all edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(4).map(n => new Vertex(n)));
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                componentManager.addEdge(new Edge(i, j));
            }
        }

        // when
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                componentManager.removeEdge(new Edge(i, j));
            }
        }

        // then
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                expect(componentManager.hasEdge(new Edge(i, j))).not.toBeTruthy();
            }
        }
    });

    test('removing non existing edge should not raise an exception', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(4).map(n => new Vertex(n)));


        // when
        componentManager.removeEdge(new Edge(2, 3));
            
        // then
        expect(componentManager.hasEdge(new Edge(2, 3))).not.toBeTruthy();    
    });
});

describe('getEdges() method tests', () => {
    it('should return no edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(4).map(n => new Vertex(n)));

        // when
        const edges = componentManager.getEdges();

        // then
        expect(edges.length).toEqual(0);    
    });

    it('should return 6 edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(7).map(n => new Vertex(n)));
        componentManager.initializeTree();
        // when
        const edges = componentManager.getEdges();

        // then
        expect(edges.length).toEqual(6);    
    });

    it('should return 2 edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(3).map(n => new Vertex(n)));
        componentManager.addEdge(new Edge(0, 1));
        componentManager.addEdge(new Edge(1, 2));

        // when
        const edges = componentManager.getEdges();

        console.log(edges);
        // then
        expect(edges.length).toEqual(2);
        for (const edge of edges) {
            if (edge.startVertex === 0) {
                expect(edge.endVertex).toEqual(1);
            } else if (edge.startVertex === 1) {
                expect(edge.endVertex).toEqual(2);
            }
        }
    });
});

describe('getVertices() method tests', () => {
    it('should return no vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager([]);

        // when
        const vertices = componentManager.getVertices();

        // then
        expect(vertices.length).toEqual(0);
    });

    it('should return 10 vertices', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(10).map(n => new Vertex(n)));

        // when
        const vertices = componentManager.getVertices();

        // then
        expect(vertices.length).toEqual(10);
    });
});

describe('addRandomEdge() method tests', () => {
    it('should add 3 edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(10).map(n => new Vertex(n)));

        // when
        componentManager.addRandomEdge();
        componentManager.addRandomEdge();
        componentManager.addRandomEdge();

        const edges = componentManager.getEdges();

        // then
        expect(edges.length).toEqual(3);
    });

    it('should add 6 edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(4).map(n => new Vertex(n)));

        // when
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                componentManager.addRandomEdge();
            }
        }

        const edges = componentManager.getEdges();

        // then
        expect(edges.length).toEqual(6);
    });
});

describe('addRandomEdgesSize() method tests', () => {
    it('should add 0 edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(6).map(n => new Vertex(n)));

        // when
        componentManager.addRandomEdgesSize(0);

        const edges = componentManager.getEdges();

        // then
        expect(edges.length).toEqual(0);
    });

    it('should add 15 edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(6).map(n => new Vertex(n)));

        // when
        componentManager.addRandomEdgesSize(15);

        const edges = componentManager.getEdges();

        // then
        expect(edges.length).toEqual(15);
    });

    it('should add 77 edges', () => {
        // given 
        const componentManager: IComponentManager = new SetBasedComponentManager(_.range(100).map(n => new Vertex(n)));

        // when
        componentManager.addRandomEdgesSize(77);

        const edges = componentManager.getEdges();

        // then
        expect(edges.length).toEqual(77);
    });
});

export const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Graph-solver API Documentation',
			version: '0.0.1'
		},
		servers: [
			{
				"url": "http://localhost:3000"
			}
		],
		tags: [
			{
				name: 'EdgesAPI',
				description: 'API for manupulating edges in the graph'
			},
			{
				name: 'GeneratorAPI',
				description: 'API for generating the graph'
			},
			{
				name: 'MergeAPI',
				description: 'API for merging components withing the graph'
			},
			{
				name: 'SplitAPI',
				description: 'API for splitting components withing the graph'
			},
			{
				name: 'VerticesAPI',
				description: 'API for manupulating vertices in the graph'
			}
		],
		components: {
			schemas: {
				edge: {
					title: 'An edge',
					type: 'object',
					properties: {
						startVertexId: {
							type: 'integer',
							description: 'id of start vertex',
							example: 3
						},
						endVertexId: {
							type: 'integer',
							description: 'id of end vertex',
							example: 2
						},
						weight: {
							type: 'number',
							format: 'double',
							description: 'weight of edge',
							example: 9.01
						}
					}
				},
				vertex: {
					title: 'A vertex',
					type: 'object',
					properties: {
						id: {
							type: 'integer',
							description: 'unique identifier',
							example: 1
						},
						x: {
							type: 'number',
							format: 'double',
							description: 'x coordinate of the vertex',
							example: 3.12
						},
						y: {
							type: 'number',
							format: 'double',
							description: 'y coordinate of the vertex',
							example: -20.22
						}
					}
				},
				edges: {
					title: 'A list of edges',
					type: 'array',
					items: {
						$ref: '#components/schemas/edge'
					}
				},
				vertices: {
					title: 'A list of vertices',
					type: 'array',
					items: {
						$ref: '#components/schemas/vertex'
					}
				},
				component: {
					title: 'A component',
					type: 'object',
					properties: {
						edges: {
							$ref: '#components/schemas/edges'
						},
						vertices: {
							$ref: '#components/schemas/vertices'
						}
					}
				},
				graph: {
					title: 'A graph',
					type: 'object',
					properties: {
						components: {
							type: 'array',
							items: {
								$ref: '#components/schemas/component'
							}
						}
					}
				}
			}
		} 
	},
	apis: ['./src/routes/*.ts'],
};
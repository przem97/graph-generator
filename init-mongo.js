db = new Mongo().getDB("graphSolverDatabase");

db.createCollection('graph', { capped: false });

db.graph.insert([
    {
		"components": [
			{
				"edges": [
					{
						"startVertex": 100,
						"endVertex": 101,
						"weight": -3.89
					},
					{
						"startVertex": 101,
						"endVertex": 102,
						"weight": -4.13
					},
					{
						"startVertex": 100,
						"endVertex": 102,
						"weight": -1.89
					}
				],
				"vertices": [
					{
						"ordinal": 100,
						"x": 9.54,
						"y": -89.43
					},
					{
						"ordinal": 101,
						"x": 9.25,
						"y": -66.22
					},
					{
						"ordinal": 102,
						"x": 9.9,
						"y": -70.61
					}
				]
			}
		]
	}
]);
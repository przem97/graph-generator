import axios, { AxiosResponse } from 'axios';
import { NodeType } from "../../../model/node";
import { ComponentType } from "../../../model/component";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NodeUtils } from "../../../model/util/nodeUtils";

type RemoveNodeThunkType = {
    targetEventNode: NodeType,
    components: ComponentType[]
}

export const removeNode = createAsyncThunk<any, RemoveNodeThunkType>(
    'removeNode',
    async ({ targetEventNode, components }, thunkApi) => {
        let vertexToRemove: NodeType | null = null;

        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            for (let j = 0; j < component.vertices.length; j++) {
                const currentVertex = component.vertices[j];

                if (NodeUtils.intersect(currentVertex, targetEventNode)) {
                    vertexToRemove = currentVertex;
                    break;
                }
            }
        }

        const response: AxiosResponse = await axios({
                    method: 'DELETE',
                    url: 'http://localhost:3010/graph/remove/vertex',
                    data: {
                        "vertex": vertexToRemove,
                        "graph": {
                            "components": components
                        }
                    }
                }); 

        if (response.status !== 200) {
            return thunkApi.rejectWithValue((response.status))
        }

        return response.data.graph.components;
    }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ComponentType } from "../../../model/component";
import axios, { AxiosResponse } from 'axios';
import Edge from "../../../model/edge";

type AddEdgeThunkType = {
    connectAccumulator: number[],
    components: ComponentType[]
}

export const addEdgeThunk = createAsyncThunk<any, AddEdgeThunkType>(
    'addEdge',
    async (payload: AddEdgeThunkType, thunkApi) => {
        const response: AxiosResponse = await axios({
            method: 'PUT',
            url: 'http://localhost:3010/graph/add/edge',
            data: {
                "edge": Edge.create(payload.connectAccumulator[0], payload.connectAccumulator[1], 1),
                "graph": {
                    "components": payload.components
                }
            }
        }); 

        if (response.status !== 200) {
            return thunkApi.rejectWithValue((response.status))
        }
        
        return response.data.graph.components;
    }
);
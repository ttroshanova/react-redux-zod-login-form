import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { z } from 'zod';
import axios from 'axios'

const dataSchema = z.object({
    results: z.array(z.object({
        name: z.string(),
        mass: z.string(),
        height: z.string(),
        hair_color: z.string(),
        skin_color: z.string()
    }))
})

type BodyData = {
    Name: string,
    Mass: string,
    Height: string,
    'Hair color': string,
    'Skin color': string
}

type TtableData = {
    headers: string[],
    body: BodyData[]
}

type ColumnsData = z.infer<typeof dataSchema>

  const setColumnsData = (data: ColumnsData["results"]): TtableData => {
    let bodyData: BodyData[] = [];
    for(const {name, mass, height, hair_color, skin_color} of data){
        bodyData.push({
            Name: name,
            Mass: mass,
            Height: height,
            'Hair color': hair_color,
            'Skin color': skin_color
        })
    }
    const columnsHeaders: string[] = []
    for(const key of Object.keys(bodyData[0])){
        columnsHeaders.push(key)
    }
    const tableData = {headers: columnsHeaders, body: bodyData}
    return tableData
  }

export const fetchData = createAsyncThunk('table/fetchData', async () => {
    const response = await axios.get('https://swapi.dev/api/people')
    const validatedData = dataSchema.safeParse(response.data)
    if(!validatedData.success) {
        console.error(validatedData.error)
        return
    } else {
        let people: ColumnsData["results"] = []
        people = validatedData.data.results;
        return setColumnsData(people)
    }
})

type TInitialState = {
    tableData: TtableData,
    status: null | string
}

const initialState: TInitialState = {
    tableData: {
        headers: [],
        body: []
    },
    status: null,
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state: TInitialState) => {
            state.status = 'pending'
        })
        builder.addCase(fetchData.fulfilled, (state: TInitialState, action) => {
                state.status = 'fulfilled'
                if(action.payload !== undefined) state.tableData = action.payload
        })
        builder.addCase(fetchData.rejected, (state: TInitialState) => {
            state.status = 'rejected'
            state.tableData = {
                headers: [],
                body: []
            }
        })
    }
})

export default tableSlice.reducer

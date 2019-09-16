import { Pagination, ActionTypes as DatatableActionTypes, Actions as DatatableActions } from './Datatable'

export interface State {
    data: any[],
    sortField: string,
    searchData: any[],
    paginated: Pagination,
    perPage: number
}

export const initialState: State = {
    data: [],
    searchData: [],
    paginated: {
        currentData: [],
        pages: [],
        lastPage: 1,
        currentPage: 1
    },
    perPage: 10,
    sortField: ""
}

enum ExtraAction { SET_DATA = 4 }

export const Actions = { ...DatatableActions, ...ExtraAction }

type ActionTypes = DatatableActionTypes | { type: ExtraAction.SET_DATA, key: any[] }

export const pagination = (currentPage: number, data: any[], perPage: number): Pagination => {
    //get page data
    const start = currentPage < 2 ? 0 : (currentPage - 1) * perPage;
    const end = (currentPage * perPage) > data.length ? data.length : currentPage * perPage;
    const currentData = [...data].slice(start, end)

    //get page numbers
    const lastPage = Math.ceil(data.length / perPage);
    const pageLength = lastPage < 6 ? lastPage : 5;
    const pageStart = currentPage < 4 ? 1 : lastPage - currentPage < 2 ? lastPage - 4 : currentPage - 2;
    var pages = Array.from({ length: pageLength }, (value, key) => key + pageStart);

    return { currentData, pages, lastPage, currentPage }
}

export const dataReducer = (state: State, action: ActionTypes): State => {
    switch (action.type) {
        case Actions.SEARCH:
            const searchData = [...state.searchData].filter(item => JSON.stringify(item).includes(action.key))
            return { ...state, data: searchData, paginated: pagination(1, searchData, state.perPage) };

        case Actions.SORT:
            const field = action.key
            const sortData = state.sortField === field ? [...state.data].reverse() : [...state.data].sort((a, b) => a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0)
            return { ...state, data: sortData, paginated: pagination(state.paginated.currentPage, sortData, state.perPage), sortField: field };

        case Actions.PAGE:
            return { ...state, paginated: pagination(action.key, state.data, state.perPage) }

        case Actions.SET_DATA:
            return { ...state, paginated: pagination(1, action.key, state.perPage), data: action.key, searchData: action.key }

        default:
            return state;
    }
}
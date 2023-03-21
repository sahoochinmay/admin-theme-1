import {REGION_END, REGION_START , FETCH_REGION , RELOAD_REGION} from '../constant/region.constant'

const initialState = {
    loading:false,
    region: [],
    reload: true
}

const regionReducer = (state = initialState , action) =>{
    const {type , payload} = action
    switch (type) {
        case REGION_START:
            return {
                ...state, loading: true
            }
        case REGION_END:
            return{
                ...state, loading: false
            }
        case FETCH_REGION:
            return {
                ...state , loading: false, region: payload
            }
        case RELOAD_REGION:
            return {
                ...state, loading : false, reload: !state.reload
            }
        default:
            return state;
    }
}

export default regionReducer;
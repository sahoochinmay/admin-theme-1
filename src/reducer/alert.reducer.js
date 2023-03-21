import {ALERT_START,ALERT_END} from '../constant/alert.constant'

const initialState = {
    flag: false,
    type: "",
    msg: ""
}

const alertReducer = (state= initialState , action) =>{
    const {type,payload} = action
    switch (type) {
        case ALERT_START:
            return {
                flag: true, type: payload.type , msg: payload.msg
            }
        case ALERT_END: 
            return {
                flag: false,type: "",msg: ""
            }
        default:
            return state;
    }

}

export default alertReducer;
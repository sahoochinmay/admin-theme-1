import {ALERT_END,ALERT_START} from '../constant/alert.constant'

export const showAlert = ({type,msg}) => dispatch =>{
    dispatch({
        type: ALERT_START,
        payload: {
            type: type,
            msg: msg
        }
    })
}
export const closeAlert = () => dispatch =>{
    dispatch({
        type: ALERT_END,
        payload: null
    })
}
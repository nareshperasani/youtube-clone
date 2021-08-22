import { SEARCHED_VIDEO_FAIL, SEARCHED_VIDEO_REQUEST, SEARCHED_VIDEO_SUCCESS } from "../ActionType";

export const searchVideosReducer = (state={
    loading: true,
    videos: []
  },
  action
  ) =>{
    const {payload, type} = action;
  
    switch(type){
      case SEARCHED_VIDEO_REQUEST:
        return{
          ...state,
          loading:true
        }
      case SEARCHED_VIDEO_SUCCESS:
        return {
          ...state,
          videos: payload,
          loading: false
        }
      case SEARCHED_VIDEO_FAIL:
        return {
          ...state,
          loading: false,
          error: payload
        }  
        default:
          return state;
    }
  }
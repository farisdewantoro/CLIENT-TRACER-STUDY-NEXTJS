import {
    QUISONER
} from '../actions/types';
import isEmpty from '../lib/is-empty';
const initialState = {
    quisoner: [],
    loading: false,
    q_jawaban:[],
    q_jawaban_lainnya:[],
    q_pertanyaan:[],
    q_user:[]
};

export default function (state = initialState, action) {

    switch (action.type) {
        case QUISONER.getAll:
            return{
                ...state,
                quisoner:action.payload.quisoner,
                loading:false
            }
        case QUISONER.loading:
            return {
                ...state,
                loading: true
            }
        case QUISONER.getAktif:
          return{
            ...state,
            loading:false,
            quisoner:action.payload.quisoner,
            q_pertanyaan:action.payload.q_pertanyaan,
            q_jawaban:action.payload.q_jawaban,
            q_jawaban_lainnya:action.payload.q_jawaban_lainnya,
            q_user:action.payload.q_user
          }

        default:
            return state;
    }
}

import * as ActionTypes from './ActionTypes'; 

export const favoritos = (state = {favoritos: []}, action) => { 
    switch (action.type) { 
        case ActionTypes.ADD_FAVORITO: 
            // Comprobamos si el excursionId ya está en el array de favoritos
            if (state.favoritos.includes(action.payload)) {
                return state;  // Si ya está, devolvemos el estado sin modificaciones
            }else{
                // Si no está, lo añadimos al array de favoritos
                return {...state, favoritos: state.favoritos.concat(action.payload)};
            }
    default: 
        return state; 

} 
};
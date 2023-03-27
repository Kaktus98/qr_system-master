/* 

export default rootReducer; 
const initialState = {
  id: null,
  role: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ID':
      return {
        ...state,
        id: action.payload,
      };
    case 'SET_ROLE':
      return {
        ...state,
        role: action.payload,
      };
    case 'RESET_ID':
      return {
        ...state,
        id: null,
      };
    case 'RESET_ROLE':
      return {
        ...state,
        role: null,
      };
    default:
      return state;
  }
};

export default rootReducer; */
const initialState = {
  id: null,
  role: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case "RESET_USER":
          return initialState
      case "SET_USER":
          return {
              id: action.id,
              role: action.role
          }
      default:
          return state;
  }
};

export default rootReducer;
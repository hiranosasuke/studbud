import {
  FETCH_MY_GROUPS
} from './actions';

const INITIAL_STATE = {
  myGroups: {
    data: [],
    isFetched: false,
    error: {
      on: false,
      message: null
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${FETCH_MY_GROUPS}_PENDING`:
      return INITIAL_STATE;
    case `${FETCH_MY_GROUPS}_FULFILLED`:
      return {
        myGroups: {
          data: action.payload,
          isFetched: true,
          error: {
            on: false,
            message: null
            }
          }
      };
    case `${FETCH_MY_GROUPS}_REJECTED`:
    return {
      myGroups: {
        data: [],
        isFetched: true,
        error: {
          on: true,
          message: 'Error when fetching my groups'
        }
      }
    };
    default:
      return state;
  }
}

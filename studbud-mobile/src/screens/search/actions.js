import { GroupApi } from "../../../constants/api";

const groupApi = new GroupApi();

// create constant for type name
export const SEARCH_GROUPS = "SEARCH_GROUPS";
export const CLEAR_SEARCH = "CLEAR_SEARCH";

// creates an action called searchGroups
// takes userid and returns an object
export const searchGroups = searchTerm => ({
  type: SEARCH_GROUPS,
  payload: groupApi.searchGroups(searchTerm)
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH
});

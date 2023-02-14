export const toggleObject = {
  isDelete: false,
  isEdit: false,
  confirmDelete: false,
  confirmEdit: false,
  userIdToDeleteOrUpdate: null,
};

export function ToggleReducer(state, action) {
  switch (action.type) {
    case "SET_ISDELETE_TRUE": {
      return {
        ...state,
        isDelete: true,
        userIdToDeleteOrUpdate: action.payload,
      };
    }
    case "SET_ISEDIT_TRUE": {
      return {
        ...state,
        isEdit: true,
        userIdToDeleteOrUpdate: action.payload,
      };
    }
    case "SET_CONFIRM_DELETE_FALSE": {
      return { ...state, userIdToDeleteOrUpdate: null, confirmDelete: false };
    }
    case "SET_CONFIRM_EDIT_FALSE": {
      return { ...state, userIdToDeleteOrUpdate: null, confirmEdit: false };
    }
    case "SET_CONFIRM_EDIT_TRUE": {
      return { ...state, confirmEdit: true, isEdit: false };
    }
    case "SET_CONFIRM_DELETE_TRUE": {
      return { ...state, confirmDelete: true, isDelete: false };
    }
    case "SET_ISDELETE_FALSE": {
      return { ...state, isDelete: false };
    }
    case "SET_ISEDIT_FALSE": {
      return { ...state, isEdit: false };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

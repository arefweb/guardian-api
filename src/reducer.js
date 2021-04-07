export const initialStore = {
  query: "iran",
  page: { currentPage: 1, totalPage: 20 },
  articles: [],
};

export function reducer(state = initialStore, action) {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: { ...state.page, currentPage: action.payload } };
    case "SET_TOTAL_PAGE":
      return { ...state, page: { ...state.page, totalPage: action.payload } };
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.payload,
      };
    case "SET_QUERY":
      return {...state, query: action.payload}

    default:
      return state;
  }
}

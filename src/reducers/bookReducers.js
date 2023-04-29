//초기 상태
import { ADD_ACCOUNT, REMOVE_ACCOUNT } from "../Actions";
import uuid from "react-native-uuid";
import "react-native-get-random-values";

const initialState = {
  accounts: [
    {
      icome: "수입",
      amount: "3000",
      classification: "고등어",
      date: "11.05",
      id: uuid.v4(),
    },
  ],
};

const bookReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT: //두번째 인수값의 type이 ADD_BOOK이면 새 books 배열을 반환
      return {
        accounts: [...state.accounts, action.account],
      };
    case REMOVE_ACCOUNT:
      const index = state.accounts.findIndex(
        (account) => account.id === action.account.id
      );
      return {
        accounts: [
          ...state.accounts.slice(0, index),
          ...state.accounts.slice(index + 1),
        ],
      };

    default: // action의 type이 일치하는 case가 없다면 기존의 state 반환
      return state;
  }
};

export default bookReducers;

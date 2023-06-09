import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./src/reducers/index.js";
import Accounts from "./src/Accounts.js";

//rootReducer 의 내용을 sotre객체로 생성
const store = createStore(rootReducer);
const [isEditing, setIsEditing] = useState(false);

export default class App extends ReactDOM.Component {
  render() {
    return (
      //Provider 컴포넌트로 감싼 Books컴포넌트 반환
      // Provider의 prop으로 store에 전달
      <Provider store={store}>
        <Accounts isEditing={isEditing} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

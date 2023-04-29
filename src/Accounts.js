import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { addAccount, removeAccount } from "./Actions";
import SelectDropdown from "react-native-select-dropdown";

const initialState = {
  income: "",
  amount: "",
  classification: "",
  date: "",
};

class Accounts extends Component {
  state = initialState;

  // key와 value 두개의 인수를 사용하는 udateInput 메서드
  // ...연산자를 이용해서 state를 업데이트
  // ...연산자는 기존의 state 키-값 쌍들을 새 state에 저장한 후
  // 새로운 키-값 쌍을 새 state에 추가
  updateInput = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  //dispatch 호출 (connect 함수의 props로 참조)
  addAccount = () => {
    this.props.dispatchAddAccount(this.state);
    this.setState(initialState);
  };

  removeAccount = (account) => {
    this.props.dispatchRemoveAccount(account);
  };

  render() {
    const { accounts } = this.props;
    const inout = ["수입", "지출"];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>가게부</Text>
        <Text>수입또는 지출 금액 분류 날짜</Text>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.accountContainer}
        >
          {accounts.map((account, index) => (
            <View style={styles.account} key={index}>
              <Text style={styles.income}>{account.income}</Text>
              <Text style={styles.income}>{account.amount}</Text>
              <Text style={styles.income}>{account.classification}</Text>
              <Text style={styles.income}>{account.date}</Text>
              <Text onPress={() => this.removeAccount(account)}>삭제</Text>
            </View>
          ))}
        </ScrollView>
        {/* 작성 폼 */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <SelectDropdown
              data={inout}
              onSelect={(selectedItem, index) => {
                this.updateInput("income", selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
            />

            <TextInput
              style={styles.inputBox}
              placeholder="금액"
              value={this.state.amount}
              onChangeText={(value) => this.updateInput("amount", value)}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="분류"
              value={this.state.classification}
              onChangeText={(value) =>
                this.updateInput("classification", value)
              }
            />
            <TextInput
              style={styles.inputBox}
              placeholder="날짜"
              value={this.state.date}
              onChangeText={(value) => this.updateInput("date", value)}
            />
          </View>
          <TouchableOpacity onPress={this.addAccount}>
            <View style={styles.submitBtn}>
              <Text style={styles.btnText}>등록</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountContainer: {
    borderTopWidth: 1,
    borderTopColor: "#bbb",
    flex: 1,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 20,
    textAlign: "center",
  },
  income: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  account: {
    flexDirection: "row",
    padding: 20,
  },
  author: {
    fontSize: 15,
    color: "#888",
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  inputBox: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 4,
    marginTop: 4,
    width: 200,
    borderRadius: 8,
    height: 34,
    paddingLeft: 10,
  },
  submitBtn: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 28,
    fontWeight: 600,
  },
});

//리덕스의 상태 객체를 인수로 전달받고 하나의 키를 포함한 객체를 반환
const mapStateToProps = (state) => ({
  accounts: state.bookReducers.accounts,
});

const mapDispatchToProps = {
  dispatchAddAccount: (account) => addAccount(account),
  dispatchRemoveAccount: (account) => removeAccount(account),
};

// connect : 값을 반환해주는 함수
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);

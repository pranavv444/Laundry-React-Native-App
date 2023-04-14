import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import store from "./store";
import StackNavigator from "./StackNavigator";
export default function App() {
  console.log("rishabh");
  return (
    <Provider store={store}>
      <StackNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // width: "45%",
    // height: "95%",

    flex: 1,
  },
});

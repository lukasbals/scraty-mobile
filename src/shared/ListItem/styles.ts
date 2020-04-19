import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    marginBottom: 8,
    backgroundColor: "dodgerblue",
  },

  boardItem: {
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 5,
  },

  text: {
    fontSize: 32,
    marginHorizontal: 10,
    alignSelf: "center",
    justifyContent: "center",
    color: "white",
  },

  buttons: {
    flexDirection: "row",
  },

  button: {
    fontSize: 32,
    paddingHorizontal: 5,
  },
});

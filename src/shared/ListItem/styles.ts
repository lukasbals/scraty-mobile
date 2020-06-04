import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    flex: 1,
    height: "100%",
    marginBottom: 10,
  },

  shownItem: {
    height: "100%",
    backgroundColor: "#60656F",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  hiddenItem: {
    height: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  text: {
    flex: 9,
    fontSize: 32,
    color: "white",
  },

  button: {
    height: "100%",
    width: 75,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonIcon: {
    fontSize: 20,
    color: "white",
  },

  arrowIcon: {
    fontSize: 40,
    color: "white",
    flex: 1,
  },
});

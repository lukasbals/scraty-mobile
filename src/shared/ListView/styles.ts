import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
  },
  emptyView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addButton: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 25,
    paddingRight: 25,
  },
});

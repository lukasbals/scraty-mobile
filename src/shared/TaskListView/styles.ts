import { StyleSheet } from "react-native";

export default StyleSheet.create({
  rowView: {
    flexDirection: "row",
  },

  columnView: {
    backgroundColor: "#60656F",
    marginTop: 8,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  taskDesc: {
    color: "white",
    fontSize: 24,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  taskPerson: {
    flex: 1,
    alignSelf: "center",
    fontSize: 24,
    paddingHorizontal: 20,
  },

  taskButtons: {
    width: "auto",
    flexDirection: "row",
  },

  button: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonIcon: {
    fontSize: 24,
    color: "white",
  },
});

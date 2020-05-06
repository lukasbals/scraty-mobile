import { StyleSheet } from "react-native";

export default StyleSheet.create({
  scene: {
    flex: 1,
  },
  area: {
    borderWidth: 1,
    borderColor: "black",
    margin: 5,
  },
  rowView: {
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnView: {
    marginVertical: 5,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  taskTitle: {
    fontSize: 24,
  },
  taskDesc: {
    fontSize: 16,
  },
  taskPerson: {
    fontSize: 20,
  },
  button: {
    fontSize: 30,
  },
  tabBar: {
    backgroundColor: "#60656F",
  },
  tabBarIndicator: {
    backgroundColor: "white",
  },
  tabBarLabel: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

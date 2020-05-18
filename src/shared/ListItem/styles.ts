import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 8,
  },

  item: {
    backgroundColor: "#60656F",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  text: {
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
});

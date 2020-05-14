import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import CommonFields from "../../models/CommonFields";
import Swipeable from "react-native-swipeable";

interface PropTypes {
  common: CommonFields;
  onClickFunc: Function | null;
  editFunc: Function | null;
  deleteFunc: Function | null;
}

const ListItem = ({ common, onClickFunc, editFunc, deleteFunc }: PropTypes) => {
  const handleOnClick = () => {
    if (typeof onClickFunc === "function") {
      onClickFunc(common.id);
    }
  };

  const handleEdit = () => {
    if (typeof editFunc === "function") {
      editFunc(common.id);
    }
  };

  const handleDelete = () => {
    if (typeof deleteFunc === "function") {
      deleteFunc(common.id);
    }
  };

  const buttons = [];

  if (editFunc) {
    buttons.push(
      <TouchableOpacity key="edit" onPress={handleEdit}>
        <View style={{ ...styles.button, backgroundColor: "#279AF1" }}>
          <AntDesign name="edit" style={styles.buttonIcon} />
        </View>
      </TouchableOpacity>
    );
  }

  if (deleteFunc) {
    buttons.push(
      <TouchableOpacity key="delete" onPress={handleDelete}>
        <View style={{ ...styles.button, backgroundColor: "#FF595E" }}>
          <AntDesign name="delete" style={styles.buttonIcon} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Swipeable rightButtons={buttons.length > 0 ? buttons : null}>
      <View style={styles.item}>
        <TouchableOpacity onPress={handleOnClick}>
          <Text style={styles.text}>{common.title}</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default ListItem;

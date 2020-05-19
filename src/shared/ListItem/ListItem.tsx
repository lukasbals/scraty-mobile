import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import CommonFields from "../../models/CommonFields";
import { SwipeRow } from "react-native-swipe-list-view";

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
    <SwipeRow
      style={styles.item}
      closeOnRowPress={true}
      rightOpenValue={-1 * buttons.length * 75}
      disableRightSwipe={true}
    >
      <View style={styles.hiddenItem}>{buttons.map((button) => button)}</View>
      <TouchableOpacity activeOpacity={1} onPress={handleOnClick}>
        <View style={styles.shownItem}>
          <Text style={styles.text}>{common.title}</Text>
        </View>
      </TouchableOpacity>
    </SwipeRow>
  );
};

export default ListItem;

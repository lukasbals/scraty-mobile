import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonFields from "../../models/CommonFields";

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

  return (
    <SafeAreaView style={styles.item}>
      <TouchableOpacity onPress={handleOnClick}>
        <View style={styles.boardItem}>
          <Text style={styles.text}>{common.title}</Text>
          <View style={styles.buttons}>
            {editFunc != null && (
              <TouchableOpacity onPress={handleEdit}>
                <AntDesign name="edit" style={styles.button} />
              </TouchableOpacity>
            )}
            {deleteFunc != null && (
              <TouchableOpacity onPress={handleDelete}>
                <AntDesign name="delete" style={styles.button} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListItem;

import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface PropTypes {
  label: String;
}

const ListItem = (props: PropTypes) => {
  return (
    <SafeAreaView style={styles.item}>
      <View style={styles.boardItem}>
        <Text style={styles.text}>{props.label}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => Alert.alert("Edit pressed")}>
            <AntDesign name="edit" style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert("Delete pressed")}>
            <AntDesign name="delete" style={styles.button} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListItem;

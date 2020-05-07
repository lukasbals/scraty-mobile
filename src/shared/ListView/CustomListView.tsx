import React from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import ListItem from "../ListItem/ListItem";
import CommonFields from "../../models/CommonFields";

interface PropTypes {
  items: CommonFields[];
  itemClickFunc: Function | null;
  addFunc: Function | null;
  editFunc: Function | null;
  deleteFunc: Function | null;
  emptyText: string | null;
}

const CustomListView = (props: PropTypes) => {
  const handleAdd = () => {
    if (typeof props.addFunc === "function") {
      props.addFunc();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {props.items.length === 0 && (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>{props.emptyText}</Text>
          <Text>To create a new one hit the + below</Text>
        </View>
      )}
      <FlatList
        style={styles.container}
        data={props.items}
        renderItem={({ item }) => (
          <ListItem
            common={item}
            onClickFunc={props.itemClickFunc}
            editFunc={props.editFunc}
            deleteFunc={props.deleteFunc}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {props.addFunc != null && (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <AntDesign name="pluscircle" size={45} color="#0CCE6B" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default CustomListView;

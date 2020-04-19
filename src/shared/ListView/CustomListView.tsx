import React from "react";
import { SafeAreaView, FlatList, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import ListItem from "../ListItem/ListItem";

interface CustomListItem {
  title: string;
  id: string;
}

const items = [
  { title: "Test 1", id: "1" },
  { title: "Test 2", id: "2" },
  { title: "Test 3", id: "3" },
  { title: "Test 4", id: "4" },
  { title: "Test 5", id: "5" },
  { title: "Test 6", id: "6" },
  { title: "Test 7", id: "7" },
  { title: "Test 8", id: "8" },
  { title: "Test 9", id: "9" },
  { title: "Test 10", id: "10" },
];

const CustomListView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.container}
        data={items}
        renderItem={({ item }) => <ListItem label={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => Alert.alert("Add pressed")}
      >
        <AntDesign name="pluscircle" size={45} color="orange" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomListView;

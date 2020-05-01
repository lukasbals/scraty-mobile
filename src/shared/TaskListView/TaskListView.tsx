import React from "react";
import { SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import styles from "../ListView/styles";
import { AntDesign } from "@expo/vector-icons";
import TaskView from "../../features/TaskScreen/TaskView";
import Task from "../../models/Task";

interface PropTypes {
  tasks: Task[];
  addFunc: Function | null;
}

const TaskListView = (props: PropTypes) => {
  const handleAdd = () => {
    if (typeof props.addFunc === "function") {
      props.addFunc();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.container}
        data={props.tasks}
        renderItem={({ item }) => <TaskView task={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      {props.addFunc != null && (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <AntDesign name="pluscircle" size={45} color="orange" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default TaskListView;

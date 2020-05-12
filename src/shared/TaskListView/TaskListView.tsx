import React from "react";
import { SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import styles from "../ListView/styles";
import { AntDesign } from "@expo/vector-icons";
import TaskView from "./TaskView";
import Task from "../../models/Task";

interface PropTypes {
  tasks: Task[];
  addFunc: Function | null;
  editFunc: Function | null;
  deleteFunc: Function | null;
  rightFunc: Function | null;
  leftFunc: Function | null;
}

const TaskListView = ({
  tasks,
  addFunc,
  editFunc,
  deleteFunc,
  rightFunc,
  leftFunc,
}: PropTypes) => {
  const handleAdd = () => {
    if (typeof addFunc === "function") {
      addFunc();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.container}
        data={tasks}
        renderItem={({ item }) => (
          <TaskView
            task={item}
            editFunc={editFunc}
            deleteFunc={deleteFunc}
            rightFunc={rightFunc}
            leftFunc={leftFunc}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {addFunc != null && (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <AntDesign name="pluscircle" size={45} color="#0CCE6B" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default TaskListView;

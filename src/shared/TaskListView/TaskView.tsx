import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import Task from "../../models/Task";
import State from "../../models/State";

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i: number) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

interface PropTypes {
  task: Task;
  editFunc: Function | null;
  deleteFunc: Function | null;
  rightFunc: Function | null;
  leftFunc: Function | null;
}

const TaskView = ({
  task,
  editFunc,
  deleteFunc,
  rightFunc,
  leftFunc,
}: PropTypes) => {
  const pColor = "#" + intToRGB(hashCode(task.user));

  const handleLeft = () => {
    if (typeof leftFunc === "function") {
      leftFunc(task.id);
    }
  };

  const handleRight = () => {
    if (typeof rightFunc === "function") {
      rightFunc(task.id);
    }
  };

  const handleEdit = () => {
    if (typeof editFunc === "function") {
      editFunc(task.id);
    }
  };

  const handleDelete = () => {
    if (typeof deleteFunc === "function") {
      deleteFunc(task.id);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.columnView}>
        <Text style={styles.taskDesc}>{task.text}</Text>
        <View style={styles.rowView}>
          <Text style={[styles.taskPerson, { color: pColor }]}>
            {task.user}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {leftFunc && (
              <TouchableOpacity
                key="left"
                onPress={handleLeft}
                disabled={task.state === State.ToDo}
              >
                <View style={[styles.button, { backgroundColor: "#DC7633" }]}>
                  <AntDesign name="left" style={styles.buttonIcon} />
                </View>
              </TouchableOpacity>
            )}
            {rightFunc && (
              <TouchableOpacity
                key="right"
                onPress={handleRight}
                disabled={task.state === State.Done}
              >
                <View style={[styles.button, { backgroundColor: "#52BE80" }]}>
                  <AntDesign name="right" style={styles.buttonIcon} />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity key="edit" onPress={handleEdit}>
              <View style={[styles.button, { backgroundColor: "#279AF1" }]}>
                <AntDesign name="edit" style={styles.buttonIcon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity key="delete" onPress={handleDelete}>
              <View style={[styles.button, { backgroundColor: "#FF595E" }]}>
                <AntDesign name="delete" style={styles.buttonIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskView;

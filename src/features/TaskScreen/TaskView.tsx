import React from "react";
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import styles from "./styles";
// eslint-disable-next-line no-unused-vars
import Task from "../../models/Task";

function hashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i: number){
    const c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

interface PropTypes {
    task:Task,
}

const TaskView = ({ task }: PropTypes) => {
    const pColor = '#' + intToRGB(hashCode(task.person));
    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.rowView}>
                <View style={styles.columnView}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskDesc}>{task.description}</Text>
                    <Text style={[styles.taskPerson, {color: pColor}]}>{task.person}</Text>
                </View>
                <View style={styles.columnView}>
                    <TouchableOpacity onPress={() => Alert.alert('Edit pressed')}>
                        <AntDesign name="edit" style={styles.button}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert('Delete pressed')}>
                        <AntDesign name="delete" style={styles.button}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default TaskView;

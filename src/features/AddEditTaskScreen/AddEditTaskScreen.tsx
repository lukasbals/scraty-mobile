import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ActivityIndicator, Text, TextInput } from "react-native";
import FormItem from "../../shared/FormItem";
import State from "../../models/State";
import styles from "../../shared/FormItem/styles";
import { StackNavigationProp } from "@react-navigation/stack";
import Board from "../../models/Board";
import Story from "../../models/Story";
import Task from "../../models/Task";

interface PropTypes {
  navigation: StackNavigationProp<any, any>;
  route: {
    params: {
      board: Board;
      story: Story;
      task: Task;
    };
  };
}

function AddTaskScreen({ navigation, route }: PropTypes) {
  const [isEdit] = useState(!!route.params.task);

  const [text, setText] = useState(isEdit ? route.params.task.text : "");
  const [user, setUser] = useState(isEdit ? route.params.task.user : "");
  const [valid, setValid] = useState(false);
  const [saving, setSaving] = useState(false);

  const validate = (t: string): void => {
    if (t !== "") {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onTextChange = (event: any): void => {
    setText(event.nativeEvent.text);
    validate(event.nativeEvent.text);
  };

  const onUserChange = (event: any): void => {
    setUser(event.nativeEvent.text);
    validate(text);
  };

  const resetForm = (): void => {
    setText("");
    setUser("");
    setValid(false);
  };

  const saveTask = (): void => {
    setSaving(true);
    let url = `${route.params.board.protocol}//${route.params.board.host}:${route.params.board.port}/api/tasks/`;
    if (isEdit) {
      url += route.params.task.id;
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        user: user,
        story_id: route.params.story.id,
        state: isEdit ? route.params.task.state : State.ToDo,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          navigation.goBack();
          resetForm();
        }
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
        console.info("Some error occured while creating a task", error);
      });
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Task text</Text>
      <TextInput
        multiline
        value={text}
        style={styles.input}
        placeholder={"Enter task text"}
        onChange={onTextChange}
      />
      <FormItem
        label="User"
        placeholder="Assign a user to the task"
        onChange={onUserChange}
        value={user}
      />
      <Button onPress={saveTask} title="Save" disabled={!valid} />
      {saving && <ActivityIndicator size="small" color="#0000ff" />}
    </SafeAreaView>
  );
}

export default AddTaskScreen;

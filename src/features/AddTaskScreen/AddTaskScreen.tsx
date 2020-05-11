import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  ActivityIndicator,
  Picker,
  Text,
  View,
  TextInput,
} from "react-native";
import FormItem from "../../shared/FormItem";
import { TaskScreenPropTypes } from "../TaskScreen/TaskScreen";
import Status from "../../models/Status";
import styles from "../../shared/FormItem/styles";

function AddTaskScreen({ navigation, route }: TaskScreenPropTypes) {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [taskState, setTaskState] = useState(route.params.taskState);
  const [taskStateName, setTaskStateName] = useState(
    Status[route.params.taskState]
  );
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
  };

  const resetForm = (): void => {
    setText("");
    setUser("");
    setValid(false);
  };

  const saveTask = (): void => {
    setSaving(true);
    fetch(
      `${route.params.board.protocol}//${route.params.board.url}/api/tasks/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          user: user,
          story_id: route.params.story.id,
          state: taskState,
        }),
      }
    )
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
      <Text style={styles.text}>Task status</Text>
      <View style={[styles.input, { padding: 0 }]}>
        <Picker
          selectedValue={taskStateName}
          onValueChange={(itemValue, itemIndex) => {
            setTaskStateName(itemValue);
            setTaskState(itemIndex);
          }}
        >
          {Object.keys(Status)
            .filter((enumKey) => typeof Status[enumKey as any] === "number")
            .map((enumKey) => {
              return (
                <Picker.Item
                  label={enumKey.toString()}
                  value={enumKey}
                  key={enumKey}
                />
              );
            })}
        </Picker>
      </View>
      <Button onPress={saveTask} title="Save" disabled={!valid} />
      {saving && <ActivityIndicator size="small" color="#0000ff" />}
    </SafeAreaView>
  );
}

export default AddTaskScreen;

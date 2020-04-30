import React, { useState } from "react";
import { TextInput, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { addBoardStart } from "../HomeScreen/slice";
import { StackNavigationProp } from "@react-navigation/stack";

interface PropTypes {
  navigation: StackNavigationProp<any, any>;
}

function AddBoardScreen({ navigation }: PropTypes) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [port, setPort] = useState("");
  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();

  const validate = (n: string, u: string, p: string) => {
    if (n !== "" && u !== "" && p !== "") {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onNameChange = (event: any) => {
    setName(event.nativeEvent.text);
    validate(event.nativeEvent.text, url, port);
  };

  const onUrlChange = (event: any) => {
    setUrl(event.nativeEvent.text);
    validate(name, event.nativeEvent.text, port);
  };

  const onPortChange = (event: any) => {
    setPort(event.nativeEvent.text);
    validate(name, url, event.nativeEvent.text);
  };

  const resetForm = () => {
    setName("");
    setUrl("");
    setPort("");
    setValid(false);
  };

  const saveBoard = () => {
    dispatch(
      addBoardStart({
        title: name,
        url: url + ":" + port,
        id: new Date().getMilliseconds(),
      })
    );
    resetForm();
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Display Name</Text>
      <TextInput
        value={name}
        style={styles.input}
        placeholder="Board name"
        onChange={onNameChange}
      />
      <Text style={styles.text}>URL</Text>
      <TextInput
        value={url}
        style={styles.input}
        placeholder="https://board.com"
        onChange={onUrlChange}
      />
      <Text style={styles.text}>Port</Text>
      <TextInput
        value={port}
        style={styles.input}
        placeholder="8080"
        onChange={onPortChange}
      />

      <Button onPress={saveBoard} title="Save" disabled={!valid} />
    </SafeAreaView>
  );
}

export default AddBoardScreen;

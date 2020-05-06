import React, { useState } from "react";
import { TextInput, Text, Button, ActivityIndicator } from "react-native";
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
  const [validating, setValidating] = useState(false);

  const dispatch = useDispatch();

  const validate = (n: string, u: string, p: string) => {
    if (n !== "" && u !== "" && p !== "") {
      setValidating(true);
      fetch(`http://${u}:${p}/api/stories/`)
        .then((res) => {
          if (res.status === 200) {
            setValid(true);
            setValidating(false);
          } else {
            setValid(false);
            setValidating(false);
          }
        })
        .catch(() => {
          setValid(false);
          setValidating(false);
        });
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
        url: `${url}:${port}`,
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
        placeholder="wwww.board.com"
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
      {validating && <ActivityIndicator size="small" color="#0000ff" />}
    </SafeAreaView>
  );
}

export default AddBoardScreen;

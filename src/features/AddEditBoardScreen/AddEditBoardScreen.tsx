import React, { useState } from "react";
import { Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { addBoardStart, updateBoardStart } from "../HomeScreen/slice";
import { StackNavigationProp } from "@react-navigation/stack";
import FormItem from "../../shared/FormItem";
import Url from "url-parse";
import Board from "../../models/Board";

interface PropTypes {
  navigation: StackNavigationProp<any, any>;
  route: {
    params: {
      board: Board;
      title: string;
    };
  };
}

const getUrl = (board: Board): string => {
  return `${board.protocol}//${board.host}`;
};

function AddEditBoardScreen({ route, navigation }: PropTypes) {
  const [isEdit] = useState(!!route.params.board);

  const [name, setName] = useState(isEdit ? route.params.board.title : "");
  const [url, setUrl] = useState(isEdit ? getUrl(route.params.board) : "");
  const [port, setPort] = useState(isEdit ? route.params.board.port : "");
  const [valid, setValid] = useState(false);
  const [validating, setValidating] = useState(false);

  const dispatch = useDispatch();

  const validate = (n: string, u: string, p: string) => {
    if (n !== "" && u !== "" && p !== "") {
      setValidating(true);
      const urlObject = new Url(u);
      fetch(`${urlObject.protocol}//${urlObject.hostname}:${p}/api/stories/`)
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
    const urlObject = new Url(url);
    if (isEdit) {
      dispatch(
        updateBoardStart({
          title: name,
          host: urlObject.hostname,
          port: port,
          protocol: urlObject.protocol,
          id: route.params.board.id,
        })
      );
    } else {
      dispatch(
        addBoardStart({
          title: name,
          host: urlObject.hostname,
          port: port,
          protocol: urlObject.protocol,
          id: new Date().getMilliseconds(),
        })
      );
    }
    resetForm();
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <FormItem
        label="Display name"
        onChange={onNameChange}
        placeholder="Enter board name"
        value={name}
      />
      <FormItem
        label="URL"
        onChange={onUrlChange}
        placeholder="http://wwww.board.com"
        value={url}
      />
      <FormItem
        label="Port"
        onChange={onPortChange}
        placeholder="8080"
        value={port}
      />
      <Button onPress={saveBoard} title="Save" disabled={!valid} />
      {validating && <ActivityIndicator size="small" color="#0000ff" />}
    </SafeAreaView>
  );
}

export default AddEditBoardScreen;

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ActivityIndicator } from "react-native";
import Board from "../../models/Board";
import { StackNavigationProp } from "@react-navigation/stack";
import FormItem from "../../shared/FormItem";
import Story from "../../models/Story";

export interface PropTypes {
  navigation: StackNavigationProp<any, any>;
  route: {
    params: {
      board: Board;
      story: Story;
      title: string;
    };
  };
}

function AddStoryScreen({ navigation, route }: PropTypes) {
  const [isEdit] = useState(!!route.params.story);

  const [title, setTitle] = useState(isEdit ? route.params.story.text : "");
  const [link, setLink] = useState(isEdit ? route.params.story.link : "");
  const [valid, setValid] = useState(false);
  const [saving, setSaving] = useState(false);

  const validate = (t: string): void => {
    if (t !== "") {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onTitleChange = (event: any): void => {
    setTitle(event.nativeEvent.text);
    validate(event.nativeEvent.text);
  };

  const onLinkChange = (event: any): void => {
    setLink(event.nativeEvent.text);
    validate(title);
  };

  const resetForm = (): void => {
    setTitle("");
    setLink("");
    setValid(false);
  };

  const saveStory = (): void => {
    setSaving(true);
    let url = `${route.params.board.protocol}//${route.params.board.host}:${route.params.board.port}/api/stories/`;
    if (isEdit) {
      url += route.params.story.id;
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: title,
        link: link,
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
        console.info("Some error occured while creating a story", error);
      });
  };

  return (
    <SafeAreaView>
      <FormItem
        label="Story title"
        placeholder="Enter story title"
        onChange={onTitleChange}
        value={title}
      />
      <FormItem
        label="Link"
        placeholder="Enter link to story"
        onChange={onLinkChange}
        value={link}
      />
      <Button onPress={saveStory} title="Save" disabled={!valid} />
      {saving && <ActivityIndicator size="small" color="#0000ff" />}
    </SafeAreaView>
  );
}

export default AddStoryScreen;

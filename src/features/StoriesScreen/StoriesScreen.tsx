import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadStoriesFromBackendStart } from "./slice";
import { getStories, getLoading } from "./selector";
import CustomListView from "../../shared/ListView";
import Story from "../../models/Story";
import Board from "../../models/Board";
import { StackNavigationProp } from "@react-navigation/stack";

export interface StoriesScreenPropTypes {
  navigation: StackNavigationProp<any, any>;
  route: {
    params: {
      board: Board;
    };
  };
}

function StoriesScreen({ route, navigation }: StoriesScreenPropTypes) {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const stories = useSelector(getStories);

  useEffect(() => {
    dispatch(loadStoriesFromBackendStart(route.params.board));
  }, []);

  if (loading || !stories) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const displayedStories = stories.map((story: Story) => {
    return {
      title: story.text,
      id: story.id,
    };
  });
  return (
    <CustomListView
      items={displayedStories}
      itemClickFunc={(id: string) =>
        navigation.push("Tasks", {
          story: stories.find((story: Story) => story.id === id),
        })
      }
      addFunc={null}
      editFunc={null}
      deleteFunc={null}
    />
  );
}

export default StoriesScreen;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadStoriesFromBackendStart,
  addStory,
  deleteStory,
  updateStory,
  loadStoriesFromBackendWithoutLoadingStart,
} from "./slice";
import { getStories, getLoading, getError } from "./selector";
import CustomListView from "../../shared/ListView";
import Story from "../../models/Story";
import Board from "../../models/Board";
import { StackNavigationProp } from "@react-navigation/stack";
import LoadingScreen from "../../shared/LoadingScreen";
import ErrorScreen from "../../shared/ErrorScreen";

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
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(loadStoriesFromBackendStart(route.params.board));
  }, []);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://${route.params.board.host}:${route.params.board.port}/websocket`
    );

    ws.onmessage = ({ data }) => {
      const jsonData = JSON.parse(data);

      if (jsonData.object_type === "story") {
        switch (jsonData.action) {
          case "added":
            dispatch(addStory(jsonData.object));
            break;
          case "deleted":
            dispatch(deleteStory(jsonData.object));
            break;
          case "updated":
            dispatch(updateStory(jsonData.object));
        }
      }
    };
    return () => ws.close();
  }, []);

  const reloadStories = () => {
    dispatch(loadStoriesFromBackendStart(route.params.board));
  };

  const deleteStoryFromList = (id: string) => {
    fetch(
      `${route.params.board.protocol}//${route.params.board.host}:${route.params.board.port}/api/stories/${id}/`,
      {
        method: "DELETE",
      }
    ).catch((error) => {
      console.info("Some error occured while deleting a story", error);
    });
  };

  if (error)
    return (
      <ErrorScreen
        retry={reloadStories}
        message="An error happened while loading the stories - please check if the backend of the board is still running"
      />
    );

  if (loading) return <LoadingScreen />;

  const displayedStories = stories.map((story: Story) => {
    return {
      title: story.text,
      id: story.id,
    };
  });
  return (
    <CustomListView
      items={displayedStories}
      itemClickFunc={(id: string) => {
        dispatch(loadStoriesFromBackendWithoutLoadingStart(route.params.board));
        navigation.push("Tasks", {
          board: route.params.board,
          story: stories.find((story: Story) => story.id === id),
        });
      }}
      addFunc={() =>
        navigation.push("AddEditStory", {
          board: route.params.board,
          story: null,
          screenTitle: "Add Story",
        })
      }
      editFunc={(id: string) =>
        navigation.push("AddEditStory", {
          board: route.params.board,
          story: stories.find((story: Story) => story.id === id),
          screenTitle: "Edit Story",
        })
      }
      deleteFunc={(id: string) => deleteStoryFromList(id)}
      emptyText="There are no stories yet"
    />
  );
}

export default StoriesScreen;

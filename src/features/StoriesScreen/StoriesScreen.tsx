import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadStoriesFromBackendStart,
  addStory,
  deleteStory,
  updateStory,
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
    const ws = new WebSocket("ws://" + route.params.board.url + "/websocket");

    ws.onmessage = ({ data }) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.object_type) {
        case "story":
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
          break;
        case "task":
          break;
      }
    };
    return () => ws.close();
  }, []);

  const reloadStories = () => {
    dispatch(loadStoriesFromBackendStart(route.params.board));
  };

  const deleteStoryFromList = (id: string) => {
    console.log("Delete: ", id);
    fetch(`http://${route.params.board.url}/api/stories/${id}/`, {
      method: "DELETE",
    }).catch((error) => {
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
      itemClickFunc={(id: string) =>
        navigation.push("Tasks", {
          story: stories.find((story: Story) => story.id === id),
        })
      }
      addFunc={() => navigation.push("AddStory", { board: route.params.board })}
      editFunc={null}
      deleteFunc={(id: string) => deleteStoryFromList(id)}
      emptyText="There are no stories yet"
    />
  );
}

export default StoriesScreen;

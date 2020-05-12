/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import styles from "./styles";
import Story from "../../models/Story";
import Status from "../../models/Status";
import Task from "../../models/Task";
import TaskListView from "../../shared/TaskListView/TaskListView";
import Board from "../../models/Board";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateTask, setTasks } from "./slice";
import { getTasks } from "./selector";
import LoadingScreen from "../../shared/LoadingScreen";
import { getStories } from "../StoriesScreen/selector";

export interface TaskScreenPropTypes {
  navigation: StackNavigationProp<any, any>;
  route: {
    params: {
      board: Board;
      story: Story;
      taskState: Status;
    };
  };
}

interface Scene {
  route: {
    key: string;
  };
}

const initialLayout = { width: Dimensions.get("window").width };

const routes = [
  { key: Status.ToDo.toString(), title: "ToDo" },
  { key: Status.InProgress.toString(), title: "In Progress" },
  { key: Status.Verify.toString(), title: "Verify" },
  { key: Status.Done.toString(), title: "Done" },
];

function TaskScreen({ route, navigation }: TaskScreenPropTypes) {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const tasks = useSelector(getTasks);
  const stories = useSelector(getStories);

  useEffect(() => {
    const newTasks = stories.find(
      (story: Story) => story.id === route.params.story.id
    ).tasks;
    dispatch(setTasks(newTasks));
  }, [stories]);

  useEffect(() => {
    const ws = new WebSocket("ws://" + route.params.board.url + "/websocket");

    ws.onmessage = ({ data }) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.object_type) {
        case "story":
          break;
        case "task":
          switch (jsonData.action) {
            case "added":
              dispatch(addTask(jsonData.object));
              break;
            case "deleted":
              dispatch(deleteTask(jsonData.object));
              break;
            case "updated":
              dispatch(updateTask(jsonData.object));
          }
          break;
      }
    };
    return () => ws.close();
  }, []);

  const addTaskFunc = () => {
    navigation.push("AddTask", {
      board: route.params.board,
      story: route.params.story,
      taskState: index,
    });
  };

  const renderScene = (scene: Scene) => {
    switch (scene.route.key) {
      case Status.ToDo.toString():
        return <TaskListView tasks={tasks} addFunc={addTaskFunc} />;
      case Status.InProgress.toString():
        return (
          <TaskListView
            tasks={tasks.filter(
              (task: Task) => task.state === Status.InProgress
            )}
            addFunc={addTaskFunc}
          />
        );
      case Status.Verify.toString():
        return (
          <TaskListView
            tasks={tasks.filter((task: Task) => task.state === Status.Verify)}
            addFunc={addTaskFunc}
          />
        );
      case Status.Done.toString():
        return (
          <TaskListView
            tasks={tasks.filter((task: Task) => task.state === Status.Done)}
            addFunc={addTaskFunc}
          />
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicator}
      labelStyle={styles.tabBarLabel}
      style={styles.tabBar}
    />
  );

  if (!tasks) return <LoadingScreen />;

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

export default TaskScreen;

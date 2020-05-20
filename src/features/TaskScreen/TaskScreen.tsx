/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import styles from "./styles";
import Story from "../../models/Story";
import State from "../../models/State";
import Task from "../../models/Task";
import TaskListView from "../../shared/TaskListView/TaskListView";
import Board from "../../models/Board";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, updateTask, setTasks } from "./slice";
import { getTasks } from "./selector";
import LoadingScreen from "../../shared/LoadingScreen";
import { getStories } from "../StoriesScreen/selector";

interface TaskScreenPropTypes {
  navigation: StackNavigationProp<any, any>;
  route: {
    params: {
      board: Board;
      story: Story;
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
  { key: State.ToDo.toString(), title: "ToDo" },
  { key: State.InProgress.toString(), title: "Doing" },
  { key: State.Verify.toString(), title: "Verify" },
  { key: State.Done.toString(), title: "Done" },
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
    const ws = new WebSocket(
      `ws://${route.params.board.host}:${route.params.board.port}/websocket`
    );

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
    navigation.push("AddEditTask", {
      board: route.params.board,
      story: route.params.story,
      screenTitle: "Add Task",
    });
  };

  const editTaskFunc = (id: number) => {
    navigation.push("AddEditTask", {
      board: route.params.board,
      story: route.params.story,
      task: tasks.find((task: Task) => task.id === id),
      screenTitle: "Edit Task",
    });
  };

  const renderScene = (scene: Scene) => {
    switch (scene.route.key) {
      case State.ToDo.toString():
        return (
          <TaskListView
            tasks={tasks.filter((task: Task) => task.state === State.ToDo)}
            addFunc={addTaskFunc}
            editFunc={(id: number) => editTaskFunc(id)}
            deleteFunc={() => alert("pressed delete button")}
            rightFunc={() => alert("pressed right button")}
            leftFunc={() => alert("pressed left button")}
          />
        );
      case State.InProgress.toString():
        return (
          <TaskListView
            tasks={tasks.filter(
              (task: Task) => task.state === State.InProgress
            )}
            addFunc={null}
            editFunc={(id: number) => editTaskFunc(id)}
            deleteFunc={() => alert("pressed delete button")}
            rightFunc={() => alert("pressed right button")}
            leftFunc={() => alert("pressed left button")}
          />
        );
      case State.Verify.toString():
        return (
          <TaskListView
            tasks={tasks.filter((task: Task) => task.state === State.Verify)}
            addFunc={null}
            editFunc={(id: number) => editTaskFunc(id)}
            deleteFunc={() => alert("pressed delete button")}
            rightFunc={() => alert("pressed right button")}
            leftFunc={() => alert("pressed left button")}
          />
        );
      case State.Done.toString():
        return (
          <TaskListView
            tasks={tasks.filter((task: Task) => task.state === State.Done)}
            addFunc={null}
            editFunc={(id: number) => editTaskFunc(id)}
            deleteFunc={() => alert("pressed delete button")}
            rightFunc={() => alert("pressed right button")}
            leftFunc={() => alert("pressed left button")}
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

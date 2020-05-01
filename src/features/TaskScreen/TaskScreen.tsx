/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import Story from "../../models/Story";
import Status from "../../models/Status";
import Task from "../../models/Task";
import TaskListView from "../../shared/TaskListView/TaskListView";

interface Props {
  tasks: Array<Task>;
}

interface Scene {
  route: {
    key: string;
  };
}

const routes = [
  { key: "ToDo", title: "ToDo" },
  { key: "InProgress", title: "In Progress" },
  { key: "Verify", title: "Verify" },
  { key: "Done", title: "Done" },
];

const ToDoRoute = ({ tasks }: Props) => (
  <TaskListView
    tasks={tasks}
    addFunc={() => alert("add task button pressed")}
  />
);

const InProgressRoute = ({ tasks }: Props) => (
  <TaskListView tasks={tasks} addFunc={null} />
);

const VerifyRoute = ({ tasks }: Props) => (
  <TaskListView tasks={tasks} addFunc={null} />
);

const DoneRoute = ({ tasks }: Props) => (
  <TaskListView tasks={tasks} addFunc={null} />
);

const initialLayout = { width: Dimensions.get("window").width };

interface PropTypes {
  route: {
    params: {
      story: Story;
    };
  };
}

function TaskScreen({ route }: PropTypes) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(route.params.story);
  }, []);

  const renderScene = (scene: Scene) => {
    switch (scene.route.key) {
      case "ToDo":
        return (
          <ToDoRoute
            tasks={route.params.story.tasks.filter(
              (task: Task) => task.state === Status.ToDo
            )}
          />
        );
      case "InProgress":
        return (
          <InProgressRoute
            tasks={route.params.story.tasks.filter(
              (task: Task) => task.state === Status.InProgress
            )}
          />
        );
      case "Verify":
        return (
          <VerifyRoute
            tasks={route.params.story.tasks.filter(
              (task: Task) => task.state === Status.Verify
            )}
          />
        );
      case "Done":
        return (
          <DoneRoute
            tasks={route.params.story.tasks.filter(
              (task: Task) => task.state === Status.Done
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

export default TaskScreen;

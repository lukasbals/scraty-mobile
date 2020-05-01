import Task from "./Task";

interface Story {
  id: string;
  text: string;
  tasks: Array<Task>
}

export default Story;

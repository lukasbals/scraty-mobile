import Task from "./Task";

interface Story {
  id: string;
  text: string;
  link: string;
  tasks: Array<Task>;
}

export default Story;

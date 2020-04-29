import CommonFields from "./CommonFields";

interface Task extends CommonFields {
  description: string;
  person: string;
}

export default Task;

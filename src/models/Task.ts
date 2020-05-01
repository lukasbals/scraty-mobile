import CommonFields from "./CommonFields";
import Status from "./Status";

interface Task extends CommonFields {
  text: string;
  user: string;
  state: Status;
}

export default Task;

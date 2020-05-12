import CommonFields from "./CommonFields";
import State from "./State";

interface Task extends CommonFields {
  text: string;
  user: string;
  state: State;
}

export default Task;

import CommonFields from "./CommonFields";

interface Board extends CommonFields {
  host: string;
  port: string;
  protocol: string;
}

export default Board;

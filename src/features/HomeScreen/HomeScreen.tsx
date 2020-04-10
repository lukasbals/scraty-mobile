import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import styles from "./styles";
import {
  loadBoardsFromStorageStart,
  addBoardStart,
  removeBoardStart,
} from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, getLoading } from "./seletor";
// eslint-disable-next-line no-unused-vars
import Board from "../../models/Board";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const boards: Board[] = useSelector(getBoards);
  const loading: boolean = useSelector(getLoading);

  useEffect(() => {
    dispatch(loadBoardsFromStorageStart());
  }, []);

  const addBoard = (board: Board) => {
    dispatch(addBoardStart(board));
  };

  const removeBoard = (id: number) => {
    dispatch(removeBoardStart(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello world!</Text>
      <Text>Boards:</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        boards.map((board: Board) => (
          <Text key={board.id} onPress={() => removeBoard(board.id)}>
            {board.name}
          </Text>
        ))
      )}
      <Button
        title="Add board"
        onPress={() =>
          addBoard({
            name: "New board",
            url: "",
            id: new Date().getMilliseconds(),
          })
        }
      />
    </View>
  );
};

export default HomeScreen;

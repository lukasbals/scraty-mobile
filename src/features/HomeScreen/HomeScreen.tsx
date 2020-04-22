import React, { useEffect } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
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
import CustomListView from "../../shared/ListView";

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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <CustomListView
          items={boards}
          itemClickFunc={(id: number) => Alert.alert("Item " + id + " pressed")}
          addFunc={() =>
            addBoard({
              title: "New board",
              url: "",
              id: new Date().getMilliseconds(),
            })
          }
          editFunc={(id: number) => Alert.alert("Edit pressed on item: " + id)}
          deleteFunc={(id: number) => removeBoard(id)}
        />
      )}
    </View>
  );
};

export default HomeScreen;

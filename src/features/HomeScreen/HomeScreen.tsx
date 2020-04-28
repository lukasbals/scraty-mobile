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
import CustomListView from "../../shared/ListView";
// eslint-disable-next-line no-unused-vars
import Board from "../../models/Board";
// eslint-disable-next-line no-unused-vars
import { StackNavigationProp } from "@react-navigation/stack";

interface PropTypes {
  navigation: StackNavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: PropTypes) => {
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

  if (loading || !boards) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <CustomListView
        items={boards}
        itemClickFunc={(id: number) =>
          navigation.push("Stories", {
            board: boards.find((board: Board) => board.id === id),
          })
        }
        addFunc={() =>
          addBoard({
            title: "New board",
            url: "http://192.168.178.24:8080/api/stories/",
            id: new Date().getMilliseconds(),
          })
        }
        editFunc={(id: number) => Alert.alert("Edit pressed on item: " + id)}
        deleteFunc={(id: number) => removeBoard(id)}
      />
    </View>
  );
};

export default HomeScreen;

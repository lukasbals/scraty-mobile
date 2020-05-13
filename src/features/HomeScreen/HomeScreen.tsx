import React, { useEffect } from "react";
import { View, AsyncStorage } from "react-native";
import styles from "./styles";
import { loadBoardsFromStorageStart, removeBoardStart } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, getLoading } from "./seletor";
import CustomListView from "../../shared/ListView";
import Board from "../../models/Board";
import { StackNavigationProp } from "@react-navigation/stack";
import LoadingScreen from "../../shared/LoadingScreen";

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

  useEffect(() => {
    const checkIfBoardIsSelected = async () => {
      if (!navigation.canGoBack()) {
        const selectedBoardValue = await AsyncStorage.getItem("selectedBoard");
        const selectedBoard = selectedBoardValue
          ? JSON.parse(selectedBoardValue)
          : null;
        if (selectedBoard) navigation.push("Stories", { board: selectedBoard });
      }
    };

    checkIfBoardIsSelected();
  }, []);

  const removeBoard = (id: number) => {
    dispatch(removeBoardStart(id));
  };

  if (loading || !boards) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <CustomListView
        items={boards}
        itemClickFunc={(id: number) => {
          const board = boards.find((board: Board) => board.id === id);
          AsyncStorage.setItem("selectedBoard", JSON.stringify(board));
          navigation.push("Stories", {
            board: board,
          });
        }}
        addFunc={() =>
          navigation.push("AddEditBoard", { screenTitle: "Add board" })
        }
        editFunc={(id: number) =>
          navigation.push("AddEditBoard", {
            board: boards.find((board: Board) => board.id === id),
            screenTitle: "Edit board",
          })
        }
        deleteFunc={(id: number) => removeBoard(id)}
        emptyText="There are no boards yet"
      />
    </View>
  );
};

export default HomeScreen;

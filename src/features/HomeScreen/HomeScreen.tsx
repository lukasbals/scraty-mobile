import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { loadBoardsFromStorageStart } from "./slice";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { boards, loading } = useSelector((state: any) => state.boards);

  useEffect(() => {
    dispatch(loadBoardsFromStorageStart());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello world!</Text>
      <Text>
        Boards:{"\n"}
        {loading
          ? "Loading..."
          : boards.map((board: string) => "* " + board + "\n")}
      </Text>
    </View>
  );
};

export default HomeScreen;

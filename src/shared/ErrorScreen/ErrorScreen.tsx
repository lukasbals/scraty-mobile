import React from "react";
import { View, Text, Button } from "react-native";
import styles from "./styles";

interface PropTypes {
  message: string;
  retry: () => void | null;
}

const ErrorScreen = ({ message, retry }: PropTypes) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={retry} title="Retry" />
    </View>
  );
};

export default ErrorScreen;

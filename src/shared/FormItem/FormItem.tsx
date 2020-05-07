import React from "react";
import { Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./styles";

interface PropTypes {
  value: string;
  onChange: (event: any) => void;
  label: string;
  placeholder: string;
}

function FormItem({ value, onChange, label, placeholder }: PropTypes) {
  return (
    <>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={value}
        style={styles.input}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}

export default FormItem;

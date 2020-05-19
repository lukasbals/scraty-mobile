import { Dimensions } from "react-native";

const sliceDependingOnScreenWidth = (word: string): string => {
  let sliceAfter = 30;

  if (Dimensions.get("screen").width > 500) {
    sliceAfter = 40;
  }

  if (Dimensions.get("screen").width > 700) {
    sliceAfter = 50;
  }

  if (word.length > sliceAfter) {
    return `${word.slice(0, sliceAfter)}...`;
  }
  return word;
};

export default {
  sliceDependingOnScreenWidth,
};

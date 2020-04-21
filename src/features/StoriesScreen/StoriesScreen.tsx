import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadStoriesFromBackendStart } from "./slice";
import { getStories, getLoading } from "./selector";

function StoriesScreen() {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const stories = useSelector(getStories);

  useEffect(() => {
    dispatch(loadStoriesFromBackendStart());
  }, []);

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View>
      {stories &&
        stories.map((story: any) => <Text key={story.id}>{story.text}</Text>)}
    </View>
  );
}

export default StoriesScreen;

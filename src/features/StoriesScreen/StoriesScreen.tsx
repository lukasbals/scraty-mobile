import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadStoriesFromBackendStart } from "./slice";
import { getStories, getLoading } from "./selector";
import CustomListView from "../../shared/ListView";

function StoriesScreen() {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const stories = useSelector(getStories);

  useEffect(() => {
    dispatch(loadStoriesFromBackendStart());
  }, []);

  return loading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <CustomListView
      items={stories}
      itemClickFunc={null}
      addFunc={null}
      editFunc={null}
      deleteFunc={null}
    />
  );
}

export default StoriesScreen;

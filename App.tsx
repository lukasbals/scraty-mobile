import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "./src/features/HomeScreen";
import { Provider } from "react-redux";
import store from "./src/store";
import StoriesScreen from "./src/features/StoriesScreen";
import TaskScreen from "./src/features/TaskScreen";
import AddBoardScreen from "./src/features/AddBoardScreen";
import AddStoryScreen from "./src/features/AddStoryScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name="Scraty" component={HomeScreen} />
          <Stack.Screen
            name="Stories"
            component={StoriesScreen}
            options={({ route }: any) => ({
              title: `Stories - ${route.params.board.title}`,
            })}
          />
          <Stack.Screen
            name="Tasks"
            component={TaskScreen}
            options={({ route }: any) => ({
              title: `Tasks - ${route.params.story.text}`,
            })}
          />
          <Stack.Screen
            name="AddBoard"
            component={AddBoardScreen}
            options={{ title: "Add board" }}
          />
          <Stack.Screen
            name="AddStory"
            component={AddStoryScreen}
            options={{ title: "Add story" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

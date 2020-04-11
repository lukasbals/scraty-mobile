import React, { useState } from 'react';
import { View, Dimensions} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from "./styles";

const routes = [
    { key: 'ToDo', title: 'ToDo' },
    { key: 'InProgress', title: 'In Progress' },
    { key: 'Verify', title: 'Verify' },
    { key: 'Done', title: 'Done' },
];

const ToDoRoute = () => (
    // put component here, or direct feed with tasks
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const InProgressRoute = () => (
    // put component here, or direct feed with tasks
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const VerifyRoute = () => (
    // put component here, or direct feed with tasks
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const DoneRoute = () => (
    // put component here, or direct feed with tasks
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

function TaskScreen() {
    const [index, setIndex] = useState(0);

    const renderScene = SceneMap({
        ToDo: ToDoRoute,
        InProgress: InProgressRoute,
        Verify: VerifyRoute,
        Done: DoneRoute
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    );
}

export default TaskScreen;
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';

const HomeScreen = () => {
    const [animation] = useState(new Animated.Value(0));
    const [timer, setTimer] = useState<null | boolean>(null);

    const startTimer = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 4000,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: -1 },
        ).start();

        setTimer(true);
    };

    const stopTimer = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).stop();
        setTimer(false);
    };


    const breathingAnimation = {
        transform: [
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.4],
                }),
            },
        ],
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Breathing Timer</Text>
            <Animated.View style={[styles.circle, breathingAnimation]} />
            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={timer ? stopTimer : startTimer}>
                    <Text style={styles.buttonText}>{timer ? 'Stop' : 'Start'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 60,
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#4dd0e1',
    },
    controls: {
        marginTop: 60,
    },
    button: {
        backgroundColor: '#4dd0e1',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default HomeScreen;
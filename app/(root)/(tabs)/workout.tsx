import { useState } from "react";
import { View, Text, TextInput, Button, FlatList, Pressable } from "react-native";

interface Workout {
    id: number;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

export default function Workout() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [name, setName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");

    const addWorkout = () => {
        if (!name || !sets || !reps || !weight) return;
        const newWorkout: Workout = {
            id: Date.now(),
            name,
            sets: parseInt(sets),
            reps: parseInt(reps),
            weight: parseFloat(weight),
        };
        setWorkouts([...workouts, newWorkout]);
        setName("");
        setSets("");
        setReps("");
        setWeight("");
    };

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <Text className="text-xl font-bold mb-4">Workout Tracker</Text>
            <TextInput
                className="border p-2 rounded mb-2 bg-white"
                placeholder="Workout Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                className="border p-2 rounded mb-2 bg-white"
                placeholder="Sets"
                keyboardType="numeric"
                value={sets}
                onChangeText={setSets}
            />
            <TextInput
                className="border p-2 rounded mb-2 bg-white"
                placeholder="Reps"
                keyboardType="numeric"
                value={reps}
                onChangeText={setReps}
            />
            <TextInput
                className="border p-2 rounded mb-2 bg-white"
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />
            <Pressable
                className="bg-blue-500 p-3 rounded mb-4"
                onPress={addWorkout}
            >
                <Text className="text-white text-center font-bold">Add Workout</Text>
            </Pressable>
            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className="bg-white p-4 rounded mb-2 shadow">
                        <Text className="font-bold">{item.name}</Text>
                        <Text>Sets: {item.sets}</Text>
                        <Text>Reps: {item.reps}</Text>
                        <Text>Weight: {item.weight} kg</Text>
                    </View>
                )}
            />
        </View>
    );
}
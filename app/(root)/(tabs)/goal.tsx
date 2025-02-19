import { View, Text, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { account, databases, logout } from '@/lib/appwrite';
import { router } from 'expo-router';
import {Picker} from "@react-native-picker/picker";

const handleLogout = async () => {
    try {
        await logout();
        alert('Logged out successfully');
        router.replace('/sign-in');
    } catch (error) {
        alert('Failed to log out');
        console.error(error);
    }
};

const updateUserData = async (userId, weight, goal) => {
    try {
        await databases.updateDocument('67ad8569000c66296306', '67affe250025616cfc55', userId, {
            weight: parseFloat(weight),
            goal,
        });
        //alert('Updated successfully');
    } catch (error) {
        //alert('Failed to update');
        console.error(error);
    }
};

const Goal = () => {
    const [weight, setWeight] = useState('');
    const [goal, setGoal] = useState('Maintain Weight');
    const [calories, setCalories] = useState(0);
    const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const session = await account.get();
            setUserId(session.$id);
        };
        fetchUser();
    }, []);

    const handleUpdate = () => {
        updateUserData(userId, weight, goal);
        handleRecalculate();
    };

    const handleRecalculate = () => {
        const bmr = 88.36 + (13.4 * parseFloat(weight)) + (4.8 * 175) - (5.7 * 25);
        const activityMultiplier = 1.55;
        const totalCalories = Math.round(bmr * activityMultiplier);
        setCalories(totalCalories);
        setMacros({
            protein: Math.round((totalCalories * 0.3) / 4),
            carbs: Math.round((totalCalories * 0.4) / 4),
            fats: Math.round((totalCalories * 0.3) / 9),
        });
    };

    return (
        <SafeAreaView className="bg-white h-full p-6">
            <ScrollView className="mb-6">

                <View className='bg-gray-400 p-6 rounded-lg mt-6 mb-6'>
                <Text className="text-3xl font-bold text-center mb-4">Your Goals</Text>
                <Text className="text-xl mb-2">Daily Calorie Needs: {calories} kcal</Text>
                <Text className="text-xl mb-2">Protein: {macros.protein}g</Text>
                <Text className="text-xl mb-2">Carbohydrates: {macros.carbs}g</Text>
                <Text className="text-xl mb-2">Fats: {macros.fats}g</Text>
                </View>

                <View className='bg-gray-400 p-6 rounded-lg mt-6 mb-6'>
                    <Text className="text-3xl font-bold text-center mb-4">Update Goals</Text>
                    <Text className="text-lg mb-2">Enter your weight in (kg)</Text>
                    <TextInput
                        placeholder=" 50 kg "
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                        className="border p-2 mb-4 rounded-xl"
                    />
                    <Text className="text-lg mb-2">Goal</Text>
                    <Picker selectedValue={goal} onValueChange={setGoal} className="border mb-6">
                        <Picker.Item label="Lose Weight" value="Lose Weight" />
                        <Picker.Item label="Maintain Weight" value="Maintain Weight" />
                        <Picker.Item label="Gain Muscle" value="Gain Muscle" />
                    </Picker>
                    <TouchableOpacity
                        onPress={handleUpdate}
                        className="bg-blue-500 py-3 rounded-2xl mb-4"
                    >
                        <Text className="text-white text-center font-semibold text-lg">Save Changes</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="bg-blue-500 py-3 rounded-2xl mb-4 "
                    >
                        <Text className="text-white text-center font-semibold text-lg">Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Goal;

// Fixed Goal Page with Proper Data Types for Appwrite
import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { databases, account } from '@/lib/appwrite';

const Detail = () => {
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('Male');
    const [activityLevel, setActivityLevel] = useState('Sedentary');
    const [goal, setGoal] = useState('Maintain Weight');
    const router = useRouter();

    const handleSaveDetails = async () => {
        try {
            const session = await account.get();
            await databases.createDocument(
                '67ad8569000c66296306',//database id
                '67affe250025616cfc55',//collection-id
                session.$id,
                {
                    age: parseInt(age, 10),
                    weight: parseFloat(weight),
                    height: parseFloat(height),
                    gender,
                    activityLevel,
                    goal,
                }
            );
            Alert.alert('Success', 'Details saved successfully!');
            router.push('/goal');
        } catch (error) {
            console.error('Error saving user details:', error);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView className="bg-white h-full p-6">
            <ScrollView>
                <Text className="text-3xl font-bold text-center mb-4">Enter Your Details</Text>
                <Text className="text-lg mb-2">Age</Text>
                <TextInput placeholder="Age (Years)" value={age} onChangeText={setAge} keyboardType="numeric" className="border p-2 mb-3" />
                <Text className="text-lg mb-2">Weight in (kg)</Text>
                <TextInput placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" className="border p-2 mb-3" />
                <Text className="text-lg mb-2">Height in (cm)</Text>
                <TextInput placeholder="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" className="border p-2 mb-3" />
                <Text className="text-lg mb-2">Gender</Text>
                <Picker selectedValue={gender} onValueChange={setGender} className="border mb-3">
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>
                <Text className="text-lg mb-2">Activity Level</Text>
                <Picker selectedValue={activityLevel} onValueChange={setActivityLevel} className="border mb-3">
                    <Picker.Item label="Sedentary" value="Sedentary" />
                    <Picker.Item label="Lightly Active" value="Lightly Active" />
                    <Picker.Item label="Moderately Active" value="Moderately Active" />
                    <Picker.Item label="Very Active" value="Very Active" />
                    <Picker.Item label="Super Active" value="Super Active" />
                </Picker>
                <Text className="text-lg mb-2">Goal</Text>
                <Picker selectedValue={goal} onValueChange={setGoal} className="border mb-6">
                    <Picker.Item label="Lose Weight" value="Lose Weight" />
                    <Picker.Item label="Maintain Weight" value="Maintain Weight" />
                    <Picker.Item label="Gain Muscle" value="Gain Muscle" />
                </Picker>
                <TouchableOpacity onPress={handleSaveDetails} className="bg-primary-300 rounded-full py-4">
                    <Text className="text-center text-white font-bold">Save Details</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Detail;

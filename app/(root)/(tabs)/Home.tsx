 import React, { useState, useEffect } from "react";
import {View, Text, Pressable, ScrollView} from "react-native";
import { View as RNView } from "react-native";
import CircularProgress from "../../../lib/CircularProgress";
import { router } from "expo-router";
import { client } from '@/lib/appwrite';
import { Databases, Query } from 'appwrite';
import {SafeAreaView} from "react-native-safe-area-context";
import search from "@/app/search";

const databases = new Databases(client);
const DATABASE_ID: string = '67ad8569000c66296306';
const COLLECTION_ID: string = '67af13cd0004bc047d03';

const AVERAGE_LIMITS = { calorie: 2500, protein: 150, carbs: 300, fats: 70 };

const Home = () => {
    const [progressValues, setProgressValues] = useState({ calorie: 0, protein: 0, carbs: 0, fats: 0 });
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [], snacks: [] });

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("date", date)]);
                let updatedMacros = { calorie: 0, protein: 0, carbs: 0, fats: 0 };
                let mealData = { breakfast: [], lunch: [], dinner: [], snacks: [] };

                response.documents.forEach((doc) => {
                    const parsedMacros = {
                        calories: parseFloat(doc.calories) || 0,
                        protein: parseFloat(doc.protein) || 0,
                        carbs: parseFloat(doc.carbs) || 0,
                        fats: parseFloat(doc.fats) || 0,
                    };
                    updatedMacros.calorie += parsedMacros.calories;
                    updatedMacros.protein += parsedMacros.protein;
                    updatedMacros.carbs += parsedMacros.carbs;
                    updatedMacros.fats += parsedMacros.fats;
                    mealData[doc.mealType]?.push({ foodName: String(doc.food_name || 'No Name'), macros: parsedMacros });
                });

                setProgressValues(updatedMacros);
                setMeals(mealData);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, [date]);

    const getProgress = (value, total) => (total > 0 ? Math.min(Math.max(value / total, 0), 1) : 0);
    const handleAddFood = (mealType :string) => {
        console.log('Sending to search:', { mealType, date });
        router.push(`search?mealType=${mealType}&date=${date}`);
    };
    const changeDate = (days) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate.toISOString().split('T')[0]);
    };

    const getBarColor = (value, limit) => (getProgress(value, limit) >= 0.9 ? 'bg-red-700' : 'bg-blue-500');

    return (
        <SafeAreaView>
            <ScrollView>
                <View className="flex-1 items-center justify-center bg-gray-100 space-y-8 p-4">
                    <View className="flex-row items-center justify-between w-full px-4">
                        <Pressable onPress={() => changeDate(-1)} className="p-2 bg-blue-500 rounded-lg">
                            <Text className="text-white font-semibold">Previous</Text>
                        </Pressable>
                        <Text className="text-2xl font-bold mb-4">{date}</Text>
                        <Pressable onPress={() => changeDate(1)} className="p-2 bg-blue-500 rounded-lg">
                            <Text className="text-white font-semibold">Next</Text>
                        </Pressable>
                    </View>
                    <CircularProgress progress={getProgress(progressValues.calorie, AVERAGE_LIMITS.calorie)} size={150} />
                    <Text className="text-xl font-bold">{progressValues.calorie} / {AVERAGE_LIMITS.calorie} Calories</Text>
                    {[{ name: 'protein' }, { name: 'fats' }, { name: 'carbs' }].map((item) => (
                        <View key={item.name} className="w-full items-center">
                            <Text className="text-lg font-semibold">{item.name}</Text>
                            <RNView className="w-11/12 h-3 bg-gray-300 rounded-full overflow-hidden">
                                <RNView className={`h-full ${getBarColor(progressValues[item.name] || 0, AVERAGE_LIMITS[item.name])}`} style={{ width: `${getProgress(progressValues[item.name] || 0, AVERAGE_LIMITS[item.name]) * 100}%` }} />
                            </RNView>
                            <Text>{progressValues[item.name] || 0}g / {AVERAGE_LIMITS[item.name]}g</Text>
                        </View>
                    ))}
                    <View className='bg-gray-300 w-full rounded-md p-4 pb-20'>
                        {Object.keys(meals).map(meal => (
                            <View key={meal} className='m-2 p-2 bg-gray-200 rounded-lg'>
                                <Text className='text-xl font-semibold'>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
                                {meals[meal].map((food, idx) => (
                                    <Text key={idx}>{food.foodName} - {food.macros.calories} Cal</Text>
                                ))}
                                <Pressable onPress={() => handleAddFood(meal)} className="mt-2 p-2 bg-blue-500 rounded-lg items-center">
                                    <Text className="text-white font-semibold">Add</Text>
                                </Pressable>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

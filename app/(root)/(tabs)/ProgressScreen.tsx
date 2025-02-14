import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { View as RNView } from "react-native"; // Avoid conflict with NativeWind's View
import CircularProgress from "./CircularProgress";

const ProgressScreen = () => {
    const [progressValues, setProgressValues] = useState({
        totalCalories: 500,
        calorie: 250,
        totalprotein:25,
        protein: 10,
        totalfiber:50,
        fiber: 25,
        totalcarbs:75,
        carbs: 60,
        totalfats:100,
        fats: 90,
    });

    // Convert input to progress values (0-1)
    const getProgress = (value: number , total:number) => Math.min(Math.max(value / total, 0), 1);

    return (
        <View className="flex-1 items-center justify-center bg-gray-100 space-y-8 p-4">
            {/* 1st Row: Circular Progress */}
            <View className="items-center">
                <CircularProgress progress={getProgress(progressValues.calorie,progressValues.totalCalories)} size={150}  />
                <View className='absolute top-20'>
                    <Text className="text-2xl font-semibold text-black-300 ml-2">
                        Calories
                    </Text>
                </View>
                <Text className="text-2xl font-bold mt-4">
                    {progressValues.calorie} / {progressValues.totalCalories}</Text>
            </View>

            {/* 2nd Row: Two Horizontal Progress Bars */}
            <View className="flex-row gap-x-8">
                {[{name:'protein',key1:'protein',key2:'totalprotein'},{name:'fiber',key1:'fiber',key2:'totalfiber'}].map((item, index) => (
                    <View key={index} className="items-center space-y-2 w-40 mt-3">
                        <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
                        <RNView className="w-full h-3 bg-gray-300 rounded-full overflow-hidden" >
                            <RNView
                                className="h-full bg-green-700"
                                style={{ width: `${getProgress(progressValues[item.key1 as keyof  typeof progressValues],progressValues[item.key2 as keyof  typeof progressValues]) * 100}%` }}
                            />
                        </RNView>
                        <Text className="text-xl font-semibold text-gray-700">
                            {progressValues[item.key1]} / {progressValues[item.key2]}</Text>
                    </View>
                ))}
            </View>

            {/* 3rd Row: Two More Horizontal Progress Bars */}
            <View className="flex-row gap-x-8">
                {[{name:'Fats',key1:'fats',key2:'totalfats'},{name:'carbs',key1:'carbs', key2:'totalcarbs'}].map((item, index) => (
                    <View key={index} className="items-center space-y-2 w-40 mt-5">
                        <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
                        <RNView className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                            <RNView
                                className="h-full bg-green-700"
                                style={{ width: `${getProgress(progressValues[item.key1 as keyof  typeof progressValues],progressValues[item.key2 as keyof  typeof progressValues]) * 100}%` }}
                            />
                        </RNView>
                        <Text className="text-xl font-semibold text-gray-700">
                            {progressValues[item.key1]} / {progressValues[item.key2]}</Text>
                    </View>
                ))}
            </View>

            {/*This is foods section*/}
            <View className='bg-gray-500 w-full rounded-md shadow-zinc-500 shadow-2xl relative items-center m-6'>
                <View className='bg-gray-300 w-9/12 mt-3 p-3'>
                    <Text className='text-xl font-semibold'>Breakfast</Text>
                </View>
                <View className='bg-gray-300 w-9/12 mt-3 p-3'>
                    <Text className='text-xl font-semibold'>Lunch</Text>
                </View>
                <View className='bg-gray-300 w-9/12 mt-3 p-3'>
                    <Text className='text-xl font-semibold'>Dinner</Text>
                </View>
                <View className='bg-gray-300 w-9/12 mt-3 mb-3 p-3'>
                    <Text className='text-xl font-semibold'>Snacks</Text>
                </View>
            </View>
        </View>
    );
};

export default ProgressScreen;

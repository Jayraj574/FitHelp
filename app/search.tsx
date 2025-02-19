import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TextInput, FlatList, Button } from 'react-native';
import {router, useLocalSearchParams} from 'expo-router';
import { client } from '@/lib/appwrite';
import { Databases } from 'appwrite';

const databases = new Databases(client);
const DATABASE_ID: string = '67ad8569000c66296306';
const COLLECTION_ID: string = '67af13cd0004bc047d03';

type FoodItem = {
    food_name: string;
    nutrients: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
};

const addToAppwrite = async (food: FoodItem, mealType: string, date: string): Promise<void> => {
    //console.log('Adding to Appwrite with:', { food, mealType, date });
    try {
        const payload = {
            mealType: `${mealType}`,
            food_name: `${food.food_name.slice(0, 20)}`,
            calories: Math.round(food.nutrients.calories),
            protein: Math.round(food.nutrients.protein),
            carbs: Math.round(food.nutrients.carbs),
            fats: Math.round(food.nutrients.fats),
            date: `${date}`
        };
        //console.log('Sending to Appwrite:', payload);
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', payload);
        //alert(`${food.food_name} added to ${mealType}`);
        router.replace('/Home');
    } catch (error) {
        console.error('Error adding document:', error);
        alert('Error adding food');
    }
};

const Search = () => {
    const params = useLocalSearchParams();
    const mealType = String(params.mealType);
    const date = String(params.date);
    console.log('Received in search:', { mealType, date });
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<FoodItem[]>([]);

    const headers = {
        'x-app-id': '1948be40-3210-4d66-bb38-b660249ef2dc',
        'x-client-id': 'vJ4vLMLavscmR6L8Zgovpg6B36t2',
        'x-api-key': 'uDY7qJ+G46S2tltm4OzngoJYS33pdtLKNfbYKNVEM0U='
    };

    const fetchData = async () => {
        if (!query) return;
        setIsLoading(true);
        try {
            const response = await fetch(`https://gateway.apyflux.com/search?value=${encodeURIComponent(query)}`, { method: 'GET', headers });
            const data = await response.json();
            setResults(data.items || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, [query]);

    const renderItem = ({ item }: { item: FoodItem }) => (
        <View className="p-2 m-2 bg-white rounded-lg shadow-md">
            <Text className="text-lg font-semibold">{item.food_name}</Text>
            <Text className="text-sm text-gray-600">Calories: {item.nutrients.calories}</Text>
            <Text className="text-sm text-gray-600">Protein: {item.nutrients.protein}g</Text>
            <Text className="text-sm text-gray-600">Carbs: {item.nutrients.carbs}g</Text>
            <Text className="text-sm text-gray-600">Fats: {item.nutrients.fats}g</Text>
            <Button title="Add to Meal" onPress={() => addToAppwrite(item, mealType, date)} />
        </View>
    );

    return (
        <View className="flex-1 p-4">
            <TextInput className="p-2 border border-gray-300 rounded-lg mb-4" placeholder="Search food items..." value={query} onChangeText={setQuery} />
            {isLoading ? <ActivityIndicator size="large" /> : error ? <Text className="text-red-500">{error}</Text> : <FlatList data={results} keyExtractor={(item) => item.food_name} renderItem={renderItem} />}
        </View>
    );
};

export default Search;

import { View, Text, ActivityIndicator, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);

    const headers = {
        'x-app-id': '1948be40-3210-4d66-bb38-b660249ef2dc',
        'x-client-id': 'ssKX0YKP5ahXgUSgls6D1C1XggM2',
        'x-api-key': 'i1gGSQC2ZV8ChsktXzAnwGHKmVOu4lbIadZGksPu+pE='
    };

    const fetchData = async () => {
        if (!query) return;
        setIsLoading(true);
        try {
            const response = await fetch(`https://gateway.apyflux.com/search?value=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers
            });
            const data = await response.json();
            setResults(data.items || []);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const renderItem = ({ item }) => (
        <View className="p-2 m-2 bg-white rounded-lg shadow-md">
            <Text className="text-lg font-semibold">{item.food_name}</Text>
            <Text className="text-sm text-gray-600">Serving: {item.serving_type}</Text>
            <Text className="text-sm text-gray-600">Calories: {item.nutrients.calories}</Text>
            <Text className="text-sm text-gray-600">Protein: {item.nutrients.protein}g</Text>
            <Text className="text-sm text-gray-600">Carbs: {item.nutrients.carbs}g</Text>
            <Text className="text-sm text-gray-600">Fats: {item.nutrients.fats}g</Text>
        </View>
    );

    return (
        <View className="flex-1 p-4">
            <TextInput
                className="p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Search food items..."
                value={query}
                onChangeText={setQuery}
            />
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : error ? (
                <Text className="text-red-500">{error}</Text>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.food_unique_id}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

export default Search;

import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signupWithEmail, loginWithEmail } from '@/lib/appwrite';
import {Redirect, useRouter} from 'expo-router';
import { useGlobalContext } from '@/lib/global-provider';

const SignUp = () => {
    const { loading, isLoggedIn } = useGlobalContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    if (!loading && isLoggedIn) return <Redirect href="/(root)/(tabs)/Home" />;

    const handleSignUp = async () => {
        const signupResult = await signupWithEmail(email, password, name);
        if (signupResult) {
            const loginResult = await loginWithEmail(email, password);
            if (loginResult) {
                Alert.alert('Success', 'Account created and logged in successfully!');
                router.replace('/detail');
            } else {
                Alert.alert('Error', 'Account created but failed to log in.');
            }
        } else {
            Alert.alert('Error', 'Failed to create account.');
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full p-10">
                <Text className="text-3xl font-bold text-center mb-8">Sign Up</Text>
                <Text className="text-lg mb-2">Name : </Text>
                <TextInput placeholder="Full Name" className="border rounded p-3 mb-4" value={name} onChangeText={setName} />
                <Text className="text-lg mb-2">Email : </Text>
                <TextInput placeholder="Email" className="border rounded p-3 mb-4" value={email} onChangeText={setEmail} />
                <Text className="text-lg mb-2">Password : </Text>
                <TextInput placeholder="Password" className="border rounded p-3 mb-6" secureTextEntry value={password} onChangeText={setPassword} />
                <TouchableOpacity onPress={handleSignUp} className="bg-primary-300 rounded-full py-4">
                    <Text className="text-white text-center font-medium">Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;

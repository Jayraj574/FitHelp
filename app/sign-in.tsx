import {View, Text, ScrollView, Image, TouchableOpacity, Alert, TextInput} from 'react-native'
import React, { useState } from 'react'
import{SafeAreaView} from 'react-native-safe-area-context';
import images from '@/constants/images';
import icons from '@/constants/icons';
import {login, loginWithEmail} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/global-provider";
import {Link, Redirect, router} from "expo-router";

const signIn = () => {
    const {refetch, loading, isLoggedIn} = useGlobalContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if(!loading && isLoggedIn) return <Redirect href="/(root)/(tabs)/Home"/>;

    const handleLogin = async ()=>{
        const result = await login();
        if(result){
            console.log('login success');
            router.replace('/Home');
        }
        else{
            Alert.alert('Error','Failed to login');
        }
    };

    const handleEmailLogin = async () => {
        const result = await loginWithEmail(email, password);
        if(result){
            console.log('Email login success');
            router.replace('/Home');
        } else {
            Alert.alert('Error', 'Failed to login with email');
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
                <View className="px-10">
                    <Text className="text-base text-center uppercase font-Rubik text-black-200">
                        Welcome to FitHelp</Text>
                    <Text className="text-3xl font-Rubik-Bold text-black-300 text-center mt-2 ">
                        Your Helping Hand{"\n"}
                        <Text className="text-primary-300">On your fitness journey</Text>
                    </Text>

                    {/* Email and Password Inputs */}
                    <TextInput placeholder="Email" className="border rounded p-2 mt-5" value={email} onChangeText={setEmail} />
                    <TextInput placeholder="Password" className="border rounded p-2 mt-3" value={password} secureTextEntry onChangeText={setPassword} />

                    <TouchableOpacity onPress={handleEmailLogin} className="bg-primary-300 rounded-full w-full py-4 mt-5">
                        <Text className="text-center text-white font-Rubik-Medium">Login with Email</Text>
                    </TouchableOpacity>

                    <View className="relative items-center mt-6">
                    <Link href="/Sign-up" >Already a user ?  Sign - up</Link>
                    </View>

                    <Text className="text-lg font-rubik text-center text-black-300 mt-12">
                        Login to Fithelp using Google
                    </Text>
                    <TouchableOpacity onPress={handleLogin} className="bg-white shadow-md shadow-zinc-500 rounded-full w-full py-4 mt-5">
                        <View className="flex flex-row justify-center items-center">
                            <Image source={icons.google} className="w-5 h-5" resizeMode="contain" />
                            <Text className="font-Rubik-Medium text-black-300 ml-2">
                                Continue With Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default signIn

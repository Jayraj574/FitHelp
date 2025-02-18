import {View, Text, Image} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import icons from "@/constants/icons";
import Images from "@/constants/images";

const TabIcon =({focused, icon, title}:{focused:boolean; icon:any; title:string}) =>(
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused ? '#0061ff' : '#666876'} resizeMode='contain' className='size-6'/>
        <Text className={`${focused?'text-primary-300 font-Rubik-Medium':'text-black-200 font-rubik'}`}>
            {title}
        </Text>
    </View>
)
const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel : false,
            tabBarStyle: {
                backgroundColor: "white",
                position:'absolute',
                borderTopColor: 'black',
                borderTopWidth: 1,
                minHeight:70,
            }
        }}>
            <Tabs.Screen
                name='Home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon:({focused})=>(
                        <TabIcon icon={icons.home}
                                 focused={focused} title="home"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='workout'
                options={{
                    title: 'workout',
                    headerShown: false,
                    tabBarIcon:({focused})=>(
                        <TabIcon icon={icons.search}
                                 focused={focused} title="workout"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='goal'
                options={{
                    title: 'goal',
                    headerShown: false,
                    tabBarIcon:({focused})=>(
                        <TabIcon icon={icons.people}
                                 focused={focused} title="goal"
                        />
                    )
                }}
            />

        </Tabs>
    )
}
export default TabsLayout

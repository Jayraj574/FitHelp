import React from "react";
import {Text, View} from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
    progress: number; // Value between 0 and 1
    size?: number;
    strokeWidth?: number;
    color?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
                                                               progress,
                                                               size = 100,
                                                               strokeWidth = 10,
                                                               color = "#0061ff",
                                                           }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <View>
            <Svg width={size} height={size}>
                {/* Background Circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="lightgray"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress Circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from top
                />
            </Svg>
        </View>
    );
};

export default CircularProgress;

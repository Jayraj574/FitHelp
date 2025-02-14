import { Text, View } from "react-native";
import{Link} from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-rubik text-3xl my-10">Welcome to Restate</Text>
      <Link href="/sign-in">Sign in</Link>
      <Link href="./ProgressScreen">Progress</Link>
      <Link href="/search">Search</Link>
      <Link href="/workout">workout</Link>
    </View>
  );
}

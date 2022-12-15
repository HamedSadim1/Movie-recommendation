import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import FavoriteMovies from "./components/FavoriteMovies";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "blue",
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{
            tabBarLabel: "MovieDetails",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="movie" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="FavoriteMovies"
          component={FavoriteMovies}
          options={{
            tabBarLabel: "FavoriteMovies",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="movie" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import MovieDetails from "./components/MovieDetails";
import FavoriteMovies from "./components/FavoriteMovies";

const Tab = createBottomTabNavigator();

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

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface NavbarProps {
  main: boolean;
}

const Navbar = ({ main }: NavbarProps) => {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView>
      {main ? (
        <View style={styles.mainNav}>
          <Text style={styles.logo}>HJ</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon name="search-outline" style={styles.title} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={50} style={styles.title} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
    marginLeft: 20,
  },
  logo: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 20,
  },
  mainNav: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});

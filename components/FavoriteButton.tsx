import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

interface FavoriteButtonProps {
  handlePress: () => void;
  onShare: () => Promise<void>;
  getFavoriteStatus: () => Promise<string>;
}

//! Renders a favorite button and a share button"

const FavoriteButton = ({
  handlePress,
  onShare,
  getFavoriteStatus,
}: FavoriteButtonProps) => {
  const [favoriteStatus, setFavoriteStatus] =
    useState<string>("favorite-border");

  //! Fetches the favorite status and updates the component's state when the component  when the favorite status changes
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const status = await getFavoriteStatus();
      setFavoriteStatus(status);
    };
    fetchFavoriteStatus();
  }, [favoriteStatus, handlePress, onShare]);
  return (
    <View>
      <View>
        <Pressable style={styles.button} onPress={() => handlePress()}>
          <Icon name={favoriteStatus} size={30} color="red" />
        </Pressable>
      </View>

      <View style={styles.shareButton}>
        <Pressable onPress={() => onShare()}>
          <Icon name="share" size={30} color="green" />
        </Pressable>
      </View>
    </View>
  );
};

export default FavoriteButton;
const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    borderRadius: 50,
    width: 50,
    padding: 10,
  },
  shareButton: {
    alignContent: "center",
    borderRadius: 50,
    width: 50,
    padding: 10,
    marginLeft: 10,
    marginTop: 100,
    marginStart: 10,
  },
});

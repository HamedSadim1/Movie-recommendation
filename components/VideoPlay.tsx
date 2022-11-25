import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoPlay = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={"M7lc1UVf-VE"}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default VideoPlay;

const styles = StyleSheet.create({});

import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";

const Carasoul = () => {
  const images = [
    "https://source.unsplash.com/random/?Cryptocurrency&1",
    "https://source.unsplash.com/random/?Cryptocurrency&2",
    "https://source.unsplash.com/random/?Cryptocurrency&3",
    "https://source.unsplash.com/random/?Cryptocurrency&4",
    "https://source.unsplash.com/random/?Cryptocurrency&5",
  ];
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  let flatList = React.createRef<FlatList<string[]>>();

  const infiniteScroll = () => {
    const numberOfData: number = 5;
    let scrollValue: number = 0;
    let scrolled: number = 0;

    setInterval(() => {
      scrolled++;
      if (scrolled < numberOfData) scrollValue = scrollValue + width;
      else {
        scrollValue = 0;
        scrolled = 0;
      }

      if (flatList?.current) {
        flatList.current.scrollToOffset({
          animated: true,
          offset: scrollValue,
        });
      }
    }, 3000);
  };

  React.useEffect(() => {
    infiniteScroll();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatList as any}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width, height: 300, resizeMode: "cover" }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
});

export default Carasoul;

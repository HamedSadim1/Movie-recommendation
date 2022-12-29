import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  Alert,
  Pressable,
  Share,
} from "react-native";
import React, { useRef } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getMovieDetails, Detail } from "./services/IMovieData";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "./UseNotification";
import * as Notifications from "expo-notifications";

import { Rating } from "react-native-ratings";
import FavoriteButton from "./FavoriteButton";
import Icon from "react-native-vector-icons/MaterialIcons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Details = () => {
  const route: RouteProp<any> = useRoute();
  const [movieDetails, setMovieDetails] = useState<Detail>({} as Detail);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<any>();
  const responseListener = useRef();

  const setDataInLocalStorage = async (movieId: string) => {
    try {
      //! get all the existing items from AsyncStorage
      const arrExist = await AsyncStorage.getItem("favorite");
      //! check if the movieId is already in the array
      const movieIdIncludeInArrExist = arrExist?.includes(movieId);
      //! if the movieId is already in the array, show an alert
      if (movieIdIncludeInArrExist) {
        Alert.alert("Movie already in favorite");
        return;
      }
      //! if the movieId is not in the array, add it to the array
      if (arrExist) {
        // ! Convert into JavaScript
        // sendPushNotification();
        await schedulePushNotification();
        const arr = JSON.parse(arrExist);
        // ! Add the new movieId
        arr.push(movieId);
        // ! Convert into JSON string and set Item in the Storage
        await AsyncStorage.setItem("favorite", JSON.stringify(arr));
        //   Alert.alert("Movie added to favorite");
      } else {
        //   //! if the array is empty, create a new array with the movieId
        await AsyncStorage.setItem(
          "favorite",
          JSON.stringify([movieDetails.poster_path])
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  //! Set sound and alert
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've added a movie to your favorite list!",
        body: `${movieDetails.title} ${movieDetails.overview}`,
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  //! if the button is clicked you will able to share
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey, I just found this movie on the Movie Recommendation App. Check it out: Movie Title  ${movieDetails.title} - Movie Review ${movieDetails.overview} Release Date  ${movieDetails.release_date}`,
        title: "Movie Recommendation",
      });
      //! if something went wrong
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
          //! if shared
        } else {
          console.log("shared");
        }
        //! if dismissed
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      alert(error);
    }
  };

  //! this function formate the release Date
  const releaseDateFormat = dateFormat(
    movieDetails.release_date,
    "d,mmmm,yyyy"
  );

  //! check if the movieId is in the route params if not return 0
  const movieId: number = route.params?.movieId
    ? parseInt(route.params.movieId)
    : 0;

  useEffect(() => {
    setLoading(true);
    //! give the movieId to get the all data from the API
    getMovieDetails(movieId)
      .then((data) => {
        setMovieDetails(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    //! register for push notification
    registerForPushNotificationsAsync().then((token) => {
      if (token !== undefined) setExpoPushToken(token);
    });
    //! used to add a listener that will be called whenever a notification is received by the device
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    return () => {
      //! removes the notification subscription for the notificationListener and the responseListener
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      //! remove a notification subscription that was previously created
      if (responseListener.current)
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [route]);
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {loading ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View style={styles.container}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
                }}
                style={styles.image}
              />
              <View style={styles.PlayButton}>
                <FavoriteButton
                  handlePress={() => {
                    setDataInLocalStorage(movieDetails.poster_path);
                  }}
                  onShare={onShare}
                />
              </View>
              <Text style={styles.movieTitle}>{movieDetails.title}</Text>
              <View style={styles.genreContainer}>
                {movieDetails.genres?.map((genre) => (
                  <Text key={genre.id} style={styles.genresTitle}>
                    {genre.name}
                  </Text>
                ))}
              </View>
              <View>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={30}
                  readonly={true}
                  startingValue={movieDetails.vote_average / 2}
                  tintColor=""
                />
              </View>
              <Text style={styles.overview}>{movieDetails.overview}</Text>
              <Text style={styles.releaseDate}>
                Release Date: {releaseDateFormat}
              </Text>
            </View>
          )}
        </ScrollView>
        {error.length > 1 ? <Text>{error}</Text> : null}
      </View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
  },
  overview: {
    padding: 15,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  genresTitle: {
    fontSize: 15,
    color: "black",
    paddingBottom: 5,
    fontWeight: "bold",
    marginRight: 20,
  },
  releaseDate: {
    fontWeight: "bold",
  },
  PlayButton: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 290,
    marginRight: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

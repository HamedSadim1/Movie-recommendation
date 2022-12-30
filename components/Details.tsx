import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  Alert,
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
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Details = () => {
  const route: RouteProp<any> = useRoute();
  const [movieDetails, setMovieDetails] = useState<Detail>({} as Detail);

  const [loading, setLoading] = useState<boolean>(false);
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
  //! the function will called if the heart button clicked
  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've added a movie to your favorite list!",
        body: `Title ${movieDetails.title} \n Review${movieDetails.overview}`,
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  };

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

  //! check the poster path exist in the localStorage if exist return favorite else favorite-border

  const getFavoriteStatus = async (): Promise<string> => {
    const arrExist = await AsyncStorage.getItem("favorite");

    //! Check if arrExist is not null before parsing
    const arr = arrExist ? JSON.parse(arrExist) : [];

    if (arr?.includes(movieDetails.poster_path)) {
      return "favorite";
    } else {
      return "favorite-border";
    }
  };

  useEffect(() => {
    if (movieId) {
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
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
      };
    }
  }, [movieId]);
  return (
    <View>
      <View style={styles.container}>
        {!movieId && !route && loading && !movieDetails && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
      <ScrollView>
        <View style={styles.container}>
          {movieDetails && route !== null && !loading && movieId !== 0 && (
            <View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
                }}
                style={styles.image}
              />
              <View style={styles.favoriteButton}>
                <FavoriteButton
                  handlePress={() => {
                    setDataInLocalStorage(movieDetails.poster_path);
                  }}
                  onShare={onShare}
                  getFavoriteStatus={getFavoriteStatus}
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
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                readonly={true}
                startingValue={movieDetails.vote_average / 2}
                tintColor=""
              />
              <Text style={styles.overview}>{movieDetails.overview}</Text>
              <Text style={styles.releaseDate}>
                Release Date: {releaseDateFormat}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {error.length > 1 && <Text>{error}</Text>}
      {movieId === 0 && route === null && (
        <View style={styles.container}>
          <Text style={styles.movieTitle}>No Movie Found</Text>
        </View>
      )}
    </View>
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
    textAlign: "center",
  },
  overview: {
    padding: 15,
    textAlign: "center",
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
    textAlign: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 290,
    marginRight: 20,
  },
});

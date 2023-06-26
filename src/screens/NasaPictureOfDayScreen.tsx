import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, PanResponder } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { API_KEY } from '../App';
import { NasaPictureOfDayProps } from "../utils/types";


const NasaPictureOfDayScreen = () => {
  const navigation = useNavigation();
  const [picture, setPicture] = useState<NasaPictureOfDayProps |undefined>(undefined);


  useEffect(() => {
    const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if(data)
          setPicture(serializePicture(data))
      })
      .catch(error => console.error(error));
  }, []);

  const serializePicture= (picture:NasaPictureOfDayProps): NasaPictureOfDayProps => {
    return {
      date: picture.date,
      explanation: picture.explanation,
      hdurl: picture.hdurl,
      media_type: picture.media_type,
      title: picture.title,
      url: picture.url,
    };
  };

  const handleButtonPress = () => {
    // @ts-ignore
    navigation.navigate("AsteroidList");
  };
  console.log(picture)
  return (
    <View style={styles.container}>
      {picture ? (
        <View style={styles.container}>
          <Image source={{ uri: picture.url }} style={styles.image} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>{new Date().toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{picture?.title}</Text>
      </View>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  description: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});

export default NasaPictureOfDayScreen;

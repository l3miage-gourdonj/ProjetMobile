// AsteroidListScreen.js

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsteroidList from '../components/AsteroidList';

const AsteroidListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asteroid List</Text>
      <AsteroidList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
});

export default AsteroidListScreen;

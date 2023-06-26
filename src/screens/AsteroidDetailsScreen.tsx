// AsteroidDetailsScreen.js

import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsteroidDetails from '../components/AsteroidDetails';

// @ts-ignore
const AsteroidDetailsScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Asteroid Details</Text>
        <AsteroidDetails route={route} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});

export default AsteroidDetailsScreen;

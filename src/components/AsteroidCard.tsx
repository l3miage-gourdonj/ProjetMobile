import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// @ts-ignore
const AsteroidCard = ({ asteroid, onPress }) => {
  return (
    <TouchableOpacity style={styles.asteroidContainer} onPress={onPress}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.asteroidName}>Name: {asteroid.name}</Text>
          <Text style={styles.infoText}>Estimated Diameter (m): {asteroid.estimated_diameter}</Text>
          <Text style={styles.infoText}>Speed (km/h): {asteroid.speed}</Text>
          <Text style={styles.infoText}>Closest distance (km): {asteroid.closestDistance}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>→</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  asteroidContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  asteroidName: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  infoText: {
    color: 'black',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  arrowContainer: {
    marginLeft: 10,
  },
  arrow: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default AsteroidCard;

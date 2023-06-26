// AsteroidList.js

import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from '../App';
import { Asteroid, AsteroidSum } from '../utils/types';
import AsteroidCard from './AsteroidCard';

const AsteroidList = () => {
  const navigation = useNavigation();

  const [asteroids, setAsteroids] = useState<AsteroidSum[]>([]);

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    try {
      const currentDate = moment().format('YYYY-MM-DD');
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&detailed=true&api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch asteroids');
      }
      const data = await response.json();
      const serializedAsteroids = serializeAsteroids(data.near_earth_objects[currentDate]);
      setAsteroids(serializedAsteroids);
    } catch (error) {
      console.error(error);
    }
  };

  const serializeAsteroids = (asteroidList: Asteroid[]): AsteroidSum[] => {
    const serializedAsteroids: AsteroidSum[] = asteroidList.map((asteroid) => ({
      id: asteroid.id,
      name: asteroid.name,
      link: asteroid.links.self,
      estimated_diameter: ((asteroid.estimated_diameter.meters.estimated_diameter_max + asteroid.estimated_diameter.meters.estimated_diameter_min) / 2).toString(),
      speed: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
      closestDistance: asteroid.close_approach_data[0].miss_distance.kilometers,
    }));
    return serializedAsteroids;
  };

  const handleButtonPress = (link: string) => {
    // @ts-ignore
    navigation.navigate('AsteroidDetails', { link: link });
  };

  return (
    <ScrollView>
      {asteroids?.map((asteroid) => (
        <AsteroidCard key={asteroid.id} asteroid={asteroid} onPress={() => handleButtonPress(asteroid.link)} />
      ))}
    </ScrollView>
  );
};

export default AsteroidList;

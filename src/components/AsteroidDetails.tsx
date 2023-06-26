import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { AsteroidData } from "../utils/types";
import moment from "moment/moment";



function serializeAsteroidData(data: AsteroidData): AsteroidData {

  const asteroidData: AsteroidData = {
    absolute_magnitude_h: data.absolute_magnitude_h,
    close_approach_data: data.close_approach_data.filter((data=> data.close_approach_date === moment().format('YYYY-MM-DD'))).map((approach) => ({
      close_approach_date: approach.close_approach_date,
      close_approach_date_full: approach.close_approach_date_full,
      epoch_date_close_approach: approach.epoch_date_close_approach,
      orbiting_body: approach.orbiting_body,
      relative_velocity: approach.relative_velocity,
      miss_distance: approach.miss_distance,
    })),
    designation: data.designation,
    estimated_diameter: {
      meters: {
        estimated_diameter_max: data.estimated_diameter.meters.estimated_diameter_max,
        estimated_diameter_min: data.estimated_diameter.meters.estimated_diameter_min,
      },
    },
    id: data.id,
    is_potentially_hazardous_asteroid: data.is_potentially_hazardous_asteroid,
    is_sentry_object: data.is_sentry_object,
    links: {
      self: data.links.self,
    },
    name: data.name,
    nasa_jpl_url: data.nasa_jpl_url,
    neo_reference_id: data.neo_reference_id,
    orbital_data: {
      aphelion_distance: data.orbital_data.aphelion_distance,
      ascending_node_longitude: data.orbital_data.ascending_node_longitude,
      data_arc_in_days: data.orbital_data.data_arc_in_days,
      eccentricity: data.orbital_data.eccentricity,
      epoch_osculation: data.orbital_data.epoch_osculation,
      equinox: data.orbital_data.equinox,
      first_observation_date: data.orbital_data.first_observation_date,
      inclination: data.orbital_data.inclination,
      jupiter_tisserand_invariant: data.orbital_data.jupiter_tisserand_invariant,
      last_observation_date: data.orbital_data.last_observation_date,
      mean_anomaly: data.orbital_data.mean_anomaly,
      mean_motion: data.orbital_data.mean_motion,
      minimum_orbit_intersection: data.orbital_data.minimum_orbit_intersection,
      observations_used: data.orbital_data.observations_used,
      orbit_class: {
        orbit_class_description: data.orbital_data.orbit_class.orbit_class_description,
        orbit_class_range: data.orbital_data.orbit_class.orbit_class_range,
        orbit_class_type: data.orbital_data.orbit_class.orbit_class_type,
      },
      orbit_determination_date: data.orbital_data.orbit_determination_date,
      orbit_id: data.orbital_data.orbit_id,
      orbit_uncertainty: data.orbital_data.orbit_uncertainty,
      orbital_period: data.orbital_data.orbital_period,
      perihelion_argument: data.orbital_data.perihelion_argument,
      perihelion_distance: data.orbital_data.perihelion_distance,
      perihelion_time: data.orbital_data.perihelion_time,
      semi_major_axis: data.orbital_data.semi_major_axis,
    },
  };

  return asteroidData;
}

// @ts-ignore
const AsteroidDetails = ({ route }) => {
  const [asteroidDetails, setAsteroidDetails] = useState<AsteroidData | null>(null);

  useEffect(() => {
    const link = route.params?.link;
    if (link) {
      try {
        fetch(link)
          .then((response) => response.json())
          .then((data) => setAsteroidDetails(serializeAsteroidData(data)));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // @ts-ignore
  const renderProperty = (key, value) => {
    if (typeof value === 'object') {
      return (
        <View key={key} style={styles.infoContainer}>
          <Text style={styles.infoLabel}>{key}:</Text>
          {Object.entries(value).map(([nestedKey, nestedValue]) =>
            renderProperty(nestedKey, nestedValue)
          )}
        </View>
      );
    } else {
      return (
        <View key={key} style={styles.infoContainer}>
          <Text style={styles.infoLabel}>{key}:</Text>
          <Text style={styles.infoText}>{JSON.stringify(value)}</Text>
        </View>
      );
    }
  };

  return (
    <View>
      {asteroidDetails ? (
        <>
          {Object.entries(asteroidDetails).map(([key, value]) =>
            renderProperty(key, value)
          )}
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading asteroid details...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default AsteroidDetails;

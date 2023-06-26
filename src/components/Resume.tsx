import React from 'react';
import { ResumeData } from "../utils/types";

interface ResumeProps {
  resumeData: ResumeData;
}

const Resume: React.FC<ResumeProps> = ({ resumeData }) => {
  return (
    <div>
      <h2>Resume Data</h2>
      <p>Id: {resumeData.id}</p>
      <p>Neo Reference ID: {resumeData.neo_reference_id}</p>
      <p>Name: {resumeData.name}</p>
      <p>Designation: {resumeData.designation}</p>
      <p>NASA JPL URL: {resumeData.nasa_jpl_url}</p>
      <p>Absolute Magnitude H: {resumeData.absolute_magnitude_h}</p>
      <p>Is Potentially Hazardous Asteroid: {resumeData.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>

      <h3>Estimated Diameter</h3>
      <p>Minimum Diameter (meters): {resumeData.estimated_diameter.meters.estimated_diameter_min}</p>
      <p>Maximum Diameter (meters): {resumeData.estimated_diameter.meters.estimated_diameter_max}</p>

      <h3>Close Approach Data</h3>
      {resumeData.close_approach_data.map((data, index) => (
        <div key={index}>
          <h4>Approach {index + 1}</h4>
          <p>Date: {data.close_approach_date_full}</p>
          <p>Relative Velocity (km/h): {data.relative_velocity.kilometers_per_hour}</p>
          <p>Miss Distance (kilometers): {data.miss_distance.kilometers}</p>
          <p>Orbiting Body: {data.orbiting_body}</p>
        </div>
      ))}

      <h3>Orbital Data</h3>
      <p>Orbit ID: {resumeData.orbital_data.orbit_id}</p>
      <p>Orbit Determination Date: {resumeData.orbital_data.orbit_determination_date}</p>
      <p>First Observation Date: {resumeData.orbital_data.first_observation_date}</p>
      <p>Last Observation Date: {resumeData.orbital_data.last_observation_date}</p>

    </div>
  );
};

export default Resume;

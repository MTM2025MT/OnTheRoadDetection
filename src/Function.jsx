
import axios from 'axios';
  //const apilink='https://potholeapi20251220015420-fkaxfhgze2e6c0eh.germanywestcentral-01.azurewebsites.net/';
const apilink='https://localhost:7099/';
 export function getByBounds(bounds) {
  const params = {
    first_latitude: bounds.getSouthWest().lat,
    first_longitude: bounds.getSouthWest().lng,
    second_latitude: bounds.getNorthEast().lat,
    second_longitude: bounds.getNorthEast().lng
  };
    if(!bounds){
      console.error("bounds is null");
    }
  return axios.get(`${apilink}api/Pothole/bounds`, { params })
    .then(response => {
      console.log('Potholes within bounds:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching potholes by bounds:', error);
    });
}
 export function getAllPotholes() {
    return axios.get(`${apilink}api/Pothole/GetAll`)
        .then(response => {
            //console.log('All potholes:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching all potholes:', error);
        }); 
}
export function getPotholeByIdFunction(id) {
    return axios.get(`${apilink}api/Pothole/${id}`)
        .then(response => {
            //console.log('Pothole by ID:', response.data);
            return response.data;
        }
        )
        .catch(error => {
            console.error('Error fetching pothole by ID:', error);
        });

}
export function getAllDistricts() {
    return axios.get(`${apilink}api/District/GetAllWithName`)
        .then(response => {
            //console.log('All districts:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching all districts:', error);
        }); 
}
export function getDistritcByIdFunction(id) {
    return axios.get(`${apilink}api/District/${id}`)
        .then(response => {
            //console.log('District by ID:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching district by ID:', error);
        }); 
}
export async function getPotholeByDistricts(id) {
    return await axios.get(`${apilink}api/Pothole/GetByDistrictId/${id}`)
        .then(response => {
            //console.log('Potholes by district:', response.data);
            return response.data;
        })
        .catch(error => {
            if (error.response.status === 404) 
                console.log('No potholes found for this district.');
            else    {
            console.error('Error fetching potholes by district:', error);
            }
        });
}
export async function getPotholeByNeighborhoodfunction(id) {
    return await axios.get(`${apilink}api/Pothole/GetByNeighbourhoodId/${id}`)
        .then(response => {
            //console.log('Potholes by neighborhood:', response.data);
            return response.data;
        })
        .catch(error => {
            if (error.response.status === 404)
                console.log('No potholes found for this neighborhood.');
            else {
            console.error('Error fetching potholes by neighborhood:', error);
            }
        });
}
export function getNeigberhoodsByDistrictFunction(id) {
    return axios.get(`${apilink}api/Neighbourhood/GetNeighbourhoodByDistrictId/${id}`)
        .then(response => {
            //console.log('Neighborhoods by district:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching neighborhoods by district:', error);
        }); 
}
export function getNeighborhoodByIdFunction(id) {
    return axios.get(`${apilink}api/Neighbourhood/${id}`)
        .then(response => {
            //console.log('Neighborhood by ID:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching neighborhood by ID:', error);
        });
}
export  function doesThePotholeExistWithTask(id) {
    return axios.get(`${apilink}api/Pothole/DoesPotholeAssociatedWithAnyJobTask/${id}`)
        .then(response => {
            //console.log('Is the pothole exist with task:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error checking if pothole exists with task:', error);
        }); 
}



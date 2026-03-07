const API_URL = "http://127.0.0.1:8000";

export async function predictRisk(data){

 const res = await fetch("http://127.0.0.1:8000/predict",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
 })

 return res.json()

}

export const getActiveFires = async () => {
  const response = await fetch(`${API_URL}/active-fires`);
  return response.json();
};

export const getWeather = async (lat, lon) => {
  const response = await fetch(
    `${API_URL}/weather?lat=${lat}&lon=${lon}`
  );
  return response.json();
};

export const getHeatmap = async () => {
  const response = await fetch(`${API_URL}/heatmap`);
  return response.json();
};
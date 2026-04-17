const API_URL = "http://127.0.0.1:8000";

export async function predictRisk(data) {

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
};

export const getActiveFires = async () => {
  const response = await fetch(`${API_URL}/active-fires`);
  return await response.json();
};

export const getWeather = async (lat, lon) => {
  const response = await fetch(
    `${API_URL}/weather?lat=${lat}&lon=${lon}`
  );
  return await response.json();
};

export const getHeatmap = async () => {
  const response = await fetch(`${API_URL}/heatmap`);
  return await response.json();
};

export const askAI = async (data) => {

  const res = await fetch(`${API_URL}/ai-analysis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
};
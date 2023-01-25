const fetchJSON = (method) => (url) => async (body) => {
  try {
    const headers = {};
    if (body) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }
    const response = await fetch(url, {
      method,
      body,
      headers,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const ClickRecorder = (name) =>
  (window.onclick = async (ev) => {
    const data = {
      x: ev.layerX,
      y: ev.layerY,
      name,
    };
    await fetchJSON("post")("http://localhost:3000/save-click")(data);
  });

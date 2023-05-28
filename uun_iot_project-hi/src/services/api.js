import axios from 'axios';

let session = UU5.Environment.getSession();

export const getSections = async () => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/SectionList";
    let headers = {
      "Authorization": `Bearer ${token.token}`
    };

    let response = await axios.get(url, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}


export const getSensors = async () => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/SensorList";
    let headers = {
      "Authorization": `Bearer ${token.token}`
    };

    let response = await axios.get(url, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}


export const getAlerts = async () => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/AlertList";
    let headers = {
      "Authorization": `Bearer ${token.token}`
    };

    let response = await axios.get(url, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}
export const getAlertHistory = async () => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/AlertHistoryList";
    let headers = {
      "Authorization": `Bearer ${token.token}`
    };

    let response = await axios.get(url, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}

export const updateSensor = async (sensorid, name) => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/SensorUpdate";
    let headers = {
      "Authorization": `Bearer ${token.token}`,
      "Content-Type": "application/json"
    };

    let data = {
      sensorid: sensorid,
      name: name
    };

    let response = await axios.post(url, data, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}

export const updateSection = async (id, name, sensorIds = []) => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/SectionUpdate";
    let headers = {
      "Authorization": `Bearer ${token.token}`,
      "Content-Type": "application/json"
    };

    let data = {
      id: id,
      name: name,
      sensorIds: sensorIds
    };

    let response = await axios.post(url, data, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}

export const createSection = async (name, sensorIds = []) => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/SectionCreate";
    let headers = {
      "Authorization": `Bearer ${token.token}`,
      "Content-Type": "application/json"
    };

    let data = {
      name: name,
      sensorIds: sensorIds
    };

    let response = await axios.post(url, data, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}

export const deleteSection = async (sectionId) => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/SectionDelete";
    let headers = {
      "Authorization": `Bearer ${token.token}`,
      "Content-Type": "application/json"
    };

    let data = {
      id: sectionId
    };

    let response = await axios.post(url, data, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}


export const alertCheck = async (alertId) => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/AlertCheck";
    let headers = {
      "Authorization": `Bearer ${token.token}`,
      "Content-Type": "application/json"
    };

    let data = {
      id: alertId
    };

    let response = await axios.post(url, data, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}


export const alertreset = async (alertId) => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/AlertReset";
    let headers = {
      "Authorization": `Bearer ${token.token}`,
      "Content-Type": "application/json"
    };

    let data = {
      id: alertId
    };

    let response = await axios.post(url, data, {
      headers: headers
    });

    return response.data;
  } else {
    throw new Error("No authenticated session found");
  }
}
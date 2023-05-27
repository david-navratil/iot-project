import axios from 'axios';

let session = UU5.Environment.getSession();

export const getSections = async () => {
  if (session && session.isAuthenticated()) {
    let token = session.getCallToken();
    let url = "http://localhost:8080/uun-iot-project/22222222222222222222222222222222/SectionList";
    console.log(token.token);
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

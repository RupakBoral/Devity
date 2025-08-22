import axios from "axios";
import { BASE_URL } from "./constants";

const uploadImage = async (base64String, setErr) => {
  try {
    const body = { Base64URI: base64String };

    const { data } = await axios.patch(
      BASE_URL + "/profile/upload-image",
      body,
      { withCredentials: true }
    );
    return data?.secure_url;
  } catch (err) {
    setErr(err);
  }
};

export default uploadImage;

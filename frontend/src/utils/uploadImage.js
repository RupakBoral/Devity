import axios from "axios";
import { BASE_URL } from "./constants";

const uploadImage = async (
  base64String,
  type,
  setBgUrl,
  setPhotoUrl,
  setErr
) => {
  try {
    const body = { Base64URI: base64String, imageType: type };

    const { data } = await axios.patch(
      BASE_URL + "/profile/upload-image",
      body,
      { withCredentials: true }
    );

    if (type === "photoUrl") setPhotoUrl(data?.secure_url);
    else setBgUrl(data?.secure_url);
  } catch (err) {
    setErr(err);
  }
};

export default uploadImage;

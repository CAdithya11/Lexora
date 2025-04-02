import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const profileControllerAPI = 'http://localhost:8080/api/v1/profile/';

const registrationAPI = 'http://localhost:8080/api/v1/auth/';

const resetPasswordAPI = 'http://localhost:8080/api/v1/password/';

const user = localStorage.getItem('user');
if (user != null) {
  const parsedUser = JSON.parse(user);
  const token = parsedUser.token;
  const user_id = parsedUser.user_id;
}

class profileSettings {
  constructor() {}

  createUser(UserData) {
    return axios.post(registrationAPI + 'register', UserData);
  }

  findUserProfileById(id) {
    return axios.get(profileControllerAPI + 'getProfile/' + id);
  }

  changePassword(changePassword, id) {
    console.log(changePassword);
    return axios.post(resetPasswordAPI + id, changePassword);
  }

  uploadProfileImage(profileImage) {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    return axios.post(profileControllerAPI + 'profileImage/' + user_id, formData, {
      Headers: { 'Content-Type': 'multipart/form-data', authorization: `Bearer ${token}` },
    });
  }

  updateProfileDetails(profileDetails) {
    console.log(profileDetails);
    return axios.post(`${profileControllerAPI}${user_id}`, profileDetails);
  }
}

const userProfileHandleService = new profileSettings();

export default userProfileHandleService;

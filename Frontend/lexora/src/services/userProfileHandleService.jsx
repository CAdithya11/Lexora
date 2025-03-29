import axios from 'axios';

const profileControllerAPI = 'http://localhost:8080/api/v1/profile/';

const registrationAPI = 'http://localhost:8080/api/v1/auth/';


class profileSettings {
  constructor() {}

  /* updateImage(){
        return axios.post();
    } */

  createUser(UserData) {
    return axios.post(registrationAPI + 'register', UserData);
  }

  findUserById(id){
    return axios.get(profileControllerAPI + id);
  }
}

const userProfileHandleService = new profileSettings();

export default userProfileHandleService;

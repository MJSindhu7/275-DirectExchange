import axios from 'axios';

const CARGO_API_BASE_URL = "/cargos";
const MASTER_CARGO_API_BASE_URL = "/mastercargos";

class CargoService {

    getCargos() {
        return axios.get(CARGO_API_BASE_URL, '/');
    }

    createCargos(cargo) {
           return axios.post(CARGO_API_BASE_URL+'/add' , cargo,{headers: {"Content-Type": "application/json"}});
        // return axios.put(CARGO_API_BASE_URL, '/add', { "body": cargo }, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        // )
    }

    getCargoById(cargoID) {
        return axios.get(CARGO_API_BASE_URL + '/byid/' + cargoID);
    }

    updateCargo(cargo) {
        return axios.put(CARGO_API_BASE_URL + '/update', cargo,{headers: {"Content-Type": "application/json"}});
    }

    deleteCargo(cargoID) {
        return axios.delete(CARGO_API_BASE_URL + '/' + cargoID);
    }

    getAllsensors() {
        return axios.get(CARGO_API_BASE_URL+'/allsensors');
    }

    getMasterCargos() {
        return axios.get(MASTER_CARGO_API_BASE_URL+ '/');
    }

    createMasterCargos(cargo) {
           return axios.post(MASTER_CARGO_API_BASE_URL+'/add' , cargo,{headers: {"Content-Type": "application/json"}});
        // return axios.put(CARGO_API_BASE_URL, '/add', { "body": cargo }, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        // )
    }

    getMasterCargoById(cargoID) {
       return axios.get(MASTER_CARGO_API_BASE_URL + '/byid/' + cargoID);
    }

    updateMasterCargo(cargo) {
        return axios.put(MASTER_CARGO_API_BASE_URL + '/update', cargo,{headers: {"Content-Type": "application/json"}});
    }

    deleteMasterCargo(cargoID) {
        return axios.delete(MASTER_CARGO_API_BASE_URL + '/delete/' + cargoID);
    }

    // getAllsensors() {
    //     return axios.get(MASTER_CARGO_API_BASE_URL+'/allsensors');
    // }
}

export default new CargoService()
import axios from 'axios';

const DIRECT_EXCHANGE_URL = "/bank";

class CargoService {


    addBankAccount(bankacount) {
        console.log(bankacount)
        return axios.post(DIRECT_EXCHANGE_URL + '/bankaccounts/' , bankacount);
    }

    listBankAccounts() {
        return axios.get(DIRECT_EXCHANGE_URL+'/listbankaccounts/');
    }


}

export default new CargoService()
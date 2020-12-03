import axios from "axios";

const DIRECT_EXCHANGE_BANK_URL = "/bank";
const DIRECT_EXCHANGE_Offers_URL = "/offers";
const DIRECT_EXCHANGE_Users_URL = "/user";

class DirectExchangeService {


    addBankAccount(bankaccount) {
        console.log(bankaccount)
        return axios.post(DIRECT_EXCHANGE_BANK_URL + '/bankaccounts/' , bankaccount);
    }

    listBankAccounts() {
        return axios.get(DIRECT_EXCHANGE_BANK_URL+'/listbankaccounts/');
    }

    addExchangeOffer(offer) {
        console.log(offer)
        return axios.post(DIRECT_EXCHANGE_Offers_URL + '/saveoffer/' , offer);
    }

    listAllExchangeOffer() {
        return axios.get(DIRECT_EXCHANGE_Offers_URL + '/alloffers');
    }
    
    listUsersExchangeOffer(username) {
        console.log(username)
        return axios.get(DIRECT_EXCHANGE_Offers_URL + '/' + username);
    }
     addUsertoDirectExchange(user) {
    console.log(user);
    return axios.post(DIRECT_EXCHANGE_Users_URL + "/adduser", user);
  }

}

export default new DirectExchangeService()

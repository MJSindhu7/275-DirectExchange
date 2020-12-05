import axios from "axios";

const DIRECT_EXCHANGE_BANK_URL = "/bank";
const DIRECT_EXCHANGE_Offers_URL = "/offers";
const DIRECT_EXCHANGE_Transaction_URL = "/exchange";
const DIRECT_EXCHANGE_Users_URL = "/user";
class DirectExchangeService {
  addBankAccount(bankacount) {
    console.log(bankacount);
    return axios.post(DIRECT_EXCHANGE_BANK_URL + "/bankaccounts/", bankacount);
  }

  listBankAccounts() {
    return axios.get(DIRECT_EXCHANGE_BANK_URL + "/listbankaccounts/");
  }

  getBankAccountsByUser(userid) {
    return axios.get(DIRECT_EXCHANGE_BANK_URL + "/byusername/" + userid);
  }

  addPostOffer(offer) {
    console.log(offer);
    return axios.post(DIRECT_EXCHANGE_Offers_URL + "/saveoffer/", offer);
  }

  listAllExchangeOffer() {
    return axios.get(DIRECT_EXCHANGE_Offers_URL + "/alloffers");
  }

  listUsersExchangeOffer(username) {
    console.log(username);
    return axios.get(DIRECT_EXCHANGE_Offers_URL + "/" + username);
  }

  startExchaange(transaction) {
    console.log(transaction);
    return axios.post(
      DIRECT_EXCHANGE_Transaction_URL + "/startexchange/",
      transaction,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  addUsertoDirectExchange(user) {
    console.log(user);
    return axios.post(DIRECT_EXCHANGE_Users_URL + "/adduser", user);
  }

  getNickName(user) {
    console.log(user);
    return axios.get(DIRECT_EXCHANGE_Users_URL + "/getuserNickname/" + user);
  }
}

export default new DirectExchangeService();

import axios from "axios";

const DIRECT_EXCHANGE_BANK_URL = "/bank";
const DIRECT_EXCHANGE_Offers_URL = "/offers";
const DIRECT_EXCHANGE_Transaction_URL = "/exchange";
const DIRECT_EXCHANGE_Users_URL = "/user";
const DIRECT_EXCHANGE_Rates_URL = "/rates";
const AUTOMATCH_ = "/automatch";

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

  getOfferById(id) {
    return axios.get(DIRECT_EXCHANGE_Offers_URL + "/getofferbyid/" + id);
  }

  addPostOffer(offer) {
    console.log(offer);
    return axios.post(DIRECT_EXCHANGE_Offers_URL + "/saveoffer/", offer);
  }

  updateOffer(offer) {
    console.log(offer);
    return axios.put(DIRECT_EXCHANGE_Offers_URL + "/updateoffer/", offer);
  }

  deleteOffer(id) {
    console.log(id);
    return axios.delete(DIRECT_EXCHANGE_Offers_URL + "/deleteoffer/"+id);
  }

  listAllExchangeOffer() {
    return axios.get(DIRECT_EXCHANGE_Offers_URL + "/alloffers");
  }

  listUsersExchangeOffer(username) {
    console.log(username);
    return axios.get(DIRECT_EXCHANGE_Offers_URL + "/" + username);
  }

  listUsersTransactions(username,status) {
    console.log(username);
    return axios.get(DIRECT_EXCHANGE_Transaction_URL + "/transactionstatus/" + username+"/"+status);
  }

  listAllCurrecyRates() {
    return axios.get(DIRECT_EXCHANGE_Rates_URL + "/getall");
  }

  acceptOffer(transaction) {
    console.log(transaction);
    return axios.post(
      DIRECT_EXCHANGE_Transaction_URL + "/directaccept/",
      transaction,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  counterOffer(transaction) {
    console.log(transaction);
    return axios.post(
      DIRECT_EXCHANGE_Transaction_URL + "/counteroffer/",
      transaction,
      { headers: { "Content-Type": "application/json" } }
    );
  }

  exchangeaction(userid,action){
    return axios.post(DIRECT_EXCHANGE_Transaction_URL + "/exchangeaction/"+userid+"/"+action);
  }

  addUsertoDirectExchange(user) {
    console.log(user);
    return axios.post(DIRECT_EXCHANGE_Users_URL + "/adduser", user);
  }

  getNickName(user) {
    console.log(user);
    return axios.get(DIRECT_EXCHANGE_Users_URL + "/getuserNickname/" + user);
  }

  getCurrencyConverter(from,to){

    return axios.get(`http://api.openrates.io/latest?base=${
      from
    }&symbols=${to}`)

  }
  getSingleAutomatchingoffers(offerid) {
    console.log(offerid);
    return axios.get(AUTOMATCH_ + "/getSingleOffers/" + offerid);
  }

  getSplitAutomatchingoffers(offerid) {
    console.log(offerid);
    return axios.get(AUTOMATCH_ + "/getSplitOffers/" + offerid);
  }
  getTransactionHistory(username) {
    console.log(username);
    return axios.get(DIRECT_EXCHANGE_Transaction_URL + "/transactionhistory/" + username);
  }

  updateUserRating(username) {
    console.log(username);
    return axios.get(DIRECT_EXCHANGE_Users_URL + "/updaterRating/" + username);
  }
}

export default new DirectExchangeService();

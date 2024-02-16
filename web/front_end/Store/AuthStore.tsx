import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import localForage from 'localforage';
import {Store} from './Store';

export class AuthStore {
  store: Store;

  loggedIn: boolean = false;
  userID: number = -1;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  pw: string = '';
  createUserLoading: boolean = false;
  loginLoading: boolean = false;
  loginErrorMsg: string = '';

  createAccountModalOpen: boolean = false;
  infoModalOpen: boolean = false;
  infoModalTitle: string = '';
  infoModalMsg: string = '';

  constructor(store: Store) {
    this.store = store;
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'AuthStore',
      properties: [
        'loggedIn',
        'userID',
        'firstName',
        'lastName',
        'email',
        'username',
      ],
      storage: localForage,
    });
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  setUserID(id: number) {
    this.userID = id;
  }

  setFirstName(name: string) {
    this.firstName = name;
  }

  setLastName(name: string) {
    this.lastName = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setUsername(un: string) {
    this.username = un;
  }

  setPW(pw: string) {
    this.pw = pw;
  }

  setCreateUserLoading(load: boolean) {
    this.createUserLoading = load;
  }

  setloginLoading(load: boolean) {
    this.loginLoading = load;
  }

  setLoginErrorMsg(msg: string) {
    this.loginErrorMsg = msg;
  }

  setCreateAccountModalOpen(bool: boolean) {
    this.createAccountModalOpen = bool;
  }

  setInfoModalOpen(bool: boolean) {
    this.infoModalOpen = bool;
  }

  setInfoModalTitle(title: string) {
    this.infoModalTitle = title;
  }

  setInfoModalMsg(msg: string) {
    this.infoModalMsg = msg;
  }
}

export default AuthStore;

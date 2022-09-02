import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import localForage from 'localforage';
import {Store} from './Store';

export class AuthStore {
  store: Store;

  loggedIn: boolean = false;
  username: string = '';
  pw: string = '';
  createUserLoading: boolean = false;
  loginLoading: boolean = false;

  createAccountModalOpen: boolean = false;
  infoModalOpen: boolean = false;
  infoModalTitle: string = '';
  infoModalMsg: string = '';

  constructor(store: Store) {
    this.store = store;
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'AuthStore',
      properties: ['loggedIn'],
      storage: localForage,
    });
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
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

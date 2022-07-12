import {makeAutoObservable} from 'mobx';

export interface IEvent {
  event_id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  participant_count: number;
}

export class Store {
  events: IEvent[] = [];
  newEventModalOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setEvents(events: IEvent[]) {
    this.events = events;
  }

  setNewEventModalOpen(bool: boolean) {
    this.newEventModalOpen = bool;
  }
}

const store = new Store();

export default store;

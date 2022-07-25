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
  selectedEvent: IEvent | undefined = undefined;
  newEventModalOpen: boolean = false;
  newDateModalOpen: boolean = false;
  newMealModalOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setEvents(events: IEvent[]) {
    this.events = events;
  }

  setSelectedEvent(event: IEvent) {
    this.selectedEvent = event;
  }

  setNewEventModalOpen(bool: boolean) {
    this.newEventModalOpen = bool;
  }

  setNewDateModalOpen(bool: boolean) {
    this.newDateModalOpen = bool;
  }

  setNewMealModalOpen(bool: boolean) {
    this.newMealModalOpen = bool;
  }
}

const store = new Store();

export default store;

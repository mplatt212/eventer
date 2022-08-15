import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import localForage from 'localforage';

export type MealTypes = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface IEvent {
  event_id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  participant_count: number;
}

export interface IMeal {
  meal_id: number;
  meal: MealTypes;
}

export interface IMealDay {
  meal_id: number;
  event_id: number;
  date: string;
  meals: IMeal[];
}

export class Store {
  //Event Variables
  events: IEvent[] = [];
  selectedEvent: IEvent | undefined = undefined;

  //Meal Variables
  meals: IMealDay[] = [];

  //Modal Variables
  newEventModalOpen: boolean = false;
  newDateModalOpen: boolean = false;
  newMealModalOpen: boolean = false;
  newMenuItemModalOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'Store',
      properties: ['selectedEvent'],
      storage: localForage,
    });
  }

  setEvents(events: IEvent[]) {
    this.events = events;
  }

  setSelectedEvent(event: IEvent) {
    this.selectedEvent = event;
  }

  setMeals(meals: IMealDay[]) {
    this.meals = meals;
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

  setNewMenuItemModalOpen(bool: boolean) {
    this.newMenuItemModalOpen = bool;
  }
}

const store = new Store();

export default store;

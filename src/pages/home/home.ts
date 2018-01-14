import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as Fuse from 'fuse.js';
import * as _ from 'lodash';
import { caffeineData, CaffeineItem } from '../../caffeineData';

interface CaffeineEntry {
  timestamp: number;
  item: CaffeineItem;
}

interface JournalDay {
  day: Date;
  entries: Array<CaffeineEntry>;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchResults: Array<any>;
  todaysEntries: Array<CaffeineEntry> = [];
  todaysTotal: number;

  constructor(public navCtrl: NavController) {

  }

  getItems(event) {
    const searchByText = event.srcElement.value;
    const fuseOptions: Fuse.FuseOptions = {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name"]
    }
    const fuseSearch = new Fuse(caffeineData, fuseOptions);
    const result = fuseSearch.search(searchByText);
    this.searchResults = result.slice(0, 6);
  }

  selectItem(item: CaffeineItem) {
    const newEntry: CaffeineEntry = {
      timestamp: Date.now(),
      item
    }
    this.todaysEntries.push(newEntry);
    this.searchResults = [];
    this.setTotalIntake(this.todaysEntries);
    console.log(this.todaysTotal)
  }

  setTotalIntake(entries: Array<CaffeineEntry>) {
    let total: number = _.map(entries, (entry) => {
      return _.reduce(entry.item.totalCaffeine, (prev, next) => {
        console.log(Number(prev) + Number(next));
        return prev + next
      })
    })
    console.log(;
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as Fuse from 'fuse.js';
import * as _ from 'lodash';
import { caffeineData, CaffeineItem } from '../../models/caffeineData';
import * as moment from 'moment';

interface CaffeineEntry {
  timestamp: moment.RelativeTimeKey;
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
  todaysTotal: number = 0;
  todaysDate: String;

  constructor(
    public navCtrl: NavController,
  ) {
    this.todaysDate = new Date().toISOString();

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
      timestamp: moment().format('h:mm a'),
      item
    }
    // adds entry to our day
    this.todaysEntries.push(newEntry);

    // clears the search results
    this.searchResults = [];

    // update the total
    this.todaysTotal = Number(this.todaysTotal) + Number(item.totalCaffeine);
  }

}

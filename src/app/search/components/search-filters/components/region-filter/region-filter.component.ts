import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILocation } from "public/store/layout";
import { SearchActionTypes } from "public/store/search/search.actions";
import { Store } from "@ngrx/store";
import { IAppState } from "public/store";

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.less']
})
export class RegionFilterComponent implements OnInit {
  @Input() locations: Array<Object>;
  @Output() onSelected = new EventEmitter<number>();
  @Input() selectedLocation: ILocation;
  @Input() locationLevels: Array<ILocation>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.loadSelectedLocation();
  }

  emitSelection(selection: number) {
    if(selection === null) {
      this.store.dispatch({
        type: SearchActionTypes.CLEAR_LOCATION_SELECTION
      });
      return this.onSelected.emit(null);
    }

    if (selection != this.selectedLocationId) {
      this.onSelected.emit(selection);
      this.loadSelectedLocation(selection)
      this.store.dispatch({
        type: SearchActionTypes.GET_SELECTED_LOCATION, payload: selection
      });
    }
  }

  get selectedLocationId() {
    return this.selectedLocation && this.selectedLocation.id
  }

  private loadSelectedLocation(selectedLocationId = null) {
    selectedLocationId |= this.selectedLocationId;

    if (!selectedLocationId) { return }

    this.store.dispatch({
      type: SearchActionTypes.GET_SELECTED_LOCATION, payload: selectedLocationId
    });
  }

}

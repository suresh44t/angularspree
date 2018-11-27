import { SearchFilterConfigService } from './../services/search-filter-config.service';
import { ICategory } from './../../store/layout/layout.reducer';
import { Subscription } from 'rxjs/Subscription';
import { ILocation } from './../../store/postad/postad.reducer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IAppState } from './../../store/index';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import CSearchFilter from "public/search/models/search-filter.model";
import { ISearch } from "public/store/search";
import { ISearchBox } from "public/store/layout";

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFiltersComponent implements OnInit, OnDestroy, OnChanges {
  locations$: Observable<ILocation[]>;
  categories$: Observable<ICategory[]>;
  searchFilters = new CSearchFilter();
  searchFilterSubject$ = new Subject<CSearchFilter>();
  searchfilterSubs: Subscription;
  @Output() searchFilterChanged = new EventEmitter<Object>();
  @Input() searchResponse: ISearch;
  @Input() searchBox: ISearchBox;
  isFiltersChanged = false;

  constructor(
    private store: Store<IAppState>,
    private filterConf: SearchFilterConfigService
  ) { }

  ngOnInit() {
    this.searchfilterSubs = this.searchFilterSubject$
      .distinctUntilChanged()
      .subscribe(next =>
        this.searchFilterChanged.emit(next)
      );

    this.setLocations();
    this.setCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    const searchBoxChanges = changes['searchBox']
    if(searchBoxChanges && searchBoxChanges.currentValue != searchBoxChanges.previousValue) {
      this.searchFilters = searchBoxChanges.currentValue;
      this.searchFilterChanged.emit(searchBoxChanges.currentValue);
    }
  }

  setLocations() {
    this.locations$ = this.store.select('layout').pluck('locations');
  }

  setCategories() {
    this.categories$ = this.store.select('layout').pluck('categories');
  }

  /**
   * 
   * 
   * @param {any} filter_name 
   * @param {any} value 
   * @memberof SearchFiltersComponent
   */
  OnFilterUpdateSelected(filter_name, value) {
    this.pushToFilterObject({ [filter_name]: value });
  }

  /**
   * 
   * 
   * @param {any} filter_name 
   * @param {any} value 
   * @memberof SearchFiltersComponent
   */
  OnRangeFilterUpdateSelected(filter_name, value) {
    let newRange = this.searchFilters.range;
    if (value) {
      newRange = { ...newRange, [filter_name]: value }
    } else {
      delete newRange[filter_name]
    }

    this.pushToFilterObject({ range: newRange })
  }

  /**
   * 
   * 
   * @param {any} filter_name 
   * @param {any} booleanValue 
   * @memberof SearchFiltersComponent
   */
  OnBooleanFilterUpdateSelected(filterName, booleanValue) {
    const filters = (
      this.searchFilters.filters || []
    ).filter(filter => filter != filterName)

    this.pushToFilterObject({
      filters: booleanValue ? [...filters, filterName] : filters
    });
  }

  /**
   * 
   * 
   * @param {*} changedAttribute 
   * @param {string} attributeVal 
   * @memberof SearchFiltersComponent
   */
  OnAttributeFilterUpdateSelected(changedAttr: any, changedAttrVal: string) {
    const attributes = (
      this.searchFilters.attributes || []
    ).filter(attribute => attribute.name != changedAttr.name)

    const newAttr = {name: changedAttr.name, value: changedAttrVal}

    this.pushToFilterObject({
      attributes: changedAttrVal ? [...attributes, newAttr] : attributes
    });
  }

  clearAttributes() {
    this.pushToFilterObject({attributes: null});
  }

  ngOnDestroy() {
    this.searchfilterSubs.unsubscribe();
  }

  /**
   * 
   * 
   * @readonly
   * @memberof SearchFiltersComponent
   */
  get setDistanceSelectConfig() {
    return this.filterConf.configDistanceSelect(this.searchResponse.distance);
  }

  /**
   * 
   * 
   * @param {any} [innerObject={}] 
   * @memberof SearchFiltersComponent
   */
  pushToFilterObject(innerObject = {}) {
    this.searchFilters = {
      ...this.searchFilters,
      ...innerObject
    };
    this.searchFilterSubject$.next(this.searchFilters);
    this.isFiltersChanged = true;
  }

  isSelectedAttr(attribute) {
    return (
      this.searchResponse.attributes || []
    ).find(attr => attr.name == attribute.name);
  }

}

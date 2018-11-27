import { SearchActionTypes} from './../../../../store/search/search.actions';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICategory } from "public/store/layout";
import { Store } from "@ngrx/store";
import { IAppState } from "public/store";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFilterComponent implements OnInit {
  @Input() categories: ICategory[];
  @Output() onSelected = new EventEmitter<number>();
  @Input() selectedCategory: ICategory;
  @Input() categoryLevels: Array<ICategory>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.loadSelectedCategory();
  }

  emitSelection(selection: number) {
    if(selection === null) {
      this.store.dispatch({
        type: SearchActionTypes.CLEAR_CATEGORY_SELECTION
      });
      return this.onSelected.emit(null);
    }

    if (selection != this.selectedCategoryId) {
      this.onSelected.emit(selection);
      this.loadSelectedCategory(selection)
      this.store.dispatch({
        type: SearchActionTypes.GET_SELECTED_CATEGORY, payload: selection
      });
    }
  }

  get selectedCategoryId() {
    return this.selectedCategory && this.selectedCategory.id
  }

  private loadSelectedCategory(selectedCategoryId = null) {
    selectedCategoryId |= this.selectedCategoryId;

    if (!selectedCategoryId) { return }

    this.store.dispatch({
      type: SearchActionTypes.GET_SELECTED_CATEGORY, payload: selectedCategoryId
    });
  }

}

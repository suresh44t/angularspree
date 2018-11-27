import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-attributes-filter',
  templateUrl: './attributes-list-filter.component.html',
  styleUrls: ['./attributes-list-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesListFilterComponent implements OnInit {
  @Input() itemDisplayNameField: string;
  @Input() itemSelectionValueField: string;
  @Input() title: string;
  @Output() onSelected = new EventEmitter<any>();
  @Input() selectedItem: any;
  @Input() collection: Array<any>;
  isShowMore = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  emitSelection(selection: any) {
    this.onSelected.emit(selection);
    this.isShowMore = false;
    this.elementRef.nativeElement.scrollIntoViewIfNeeded();
  }

  showMore() {
    this.isShowMore = true;
  }

  isSelectedItem(item) {
    return this.selectedItemVal == item[this.itemSelectionValueField];
  }

  get actualCollection() {
    const collection = this.collection && [
      ...this.collection.filter(item => item.name === this.selectedItemVal),
      ...this.collection.filter(item => item.name != this.selectedItemVal)
    ];

    if (
      !this.isShowMore && collection && collection.length > 10
    ) { collection.splice(5) }

    return collection;
  }

  get selectedItemVal() {
    return (this.selectedItem || {}).value
  }

}

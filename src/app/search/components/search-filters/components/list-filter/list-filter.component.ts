import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';

interface Ioption { name: string; id: string; }

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFilterComponent implements OnInit {
  @Input() itemDisplayNameField: string;
  @Input() itemSelectionValueField: string;
  @Input() topLevel: any;
  @Input() title: string;
  @Output() onSelected = new EventEmitter<any>();
  @Input() selectedItem: any;
  @Input() parentPath: Array<any>;

  constructor() { }

  ngOnInit() { }

  emitSelection(selection: any) {
    this.onSelected.emit(selection);
  }

  get selectedItemId() {
    return this.selectedItem &&
      this.selectedItem[this.itemSelectionValueField]
  }
}

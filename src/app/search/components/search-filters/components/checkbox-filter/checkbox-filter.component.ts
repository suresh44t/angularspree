import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.less']
})
export class CheckboxFilterComponent implements OnInit {
  @Input() title: string;
  @Output() onSelected = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
  }

  emitSelection(status: boolean) {
    this.onSelected.emit(status);
  }

}

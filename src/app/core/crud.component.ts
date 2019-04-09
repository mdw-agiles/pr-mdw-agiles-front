import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-crud',
  templateUrl: 'crud.component.html'
})
export class CrudComponent {

  @Input() title = 'Management';
  @Input() columns: Array<String>;
  @Input() createAction = true;
  @Input() readAction = true;
  @Input() updateAction = true;
  @Input() deleteAction = true;
  @Output() create = new EventEmitter<any>();
  @Output() read = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  dataSource: MatTableDataSource<any>;

  @Input()
  set data(data: any[]) {
    this.dataSource = new MatTableDataSource<any>(data);
  }

  onRead(item) {
    this.read.emit(item);
  }

  onCreate() {
    this.create.emit();
  }

  onUpdate(item) {
    this.update.emit(item);
  }

  onDelete(item) {
    this.delete.emit(item);
  }

}

import { Component, Input, EventEmitter, Output } from '@angular/core';
interface Task {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  userId: string;
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Input() tasks: Task[] = [];
  backup: any = this.tasks;
  selectedPriority: string = '';
  selectedSort: string = '';
  selectedStatus: string = '';
  filters: any = [];
  @Output() filteredData: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {

  }
  filterAndSortTasks(type?: string, value?: string) {
    const existingFilterIndex = this.filters?.findIndex((filter: { type: string }) => filter.type === type);

    if (existingFilterIndex !== -1) {
      this.filters[existingFilterIndex] = { type: type, value: value };
    } else {
      this.filters.push({ type: type, value: value });
    }

    console.log(this.filters);

    let filteredTasks = this.tasks;

    this.filters.forEach((element: any) => {
      if (element.type === 'priority') {
        filteredTasks = filteredTasks.filter(task => task.priority === element.value);
      }

      if (element.type === 'status') {
        filteredTasks = filteredTasks.filter(task => task.status === element.value);
      }
      if (element.type === 'date') {
        filteredTasks.sort((taskA, taskB) => {
          const dateA = new Date(taskA.dueDate);
          const dateB = new Date(taskB.dueDate);

          if (element.value === 'ascending') {
            return dateA.getTime() - dateB.getTime();
          }

          if (element.value === 'descending') {
            return dateB.getTime() - dateA.getTime();
          }

          return 0;
        });
      }
    });
    this.filteredData.emit(filteredTasks);
    console.log(filteredTasks);
  }
  removeFilters() {
    this.filteredData.emit(this.tasks)
    this.selectedPriority = '';
    this.selectedSort = '';
    this.selectedStatus = '';
  }
}





import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Observable } from 'rxjs';

interface Todo {
  id: number
  content: string
  done: boolean
  seq: number
  createdAt: Date
  updateAt: Date
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
  public $todos: Observable<any>;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.$todos = this.todoService.getList();
  }

  public updateList = () => this.$todos = this.todoService.getList();

  public toggleNewTask = () => {
    const elNewTask: HTMLElement = document.querySelector('.new-task');
    const elInputContent: HTMLInputElement = document.querySelector('#todo-text');

    elInputContent.value = '';
    elNewTask.classList.toggle('blind');
  }

  public addTask = () => {
    const elInputContent: HTMLInputElement = document.querySelector('#todo-text');

    this.todoService.addTask({ content: elInputContent.value })
      .subscribe((res) => {

        this.toggleNewTask();
        this.updateList();
      })
  }

  public removeTask = ($event, item) => {
    this.todoService.removeTask(item.id)
      .subscribe((res) => {
        $event.target.parentElement.classList.toggle('remove');
      })
  }

  public completeTask = ($event, item) => {
    const isDone = !$event.currentTarget.parentElement.classList.contains('done');

    this.todoService.completeTask(item.id, { done: isDone.toString() })
      .subscribe((res) => {
        this.updateList();
      })
  }

  public editTask = ($event, item) => {
    const elTarget: any = event.currentTarget;
    const elTodoInput = elTarget.parentElement.querySelector('.todo-input');

    if (elTodoInput.disabled) {
      elTodoInput.disabled = false;
      elTodoInput.focus();
    }
  }

  public updateTask = ($event, item) => {
    const elTarget = event.currentTarget;
    const content = $event.target.value;
    this.todoService.updateTask(item.id, { content: content })
      .subscribe((res) => {
        this.updateList();
      })
  }

  public sortedByContent = () => {
    this.$todos = this.todoService.getList('content');
  }

  public sortedByDate = () => {
    this.$todos = this.todoService.getList('date');
  }

  public onItemDrop(e: any) {
    const targetSeq = e.nativeEvent.currentTarget.dataset.seq;
    const item = e.dragData;
    this.todoService.changeTaskSequence(item.id, { seq: targetSeq })
      .subscribe((res) => {
        this.updateList();
      });
  }
}

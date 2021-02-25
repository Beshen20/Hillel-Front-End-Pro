import {
    TodoListView
} from "../view/TodoListView.js";
import {
    Collection
} from "../model/Collection.js";
import {
    TodoFormView
} from "../view/NewTodoFormView.js";

export const API_URL = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io";
export const TODOS_URL = API_URL + "/todos";
export class Controller {
    constructor($container) {
        this.$container = $container;
        this.addNewForm = new TodoFormView({
            onAdd: (task) => this.addNew(task),
        });
        this.todosCollection = new Collection(TODOS_URL);
        this.todosCollection.fetch().then(() => {
            this.renderList();
            this.addNewForm.appendTo($container);
        });
        this.listView = new TodoListView({
            onDelete: (id) => this.deleteTodo(id),
            onToggle: (id) => this.toggleTodo(id),
        });
        this.listView.appendTo($container);
    }
    renderList() {
        this.listView.renderList(this.todosCollection.getList());
    }
    deleteTodo(id) {
        this.todosCollection.delete(id).then(() => this.listView.removeElement(id));
    }
    addNew(task) {
        this.todosCollection.add(task).then(() => this.renderList());
    }
    toggleTodo(id) {
        this.todosCollection
            .toggle(id)
            .then(() => this.listView.renderElement(this.todosCollection.get(id)));
    }
}
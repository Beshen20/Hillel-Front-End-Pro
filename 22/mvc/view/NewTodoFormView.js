export class TodoFormView {
    constructor(task) {
        this._task = task;
        this._$el = this.initView();
        this.$taskInput = this._$el.find("#taskNameInput");
    }
    initView() {
        return $(`<form id="addTaskForm">
                    <input type="text" id="taskNameInput">
                    <input type="submit" value="Add new task">
                </form>`).on("submit", (e) => this.onFormSubmit(e));
    }
    appendTo($container) {
        this._$el.appendTo($container);
    }
    onFormSubmit(e) {
        e.preventDefault();

        const task = {
            title: this.$taskInput.val(),
        };
        this._task.onAdd(task);
        this.clear();
    }
    clear() {
        this.$taskInput.val("");
    }
}
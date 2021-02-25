export const DELETE_BTN_SELECTOR = ".delete-btn";
export const TODO_ITEM_SELECTOR = ".todo";
export class TodoListView {
    constructor(options) {
        this._$el = this.initView();
        this._options = options;
    }
    initView() {
        return $('<ul class="todo-list"></ul>')
            .on("click", DELETE_BTN_SELECTOR, this.onDeleteBtnClick.bind(this))
            .on("click", TODO_ITEM_SELECTOR, this.onItemClick.bind(this));
    }
    appendTo($container) {
        this._$el.appendTo($container);
    }
    renderList(list) {
        const html = list.map((item) => this.generateItemHtml(item)).join("");
        this._$el.html(html);
    }
    generateItemHtml(item) {
        return `<li class="todo ${item.completed ? "done" : ""}" data-id="${
      item.id
    }">
        ${item.title}
        <span class="delete-btn">X</span>
        </li>`;
    }
    onDeleteBtnClick(e) {
        e.stopPropagation();
        const id = this.getElementId(e.target);
        this._options.onDelete(id);
    }
    onItemClick(e) {
        const id = this.getElementId(e.target);
        this._options.onToggle(id);
    }
    getElementId(el) {
        const parent = el.closest(TODO_ITEM_SELECTOR);
        return parent && parent.dataset.id;
    }
    removeElement(id) {
        this._$el.find(`[data-id="${id}"]`).remove();
    }
    renderElement(item) {
        const itemHtml = this.generateItemHtml(item);
        this._$el.find(`[data-id="${item.id}"]`).replaceWith(itemHtml);
    }
}
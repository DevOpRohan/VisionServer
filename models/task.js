class Task{
    construtor(id, description, category, dueDate,createdAt) {
        this.id = id;
        this.description = description;
        this.category = category;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
    }
}

module.exports = Task;
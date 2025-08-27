class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: %i[show update destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :todo_not_found

  def index
    render json: Todo.all
  end

  def show
    render json: @todo
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo, status: :created
    else
      render_errors(todo)
    end
  end

  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render_errors(@todo)
    end
  end

  def destroy
    if @todo.destroy
      render json: { message: "Todo deleted successfully" }, status: :ok
    else
      render json: { error: "Failed to delete Todo" }, status: :unprocessable_entity
    end
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :completed)
  end

  def render_errors(resource)
    render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
  end

  def todo_not_found
    render json: { error: "Todo not found" }, status: :not_found
  end
end

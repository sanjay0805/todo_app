SentimentAnalysisJob = Struct.new(:todo_id) do
  def perform
    todo = Todo.find_by(id: todo_id)
    return unless todo

    result = SentimentAnalysisService.new(todo.title).call
    todo.build_sentiment_analysis(label: result[:label], confidence: result[:confidence]).save!
  rescue => e
    Rails.logger.error "[SentimentAnalysisJob] Failed for Todo ID #{todo_id}: #{e.message}"
    todo&.build_sentiment_analysis(label: "Neutral", confidence: 0.0)&.save!
  end

  def destroy_failed_jobs?
    false
  end
end

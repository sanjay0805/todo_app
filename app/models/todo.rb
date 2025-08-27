class Todo < ApplicationRecord
  validates :title, presence: true
  has_one :sentiment_analysis, dependent: :destroy

  after_commit :enqueue_sentiment_analysis

  private

  def enqueue_sentiment_analysis
    Delayed::Job.enqueue SentimentAnalysisJob.new(id)
  end
end

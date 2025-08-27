class SentimentAnalysis < ApplicationRecord
  belongs_to :todo

  VALID_LABELS = %w[Positive Negative Neutral].freeze

  validates :label, presence: true, inclusion: { in: VALID_LABELS }
  validates :confidence, numericality: { greater_than_or_equal_to: 0.0, less_than_or_equal_to: 1.0 }
end

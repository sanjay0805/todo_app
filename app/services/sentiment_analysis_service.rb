class SentimentAnalysisService
  VALID_LABELS = %w[Positive Negative Neutral].freeze
  ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent".freeze

  def initialize(title)
    @title = title
    @api_key = ENV["GENAI_API_KEY"]
  end

  def call
    return default_result unless @api_key

    response_body = post_request
    raw_output = extract_raw_output(response_body)
    normalize(raw_output)
  rescue => e
    Rails.logger.error "[SentimentAnalysisService] Failed for '#{@title}': #{e.class} - #{e.message}"
    default_result
  end

  private

  def post_request
    conn = Faraday.new(url: ENDPOINT)
    response = conn.post do |req|
      req.headers["Content-Type"] = "application/json"
      req.headers["X-goog-api-key"] = @api_key
      req.body = { contents: [ { parts: [ { text: prompt } ] } ] }.to_json
    end
    JSON.parse(response.body)
  end

  def prompt
    <<~PROMPT
      Classify todo title as Positive, Negative, or Neutral. Return JSON: {"label":"...","confidence":...}
      Todo title: '#{@title}'
    PROMPT
  end

  def extract_raw_output(body)
    body.dig("candidates", 0, "content", "parts", 0, "text").to_s
  end

  def normalize(output)
    cleaned = output.gsub(/```json|```/, "").strip
    parsed = JSON.parse(cleaned) rescue nil
    return default_result unless parsed

    label = VALID_LABELS.find { |lbl| lbl.casecmp?(parsed["label"]) } || "Neutral"
    confidence = parsed["confidence"].to_f.clamp(0.0, 1.0)

    { label: label, confidence: confidence }
  end

  def default_result
    { label: "Neutral", confidence: 0.0 }
  end
end

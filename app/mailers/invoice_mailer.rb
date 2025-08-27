class InvoiceMailer < ApplicationMailer
  default from: "no-reply@example.com"

   def invoice_email(invoice:)
    @invoice = invoice
    @customer = invoice&.customer
    @items = invoice&.invoice_items&.includes(:product)
    mail(to: @customer&.email, subject: "Your Invoice ##{@invoice.id}") if @items.present?
  end
end

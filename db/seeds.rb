Product.destroy_all

Product.create!([
  {
    name: "Notebook",
    product_id: "NB1001",
    stock: 50,
    unit_price: 40.0,
    tax_percentage: 5.0
  },
  {
    name: "Pen",
    product_id: "PN2001",
    stock: 100,
    unit_price: 10.0,
    tax_percentage: 12.0
  },
  {
    name: "Pencil",
    product_id: "PC3001",
    stock: 80,
    unit_price: 5.0,
    tax_percentage: 0.0
  },
  {
    name: "Eraser",
    product_id: "ER4001",
    stock: 70,
    unit_price: 3.0,
    tax_percentage: 0.0
  },
  {
    name: "Water Bottle",
    product_id: "WB5001",
    stock: 30,
    unit_price: 100.0,
    tax_percentage: 18.0
  }
])

default_denominations = [ 2000, 500, 200, 100, 50, 20, 10, 5, 2, 1 ]

default_denominations.each do |value|
  Denomination.find_or_initialize_by(value: value).tap do |d|
    d.count = rand(0..5)  # random count between 0 and 5
    d.save!
  end
end

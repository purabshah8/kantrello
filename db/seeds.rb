# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
puts "Creating Users..."
users = []
16.times do |num|
  name = Faker::DrWho.actor
  email_num = num == 0 ? "" : num.to_s
  email = name.split.join + email_num + "@gallifrey.com"
  password = "default"
  users << User.create!(name: name, email: email, password: password)
end
puts "Done!"

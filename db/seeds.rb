# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
puts "Creating Users..."
demo_user = User.create!(name: 'Demo User', username: 'demo-user', email: 'demo@example.com', password: 'default' )
purab = User.create!(name: 'Purab Shah', email:'purabshah8@gmail.com', password: 'default')
# users = []
# 16.times do |num|
#   name = Faker::DrWho.actor
#   email_num = num == 0 ? "" : num.to_s
#   email = name.split.join + email_num + "@gallifrey.com"
#   password = "default"
#   users << User.create!(name: name, email: email, password: password)
# end
puts "Done!"

puts "Creating Boards..."
Board.destroy_all
full_stack = Board.create!(title: "Full Stack Project", owner_id: demo_user.id)
to_do = Board.create!(title: "Personal To Do", owner_id: demo_user.id)
job_search = Board.create!(title: "Job Search", owner_id: purab.id)
puts "Done!"

puts "Creating Board Shares..."
BoardShare.destroy_all
share1 = BoardShare.create!(board_id: full_stack.id, user_id: purab.id)
share2 = BoardShare.create!(board_id: job_search.id, user_id: demo_user.id)
puts "Done!"

puts "Creating Lists..."
List.destroy_all
list1 = List.create!(title: 'New Features', board_id: full_stack.id)
list2 = List.create!(title: 'Development', board_id: full_stack.id)
list3 = List.create!(title: 'Unit Testing', board_id: full_stack.id)
list4 = List.create!(title: 'E2E Testing', board_id: full_stack.id)
list5 = List.create!(title: 'Ready for Deployment', board_id: full_stack.id)
puts "Done!"


puts "Creating Cards..."
Card.destroy_all
card1 = Card.create!(title: 'Boards', list_id: list1.id)
card2 = Card.create!(title: 'Lists & Cards', list_id: list1.id)
puts "Done!"

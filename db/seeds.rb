# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


puts "Creating Users..."
User.destroy_all
demo_user = User.create!(name: 'Demo User', username: 'demo-user', email: 'demo@example.com', password: 'default')
purab = User.create!(name: 'Purab Shah', email:'purabshah8@gmail.com', password: 'default')
li = User.create!(name: 'Li Yi Yu', email: 'liyiyu@gmail.com', password: 'default')
brian = User.create!(name: 'Brian Lee', email: 'b_lee@hotmail.com', password: 'default')
paul = User.create!(name: 'Paul Van Duyn', email: 'pvd@outlook.com', password: 'default')
john = User.create!(name: 'John Kim', email: 'jkimmy4eva@yahoo.com', password: 'default')
sallem = User.create!(name: 'Sallem Ahmed', email: 'dj_sal@gmail.com', password: 'default')
aaron = User.create!(name: 'Aaron Zheng', email: 'a_a_ron@live.com', password: 'default')
amir = User.create!(name: 'Amir Sojitra', email: 'amir@amir-acle.com', password: 'default')
soon_mi = User.create!(name: 'Soon-Mi Sugihara', email: 'soon-mi@appacademy.io', password: 'default')
puts "Done!"

puts "Creating Boards..."
Board.destroy_all
full_stack = Board.create!(title: "Full Stack Project", owner_id: demo_user.id, starred: true)
to_do = Board.create!(title: "Personal To Do", owner_id: demo_user.id)
job_search = Board.create!(title: "Job Search", owner_id: purab.id)
dev = Board.create!(title: "Dev Board", owner_id: purab.id)
puts "Done!"

puts "Creating Board Shares..."
BoardShare.destroy_all
share1 = BoardShare.create!(board_id: job_search.id, user_id: demo_user.id)
share2 = BoardShare.create!(board_id: dev.id, user_id: demo_user.id)
share3 = BoardShare.create!(board_id: full_stack.id, user_id: purab.id)
share4 = BoardShare.create!(board_id: full_stack.id, user_id: li.id)
share5 = BoardShare.create!(board_id: full_stack.id, user_id: aaron.id)
share6 = BoardShare.create!(board_id: full_stack.id, user_id: john.id)
share7 = BoardShare.create!(board_id: full_stack.id, user_id: brian.id)
puts "Done!"

puts "Creating Lists..."
List.destroy_all
list1 = List.create!(title: 'New Features', board_id: full_stack.id)
list2 = List.create!(title: 'Development', board_id: full_stack.id)
list3 = List.create!(title: 'Unit Testing', board_id: full_stack.id)
list4 = List.create!(title: 'E2E Testing', board_id: full_stack.id)
list5 = List.create!(title: 'Ready for Deployment', board_id: full_stack.id)
list6 = List.create!(title: 'In the Future', board_id: to_do.id)
list6 = List.create!(title: 'Ongoing', board_id: to_do.id)
list7 = List.create!(title: 'Been there, done that', board_id: to_do.id)
list8 = List.create!(title: 'Incoming Bugs', board_id: dev.id)
list9 = List.create!(title: 'In Progress', board_id: dev.id)
list10 = List.create!(title: 'QA', board_id: dev.id)
list11 = List.create!(title: 'Ready for Launch', board_id: dev.id)
list11 = List.create!(title: 'Live', board_id: dev.id)
puts "Done!"


puts "Creating Cards..."
Card.destroy_all
card1 = Card.create!(title: 'Boards', list_id: list5.id)
card2 = Card.create!(title: 'Lists & Cards', list_id: list2.id, description: 'create lists that contain cards, both of which are draggable')
card3 = Card.create!(title: 'Markdown Support', list_id: list4.id, description: "## Add Markdown Support for descriptions \n\n when done, they will look like this: \n\n * `code looks like this` \n\n * **Strong** text and *emphasized text* and ***both!*** \n\n ")
card4 = Card.create!(title: 'Move Lists & Cards', list_id: list4.id)
card5 = Card.create!(title: 'Drag n Drop', list_id: list2.id)
card6 = Card.create!(title: 'Search', list_id: list1.id, description: "search for any board, list or card that the user has access to.")
card7 = Card.create!(title: 'Due Dates', list_id: list1.id)
card8 = Card.create!(title: 'Comments', list_id: list3.id)
puts "Done!"

puts "Creating Comments..."
Comment.destroy_all
comment1 = Comment.create!(body: 'This looks really good!', user_id: li.id, card_id: card1.id)
comment2 = Comment.create!(body: 'Thanks!', user_id: purab.id, card_id: card1.id)
comment3 = Comment.create!(body: 'How can this be done better? ', user_id: brian.id, card_id: card3.id)
comment4 = Comment.create!(body: 'This is harder than it looks...', user_id: purab.id, card_id: card5.id)
comment5 = Comment.create!(body: 'You worked on this for so long. Will you ever finish?', user_id: paul.id, card_id: card4.id)
comment6 = Comment.create!(body: 'Hey guys, whats up?', user_id: sallem.id, card_id: card7.id)
comment7 = Comment.create!(body: "I've got a new job!", user_id: soon_mi.id, card_id: card7.id)
comment8 = Comment.create!(body: 'Comments on comments!', user_id: aaron.id, card_id: card8.id)
puts "Done!"

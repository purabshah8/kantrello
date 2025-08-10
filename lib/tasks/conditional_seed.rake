namespace :db do
  desc "Conditionally seed the database if SEED_DATA=true"
  task conditional_seed: :environment do
    if ENV['SEED_DATA'].to_s.downcase == 'true'
      puts "SEED_DATA=true, running db:seed..."
      Rake::Task['db:seed'].invoke
    else
      puts "Skipping seeding. Set SEED_DATA=true to enable."
    end
  end
end
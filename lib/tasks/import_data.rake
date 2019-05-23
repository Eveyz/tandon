require 'csv'

# rails "import_data:import_concepts[G:/projects/tandon/lib/assets/concepts.csv]"

# rails "import_data:import_concepts[/Users/eveyvonne/Documents/projects/tandon/tandon/lib/assets/concepts.csv]"

namespace :import_data do
  desc "Import concept"
  task :import_concepts, [:csv_file] => :environment do |task, args|
    CSV.foreach(args.csv_file, headers: true) do |row|
      # c = []
      # row.each do |h, v|
      #   c << v
      # end
      # Concept.find_or_create_by!({
      #   name: c[0],
      #   description: c[1],
      #   parent: c[2]
      # })
      p row
      Concept.find_or_create_by!(row.to_hash)
    end
    p "Import concepts done"
  end

  desc "Import domains"
  task :import_domains, [:csv_file] => :environment do |task, args|
    CSV.foreach(args.csv_file, headers: true) do |row|
      p row
      Domain.find_or_create_by!(row.to_hash)
    end
    p "Import domains done"
  end

  desc "Import variables"
  task :import_variables, [:csv_file] => :environment do |task, args|
    CSV.foreach(args.csv_file, headers: true) do |row|
      p row
      Variable.find_or_create_by!(row.to_hash)
    end
    p "Import variables done"
  end

  desc "Import patients data"
  task :import_patients, [:csv_file] => :environment do |task, args|
    CSV.foreach(args.csv_file, { headers: true, encoding: "iso-8859-1:utf-8" }) do |row|
      p row
      Patient.find_or_create_by!(row.to_hash)
    end
    p "Import patients done"
  end

end

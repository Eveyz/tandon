require 'csv'

# rails "import_data:import_concepts[G:/projects/tandon/lib/assets/concepts.csv]"

namespace :import_data do
  desc "Import concept"
  task :import_concepts, [:csv_file] => :environment do |task, args|
    CSV.foreach(args.csv_file, headers: true) do |row|
      c = []
      row.each do |h, v|
        c << v
      end
      Concept.find_or_create_by!({
        name: c[0],
        description: c[1],
        parent: c[2]
      })
    end
    p "Import done"
  end

end

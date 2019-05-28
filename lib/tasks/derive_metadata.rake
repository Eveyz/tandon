require 'csv'

namespace :derive_metadata do
  desc "Update numerical concept range"
  task :update_range, [] => :environment do |task, args|
    @concepts = Concept.where(concept_type: "numerical")
    @patients = Patient.all
    @patients.each do |patient|
      @concepts.each do |c|
        p "updating #{c.display_name} to numerical type"
        patient[c.display_name] = patient[c.display_name].to_i
      end
      patient.save
    end

    @concepts.each do |c|
      min_value = @patients.pluck("#{c.display_name}").min
      max_value = @patients.pluck("#{c.display_name}").max
      p "#{c.display_name} min: #{min_value}, max: #{max_value}"
      c.min = min_value
      c.max = max_value
      c.save
    end
    p "Update numerical concepts  range done"
  end

end

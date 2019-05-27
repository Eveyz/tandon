class Concept
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic

  # field :name, type: String
  # field :description, type: String
  
  has_many :variables

  def get_variables_and_domains
    concept = self
    concept["variables"] = self.variables.map! { |variable|
      variable["domains"] = variable.domains
      variable
    }
    return concept
  end

end

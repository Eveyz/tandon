class Concept
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic

  # field :name, type: String
  # field :description, type: String
  
  has_many :variables

end

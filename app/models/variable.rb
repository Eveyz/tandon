class Variable
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic

  # belongs_to :domain, optional: true
  belongs_to :concept, optional: true
  belongs_to :database, optional: true
end

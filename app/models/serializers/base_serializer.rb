class Serializers::BaseSerializer
  def initialize args
    @object = args[:object]
    @class_name = args[:class_name].to_s
    @scope = args[:scope]
    @scope.each{|key, value| instance_variable_set "@#{key}", value} if @scope
  end

  def serializer
    if class_is_relation?
      multi_serializer
    elsif @class_name.present? && self.class.to_s != @class_name
      object_serializer = @class_name.constantize.new object: @object,
        scope: @scope, class_name: @class_name
      object_serializer.serializer
    else
      single_serializer
    end
  end

  def multi_serializer
    return [] if @object.empty?
    class_name = get_class_name.constantize
    @object.map do |object|
      object_serializer = class_name.new object: object, scope: @scope
      object_serializer.serializer
    end
  end

  def single_serializer
    serializers = Hash.new
    self.attributes.each do |attribute|
      instance_variable_set "@#{attribute}", @object.try(attribute)
      if attribute.in? self.methods
        serializers[attribute.to_sym] = self.send attribute
      end
    end
    serializers
  end

  def attributes
    attributes = get_attributes
    self.class.conditions.each do |key, value|
      attributes.delete key unless self.send(value)
    end
    attributes
  end

  def get_attributes
    superclass = get_class
    attributes = Array.new
    while superclass != Serializers::BaseSerializer
      attributes += superclass.attributes
      superclass = superclass.superclass
    end
    attributes
  end

  def get_class
    superclass ||= @class_name.constantize if @class_name.present?
    superclass || self.class
  end

  def class_is_relation?
    class_object = @object.class
    superclass = class_object.superclass
    superclass == ActiveRecord::Relation || superclass.superclass ==
      ActiveRecord::Relation || class_object == Array
  end

  def get_class_name
    return @class_name if @class_name.present?
    class_self = self.class
    if class_self == Serializers::BaseSerializer
      sub_class = get_super_class @object.first.class
      "Serializers::#{sub_class.to_s.pluralize}Serializer"
    else
      class_self.to_s
    end
  end

  def get_super_class obj_class
    get_super_class obj_class.superclass if obj_class != ApplicationRecord
    obj_class
  end

  class << self
    def attr_accessor *vars
      vars -= attributes_with_condition vars
      attributes.concat vars
      super *vars
    end

    def attributes
      @attributes ||= Array.new
    end

    def conditions
      @conditions ||= Hash.new
    end

    private
    def attributes_with_condition vars
      vars.each_with_index.map do |var, index|
        var_next = vars[index + 1]
        is_condition?(var, var_next) ? var_next : nil
      end
    end

    def is_condition? var, var_next
      if var_next && var_next.class == Hash
        conditions[var.to_s.to_sym] = var_next[:if]
        true
      else
        false
      end
    end
  end
end

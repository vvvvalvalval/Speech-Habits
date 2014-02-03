class CreateExpressions < ActiveRecord::Migration
  def self.up
    create_table :expressions do |t|
      t.string :content
      t.integer :Belonging_teacher_id

      t.timestamps
    end
  end

  def self.down
    drop_table :expressions
  end
end

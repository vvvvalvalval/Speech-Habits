class RemoveTeacherIdFromEvents < ActiveRecord::Migration
  def self.up
    remove_column :events, :teacher_id
  end

  def self.down
    add_column :events, :teacher_id, :integer
  end
end

class CreateEvents < ActiveRecord::Migration
  def self.up
    create_table :events do |t|
      t.integer :expr_id
      t.integer :user_id
      t.integer :teacher_id

      t.timestamps
    end
  end

  def self.down
    drop_table :events
  end
end

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './Task.html';

Template.task.events({
    'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
    },
    'click .delete'() {
    Meteor.call('tasks.remove', this._id);
    },
    'click .likes': function(event, template) {
    Meteor.call('tasks.likes', template.data._id)
    },
    'click .toggle-checked'() {
      // Set the checked property to the opposite of its current value
      Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
    },
    'click .delete'() {
      Meteor.call('tasks.remove', this._id);
    },
    'click .dislikes': function(event, template) {
      Meteor.call('tasks.dislikes', template.data._id)
    },
    'click .toggle-checked'() {
      // Set the checked property to the opposite of its current value
      Meteor.call('comment.setIsChecked', this._id, !this.isChecked);
    },
    'submit .form-task-comment'(event) {
      // Prevent default browser form submit
      event.preventDefault();
  
      // Get value from form element
      const { target } = event;
      const comment = target.comment.value;
  
      // Insert a task into the collection
      Meteor.call('comment.insert', comment, this._id);
      // Clear form
      target.comment.value = '';
    },
});

Template.task.helpers({
  
})


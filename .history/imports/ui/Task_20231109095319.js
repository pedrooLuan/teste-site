import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { CommentCollection } from '../db/CommentCollection';
import './Task.html';

Template.task.onCreated(function mainContainerOnCreated() {
  this.state = new ReactiveDict();

  const handler = Meteor.subscribe('tasks');
  Tracker.autorun(() => {
    this.state.set(IS_LOADING_STRING, !handler.ready());
  });
});

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .likes': function (event, template) {
    Meteor.call('tasks.likes', template.data._id)
  },
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .dislikes': function (event, template) {
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
  comments() {

    return CommentCollection.find({ taskId: "iqYzTDtpaJxdmYQst" },
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  },
});


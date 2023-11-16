import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './Task.html';

Template.task.onCreated(function(){
  const template = this

  template.likes = new ReactiveVar(0)
})

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .likes': function(event, template){
    console.log("likes");
  }
});
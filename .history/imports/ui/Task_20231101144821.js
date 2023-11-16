import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './Task.html';

Template.task.onCreated(function(){
  const template = this

  template.qtd_likes = new ReactiveVar(5)
})

Template.task.helpers({
  qtd_likes: () => Template.instance().qtd_likes.get()
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
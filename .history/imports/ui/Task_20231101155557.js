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
    }
    'click .toggle-checked'() {
      // Set the checked property to the opposite of its current value
      Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
      },
      'click .delete'() {
      Meteor.call('tasks.remove', this._id);
      },
      'click .deslikes': function(event, template) {
      Meteor.call('tasks.deslikes', template.data._id)
      }

});
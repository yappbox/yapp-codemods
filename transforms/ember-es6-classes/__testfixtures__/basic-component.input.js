import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  user: service(),

  loggedIn: computed('user.loggedIn', function() {
    return this.user.loggedIn;
  }),

  init() {
    this._super(...arguments);
    console.log("initializing component");
  },

  didInsertElement() {
    this._super(...arguments);
    console.log("inserting element");
  },

  click(event) {
    this.user.logIn(this.user.username);
  },

  actions: {
    didLogin(newUsername) {
      this.user.loggedIn(newUsername);
    },

    didLogout() {
      this.user.loggedOut();
    }
  }
});

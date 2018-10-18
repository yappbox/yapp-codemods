import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MyComponent extends Component {
  @service user;

  @computed('user.loggedIn')
  get loggedIn() {
    return this.user.loggedIn;
  };

  constructor() {
    super(...arguments);
    console.log("initializing component");
  };

  didInsertElement() {
    super.didInsertElement(...arguments);
    console.log("inserting element");
  };

  click(event) {
    this.user.logIn(this.user.username);
  };

  @action
  didLogin(newUsername) {
    this.user.loggedIn(newUsername);
  };

  @action
  didLogout() {
    this.user.loggedOut();
  };
}

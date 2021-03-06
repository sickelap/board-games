import {Component} from 'angular2/core'
import {FormBuilder, Validators} from 'angular2/common'
import {Router, RouterLink} from 'angular2/router';

@Component({
  selector: 'profile',
  templateUrl: 'pages/profile/profile.html',
  directives: [RouterLink]
})
export class ProfilePage {
  private profileForm;

  constructor(private router: Router, private fb: FormBuilder) {
    this.profileForm = fb.group({
      username: [localStorage.getItem('username'), Validators.required]
    });
  }
  save(ev) {
    ev.preventDefault();
    localStorage.setItem('username', this.profileForm.controls.username.value);
    this.router.parent.navigate(['Lobby']);
  }
}

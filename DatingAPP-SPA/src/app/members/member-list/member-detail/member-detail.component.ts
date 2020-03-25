import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/_services/alertify.service';
import { UserService } from 'src/_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }
loadUser() {
  this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
    this.user = user;
  }, error => {
    this.alertify.error(error);
  });
}


}

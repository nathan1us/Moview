import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  post: any = {};
  postContent: any = {};
  postId: string = '';
  postAuthor: string = '';

  constructor(public activateRoute: ActivatedRoute, public ngZone: NgZone) {
    let postId = this.activateRoute.snapshot.paramMap.get('postId');

    this.postId = postId;

    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((docSnapshot) => {
        this.ngZone.run(() => {
          this.post = docSnapshot.data();
          this.postContent = this.post.content.content[0].content[0].text;
          this.postAuthor = this.post.ownerName;
          console.log(this.post);
        });
      });
  }

  ngOnInit() {}
}

import { Injectable } from '@angular/core';
import user from "./models/user"
import blogs from './models/blogs';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {


  isLoggedIn: boolean = false;

  constructor() {}

  register(Users: { email: string; password: string }) {
    user.push(Users);
    return Users;
  }

  login(loginData: { email: string; password: string }) {
    user.push(loginData);
    this.isLoggedIn = true;
    return loginData;
  }

  createBlog(blogdata: { title: string; description: string }) {
    blogs.push({ ...blogdata, comments: [] });
    return blogdata;
  }

  getBlogs() {
    return blogs;
  }

  updateBlog(
    index: number,
    updateBlog: { title: string; description: string }
  ) {
    blogs[index] = { ...blogs[index], ...updateBlog };
  }

  deleteBlog(index: number) {
    blogs.splice(index, 1);
  }

  addComment(blogIndex: number, comment: string) {
    if (!blogs[blogIndex].comments) {
      blogs[blogIndex].comments = [];
    }
    blogs[blogIndex].comments.push({ comment });
  }

}

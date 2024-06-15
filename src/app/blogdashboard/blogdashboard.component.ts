import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blogdashboard',
  templateUrl: './blogdashboard.component.html',
  styleUrls: ['./blogdashboard.component.css'],
})
export class BlogdashboardComponent implements OnInit {
  constructor(private _dataservice: DataserviceService) {}

  blogs: any = [];
  isEditing: boolean = false;
  editIndex: number | null = null;
  blogSuccesMessage : boolean = false

  ngOnInit(): void {
    this.blogs = this._dataservice.getBlogs();
  }

  createBlog() {
    if (this.isEditing && this.editIndex !== null) {
      this.blogs = this.blogData.value;
      this._dataservice.updateBlog(this.editIndex, this.blogs);
      this.isEditing = false;
      this.editIndex = null;
    } else {
      this.blogSuccesMessage = false
      this.blogs = this.blogData.value;
      this._dataservice.createBlog(this.blogs);
      this.blogSuccesMessage = true
      setInterval(() => {
        this.blogSuccesMessage =false
      },2000)
      console.log(this.blogs);
    }
    this.blogs = this._dataservice.getBlogs();
    this.blogData.reset();
  }

  editBlog(index: number) {
    this.isEditing = true;
    this.editIndex = index;
    const blog = this.blogs[index];
    this.blogData.setValue({
      title: blog.title,
      description: blog.description,
    });
  }

  deleteBlog(index: number) {
    this._dataservice.deleteBlog(index);
    this.blogs = this._dataservice.getBlogs();
  }

  onComment(index: number) {
    const comment = this.commentForm.value.comment;
    if (comment) {
      this._dataservice.addComment(index, comment);
      this.blogs = this._dataservice.getBlogs();
      this.commentForm.reset();
    }
  }

  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  get comment() {
    return this.commentForm.get('comment');
  }

  blogData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  get blogtitle() {
    return this.blogData.get('title');
  }

  get blogdescription() {
    return this.blogData.get('description');
  }
}

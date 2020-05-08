import { v4 as uuid } from "uuid";
import fs = require("fs");
import path = require("path");
import { rejects } from "assert";
 
export class Course {
  protected readonly id: string;
  constructor(protected title: string, protected price: string, protected img: string) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  };
  private toJSON(): Object {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id
    };
  };
  private static getAllCourses(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        "utf-8",
        (error, content) => {
          if (error) {
            reject(error);
          } else {
            resolve(JSON.parse(content));
          };
        }
      );
    });
  };
  public async save(): Promise<any> {
    const courses = await Course.getAllCourses();
    courses.push(this.toJSON());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "courses.json"),
        JSON.stringify(courses),
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  };
}
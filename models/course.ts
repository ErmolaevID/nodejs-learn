import { v4 as uuid } from "uuid";
import fs = require("fs");
import path = require("path");

export interface CourseElement {
  title: string;
  price: number;
  img: string;
  id: string;
  count?: number;
  length?: number;
}
 
export class Course {
  public readonly id: string;
  constructor(public title: string, public price: number, public img: string) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuid();
  }
  public static async getCourseById(id: string) {
    const courses = await Course.getAllCourses();
    return courses.find(element => element.id === id);
  }
  private static toJSON(newCourse: CourseElement) {
    return {
      title: newCourse.title,
      price: newCourse.price,
      img: newCourse.img,
      id: newCourse.id
    }
  }
  public static async updateCourseById(course: CourseElement) {
    const courses = await Course.getAllCourses();
    const index = courses.findIndex(c => c.id === course.id);
    courses[index] = course;
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
      )
    })
  }
  public static async getAllCourses(): Promise<Array<CourseElement>> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        "utf-8",
        (error, content) => {
          if (error) {
            reject(error);
          } else {
            resolve(JSON.parse(content));
          }
        }
      )
    })
  }
  public static async save(newCourse: CourseElement) {
    const courses = await Course.getAllCourses();
    courses.push(this.toJSON(newCourse));
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
      )
    })
  }
}
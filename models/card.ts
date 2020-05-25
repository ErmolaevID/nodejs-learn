import { CourseElement } from "./course";
import fs = require("fs");
import path = require("path");

interface ICard {
  courses: Array<CourseElement>;
  price: number;
}

export class Card {
  public static async addCourseInCard(course: CourseElement) {
    const card = await Card.fetch();
    const index = card.courses.findIndex(c => c.id === course.id);
    const candidate = card.courses[index];
    if (candidate) {
      candidate.count++;
      card.courses[index] = candidate;
    } else {
      course.count = 1;
      card.courses.push(course);
    }
    card.price += Number(course.price);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "card.json"),
        JSON.stringify(card),
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
  public static async fetch(): Promise<ICard> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", 'card.json'),
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
  public static async updateCardCourses(course: CourseElement) {
    let card = await Card.fetch();
    let courseToChange = card.courses.find(c => c.id === course.id);
    card.price -= Number(courseToChange.price) * Number(courseToChange.count);
    courseToChange.price = Number(course.price);
    card.price += Number(courseToChange.price) * Number(courseToChange.count);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "card.json"),
        JSON.stringify(card),
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
  public static async removeCardCourse(id: string) {
    let card = await Card.fetch();
    console.log(card)
    let courseToRemove = card.courses.find(c => c.id === id);
    console.log(courseToRemove);
    let courseToRemoveIndex = card.courses.findIndex(c => c.id === id);
    if (courseToRemove.count > 1) {
      courseToRemove.count -= 1;
      card.price -= courseToRemove.price;
    } else {
      delete card.courses[courseToRemoveIndex];
      card.price -= courseToRemove.price;
    }
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "card.json"),
        JSON.stringify(card),
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(card);
          }
        }
      )
    })
  }
}

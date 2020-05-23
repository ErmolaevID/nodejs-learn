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
    card.price += course.price;
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
}
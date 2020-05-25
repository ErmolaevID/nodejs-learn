import { CourseElement } from "./course";
import fs = require("fs");
import path = require("path");

export interface ICard {
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
    return Card.writeJSON(card);
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
    return Card.writeJSON(card);
  }
  public static async removeCardCourse(id: string) {
    let card = await Card.fetch();
    let courseToRemove = card.courses.find(c => c.id === id);
    let courseToRemoveIndex = card.courses.findIndex(c => c.id === id);
    if (courseToRemove.count > 1) {
      courseToRemove.count -= 1;
      card.price -= courseToRemove.price;
    } else {
      card.price -= courseToRemove.price;
      card.courses = card.courses.filter(c => c.id !== courseToRemove.id);
    }
    return Card.writeJSON(card);
  }
  private static async writeJSON(card: ICard) {
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

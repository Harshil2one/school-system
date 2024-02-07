import { Component } from "react";

export default class DashboardController extends Component {
  userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");

  calculateStudents(classData: any) {
    const students = classData
      ?.filter(
        (el: any) => Number(el.class) === Number(this.context.selectedClass)
      )
      ?.reduce((partialSum: number, a: any) => partialSum + a.student, 0);
    return students;
  }

  shortenNumber(number: number) {
    if (number >= 1000) {
      const rounded = Math.round(number / 100) / 10;
      return rounded % 1 === 0 ? rounded + 'k' : rounded.toFixed(1) + 'k';
    }
    return number.toString();
  }

  getClassData(selectedClass: any) {
    return this.userDetails.classData?.filter(
      (el: any) => Number(el.class) === Number(selectedClass)
    );
  }

  suffixHandler(number: number) {
    const remainder10 = number % 10;
    const remainder100 = number % 100;
    if (remainder10 === 1 && remainder100 !== 11) {
      return `${number}st`;
    } else if (remainder10 === 2 && remainder100 !== 12) {
      return `${number}nd`;
    } else if (remainder10 === 3 && remainder100 !== 13) {
      return `${number}rd`;
    } else {
      return `${number}th`;
    }
  }

  getTakenClasses(selectedClass: number) {
    return this.getClassData(selectedClass)?.reduce(
      (partialSum: number, a: any) => partialSum + a.taken_classes,
      0
    );
  }

  getMissedClasses(selectedClass: number) {
    return this.getClassData(selectedClass)?.reduce(
      (partialSum: number, a: any) => partialSum + a.missed_classes,
      0
    );
  }
}

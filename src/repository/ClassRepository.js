/* eslint-disable no-plusplus */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable indent */
const db = require("../../dbconfig/dbConfig");
const Classes = require("../db/model/Classes");
const Classes_Teacher = require("../db/model/Classes_Teacher");
const Classes_Schedule = require("../db/model/Classes_Schedule");

module.exports = {
  getClasses: () =>
    new Promise((resolve, reject) => {
      Classes.findAll()
        .then((response) => {
          resolve(response);
        })
        .catch((e) => reject(e));
    }),

  getClass: (input) =>
    new Promise((resolve, reject) => {
      const { classid } = input;
      Classes.findAll({
        where: {
          classId: classid,
        },
      })
        .then((responseClasses) => {
          const res = {
            class: responseClasses[0],
            teachers: "",
            schedules: "",
          };
          Classes_Teacher.findAll({
            where: {
              classId: classid,
            },
          })
            .then((responseTeachers) => {
              res.teachers = responseTeachers;

              Classes_Schedule.findAll({
                where: {
                  classId: classid,
                },
              })
                .then((responseSchedules) => {
                  res.schedules = responseSchedules;
                  resolve(res);
                })
                .catch((response) => {
                  reject(response);
                });
            })
            .catch((response) => {
              reject(response);
            });
        })
        .catch((response) => {
          reject(response);
        });
    }),

  updateClass: (input) =>
    new Promise((resolve, reject) => {
      const {
        subjectId,
        classCode,
        year,
        semester,
        password,
        classId,
        userId,
        classesTeacher,
        classesSchedule,
      } = input;

      if (classId === "0") {
        Classes.create({
          subjectId,
          classCode,
          year,
          semester,
          password,
        })
          .then((response) => {
            for (let i = 0; i < classesTeacher.length; i++) {
              Classes_Teacher.create({
                userId: classesTeacher[i],
                classId: response.classId,
              })
                .then(() => {})
                .catch((e) => reject(e));
            }

            for (let i = 0; i < classesSchedule.length; i++) {
              Classes_Schedule.create({
                classId: response.classId,
                day: classesSchedule[i].day,
                start: classesSchedule[i].start,
                finish: classesSchedule[i].end,
              })
                .then(() => {})
                .catch((e) => reject(e));
            }

            resolve(response[0]);
          })
          .catch((e) => reject(e));
      } else {
        Classes.update(
          {
            subjectId,
            classCode,
            year,
            semester,
            password,
          },
          {
            where: {
              classId: classId,
            },
          }
        )
          .then((response) => {
            Classes_Teacher.destroy({
              where: {
                classId: classId,
              },
            })
              .then(() => {
                for (let i = 0; i < classesTeacher.length; i++) {
                  Classes_Teacher.create({
                    userId: classesTeacher[i],
                    classId: classId,
                  })
                    .then(() => {})
                    .catch((e) => reject(e));
                }
              })
              .catch((e) => {
                reject(e);
              });

            Classes_Schedule.destroy({
              where: {
                classId: classId,
              },
            })
              .then(() => {
                for (let i = 0; i < classesSchedule.length; i++) {
                  Classes_Schedule.create({
                    classId: classId,
                    day: classesSchedule[i].day,
                    start: classesSchedule[i].start,
                    finish: classesSchedule[i].end,
                  })
                    .then((res) => {})
                    .catch((e) => reject(e));
                }
              })
              .catch((e) => {
                reject(e);
              });

            resolve(response);
          })
          .catch((response) => {
            reject(response);
          });
      }
    }),

  deleteClass: (classid) =>
    new Promise((resolve, reject) => {
      Classes.update(
        {
          deleted: true,
        },
        {
          where: {
            classId: classid,
          },
        }
      )
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    }),
};

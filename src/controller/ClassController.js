/* eslint-disable no-restricted-syntax */
/* eslint-disable*/
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-use-before-define */
const classRepository = require('../repository/ClassRepository');

module.exports = {
    getClasses: () => new Promise(async (resolve, reject) => {
        try {
            const response = await classRepository.getClasses();

            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    deleteClass: (classId) => new Promise(async (resolve, reject) => {
        try {
            const response = await classRepository.deleteClass(classId);
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    getClass: (input) => new Promise(async (resolve, reject) => {
        try {
            const classItem = await classRepository.getClass(input);

            resolve({
                classItem
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    updateClass: (input) => new Promise(async (resolve, reject) => {
        try {
            const {
                classItem
            } = input;
            const classResponse = await classRepository.updateClass(classItem);

            resolve({
                classItem: classResponse,
            });
        } catch (e) {
            reject(e);
        }
    }),
};

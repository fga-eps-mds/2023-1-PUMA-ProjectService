const keywordRepository = require("../repository/keywordRepository");

module.exports = {
  getAllKeywords: () => {
    return new Promise((resolve, reject) => {
      keywordRepository.getAllKeywords().then((response) => {
        resolve(response);
      });
    })
  },

  addKeyword: (keyword) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(keywordRepository.addKeyword(keyword.keyword));
      } catch (e) {
        console.log(e);
        reject(e);
      }
      resolve();
    });
  },

  getKeywordsAlternative: () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(keywordRepository.getKeywordsAlternative());
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },

  updateKeywordContent: (keywordid, newKeyword) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(keywordRepository.updateKeyword(keywordid, newKeyword));
      } catch (e) {
        console.log(e);
        reject(e);
      }
      resolve();
    });
  },

  updateSubjectKeyword: (keywordid, subjectid) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(keywordRepository.updateSubjectKeyword(keywordid, subjectid));
      } catch (e) {
        console.log(e);
        reject(e);
      }
      resolve();
    });
  },

  deleteKeyword: (keywordid) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(keywordRepository.deleteKeyword(keywordid));
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },

  getSubjects: () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(keywordRepository.getSubjects());
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },

  addKeywordSubjectRelation: (payload) => {
    return new Promise((resolve, reject) => {
      try {
        resolve(keywordRepository.addKeywordSubjectRelation(payload));
      } catch (e) {
        reject(e);
      }
      resolve();
    });
  },
};
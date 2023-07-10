/* eslint-disable no-multi-str */
/* eslint-disable import/order */
const db = require('../../dbconfig/dbConfig');
const format = require('pg-format');
const Keyword = require('../db/model/Keyword');
const Abstracts = require('../db/model/Abstracts');
const Summarize = require('../db/model/Summarize');
const Subject = require('../db/model/Subject');
const sequelize = require('../db/AppDb');

module.exports = {
  addKeyword: (keyword) => new Promise((resolve, reject) => {
    Keyword.create({ keyword }).then((response) => {
      resolve(response);
    }).catch((e) => {
      reject(e);
    });
  }),

  addManyKeywords: (keywords) => new Promise((resolve, reject) => {
    Keyword.bulkCreate(keywords).then((response) => {
      resolve(response);
    }).catch((e) => {
      reject(e);
    });
  }),

  getAllKeywords: () => new Promise((resolve, reject) => {
    Keyword.findAll({
      order: [['keywordId', 'DESC']]
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getKeywordByName: (keyword) => new Promise((resolve, reject) => {
    Keyword.findAll({
      where: {
        keyword,
      }
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getKeywordById: (keywordId) => new Promise((resolve, reject) => {
    Keyword.findAll({
      keywordId,
    }).then((response) => {
      resolve(response);
    }).catch((e) => reject(e));
  }),

  getProjectKeywords: (projectId) => new Promise((resolve, reject) => {
    sequelize.query(
      `SELECT K.keyword, K."keywordId", A.main FROM "Abstracts" as A JOIN "Keyword" as K on A."keywordId" = K."keywordId" WHERE "projectId" = ${projectId}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => {
      console.log(e);
      reject(e);
    });
  }),

  addKeywordSubjectRelation: (payload) => new Promise((resolve, reject) => {
    const { keywordid, subjectid } = payload;
    Summarize.create({
      keywordId: keywordid,
      subjectId: subjectid,
    }).then((response) => resolve(response))
      .catch((e) => reject(e));
  }),

  getKeywordsAvailbleToProject: () => new Promise((resolve, reject) => {
    sequelize.query(
      `SELECT DISTINCT k."keywordId", k.keyword FROM "Summarize" JOIN "Subject" s ON "Summarize"."subjectId" = s."subjectId" JOIN "Keyword" k ON "Summarize"."keywordId" = k."keywordId" WHERE not(k.deleted) and not(s.deleted)`,
    ).then((results) => {
      resolve(results);
    }).catch((e) => {
      console.log(e);
      reject(e);
    });
  }),

  getKeywordAvailbleToSubject: () => new Promise((resolve, reject) => {
    sequelize.query(
      `SELECT k."keywordId", k.keyword FROM "Keyword" k LEFT JOIN "Summarize" s ON k."keywordId" = s."keywordId" WHERE s."keywordId" IS NULL and not(k.deleted)`,
    ).then((results) => {
      resolve(results[0]);
    }).catch((e) => reject(e));
  }),

  getKeywordsAlternative: () => {
    return new Promise((resolve, reject) => {
      sequelize.query(
        'SELECT k."keywordId", k.keyword, s.name as "subjectName", s."subjectId", array_agg(c."userId") FROM "Summarize" su JOIN "Subject" s ON su."subjectId" = s."subjectId" JOIN "Keyword" k ON su."keywordId" = k."keywordId" and k.deleted is not true inner join "Lectures" l on l."subjectId" = s."subjectId" inner join "User_Properties" p on l."userId" = p."userId" inner join "User" c on p."userId" = c."userId" GROUP BY k."keywordId", s.name,s."subjectId" ORDER BY k."keywordId";',
      ).then((results) => {
        resolve(results);
      }).catch((results) => {
        console.log(results);
        reject(results);
      });
    });
  },

  getSubjects: () => {
    return new Promise((resolve, reject) => {
      sequelize.query(
        'SELECT "subjectId" as value, name as text FROM "Subject";',
      ).then((results) => {
        resolve(results);
      }).catch((response) => {
        reject(response);
      });
    });
  },

    updateKeyword: (keywordid, newKeyword) => {
    try {
      return new Promise((resolve, reject) => {
        Keyword.update({
          keyword: newKeyword,
        }, {
          where: {
            keywordId: keywordid
          },
          returning: true,
        }).then((response) => {
          resolve(response[1][0]);
        }).catch((e) => {
          reject(e);
        });
      });
    } catch (e) {
      reject(e);
    }
  },

  deleteKeyword: (keywordid) => {
    try {
      return new Promise((resolve, reject) => {
        Keyword.update({
          deleted: true,
        }, {
          where: {
            keywordId: keywordid,
          },
          returning: true,
        }).then((response) => {
          resolve(response[1]);
        }).catch((e) => {
          reject(e);
        });
      });
    } catch (e) {
      reject(e);
    }
  },

  updateSubjectKeyword: (keywordid, subjectid) => {
    try {
      return new Promise((resolve, reject) => {
        Summarize.update({
          keywordId: keywordid,
          subjectId: subjectid,
        }, {
          where: {
            keywordId: keywordid,
          },
          returning: true,
        }).then((response) => {
          resolve(response[1]);
        }).catch((e) => {
          reject(e);
        });
      });
    } catch (e) {
      reject(e);
    }
  },

  getKeywordsOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectid } = input;
    sequelize.query(
      `select kw.keyword, kw."keywordId" from "Subject" sb \
      inner join "Summarize" sm on sb."subjectId" = sm."subjectId" \
      inner join "Keyword" kw on sm."keywordId" = kw."keywordId" \
      where sb."subjectId" = ${subjectid}`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),

  removeKeywordsOfSubject: (input) => new Promise((resolve, reject) => {
    const { subjectId } = input;
    sequelize.query(
      `delete from "Summarize" sm \
      where sm."subjectId" in \
      ( \
        select sb."subjectId" \
        from "Subject" sb \
        inner join "Summarize" sm \
        on sb."subjectId" = sm."subjectId" \
        where sb."subjectId" = ${subjectId} \
      )`
    ).then((results) => {
      resolve(results);
    }).catch((e) => reject(e));
  }),
};

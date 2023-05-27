/* eslint-disable */
const projectRoutes = require('./ProjectRoutes');
const subjectRoutes = require('./SubjectRoutes');
const keywordRoutes = require('./KeywordRoutes');
const classRoutes = require('./ClassRoutes');
const pumaInfoRoutes = require('./PumaInfoRoutes');


module.exports = (app) => {
  app.use('/', [
    projectRoutes,
    subjectRoutes,
    keywordRoutes,
    classRoutes,
    pumaInfoRoutes,
  ]);
};

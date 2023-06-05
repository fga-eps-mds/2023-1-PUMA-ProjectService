/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const environment = require('./config/environment.config');
const configRoutes = require('./routes/router');

const Classes_Schedule = require('./db/model/Classes_Schedule');
const Classes_Teacher = require('./db/model/Classes_Teacher');
const Classes = require('./db/model/Classes');
const Common_User = require('./db/model/Common_User');
const Identifies = require('./db/model/Identifies');
const Keyword = require('./db/model/Keyword');
const Knowledge_Area = require('./db/model/Knowledge_Area');
const Lectures = require('./db/model/Lectures');
const Project = require('./db/model/Project');
const Semester = require('./db/model/Semester');
const Subarea = require('./db/model/Subarea');
const Subject = require('./db/model/Subject');
const Summarize = require('./db/model/Summarize');
const Teacher = require('./db/model/Teacher');
const Abstracts = require('./db/model/Abstracts');
const Puma_Infos = require('./db/model/Puma_Infos');
const Topics = require('./db/model/Topics');
const Section = require('./db/model/Section');
const More_Info = require('./db/model/More_Info');

// const syncDb = require('./db/SyncDb');

// eslint-disable-next-line no-unused-vars
// const db = require('../dbconfig/dbConfig');

environment.configEnv();

const app = express();

(async () => {
  try {
    await Common_User.sync({ alter: true });
    await Subject.sync({ alter: true });
    await Knowledge_Area.sync({ alter: true });
    await Teacher.sync({ alter: true });


    await Classes.sync({ alter: true });
    await Subarea.sync({ alter: true });
    await Semester.sync({ alter: true });
    await Keyword.sync({ alter: true });
    await Classes_Schedule.sync({ alter: true });
    await Classes_Teacher.sync({ alter: true });
    await Identifies.sync({ alter: true });
    await Lectures.sync({ alter: true });
    await Project.sync({ alter: true });
    await Summarize.sync({ alter: true });
    await Abstracts.sync({ alter: true });
    await Puma_Infos.sync({ alter: true });
    await Topics.sync({ alter: true });
    await Section.sync({ alter: true });
    await More_Info.sync({ alter: true });

    console.log('Database Inicializado')
  } catch (error) {
    console.log("Erro ao inicializar o banco ->", error);
  }
})();

app.disable('x-powered-by');
const corsOptions = {
  // origin: `${global.URL_API}`,
  origin: '*',
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));

configRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

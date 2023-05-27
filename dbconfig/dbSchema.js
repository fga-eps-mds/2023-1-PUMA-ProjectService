/*
  Banco de dados - PUMA

  Nmr Tabelas: 24
  Nome do banco de dados: puma
  Criado por: Gabriel Tiveron, Gustavo Nogueira, Bruno Henrique
  Última alteração: Adição das tabelas referentes as turmas
*/

module.exports = Object.freeze({
    DBSCHEMALEN: 24,
    DBSCHEMA: `
    CREATE TABLE COMMON_USER (
        userId SERIAL,
        fullName VARCHAR(200) NOT NULL,
        email VARCHAR(70) NOT NULL,
        isAdmin BOOL DEFAULT FALSE NOT NULL,
        phoneNumber VARCHAR(12),
        passwordHash VARCHAR(1000) NOT NULL,
        CONSTRAINT COMMON_USER_PK PRIMARY KEY (userId),
        CONSTRAINT COMMON_USER_UK UNIQUE (email)
    );

    CREATE TABLE STUDENT (
        regNumber VARCHAR(9) NOT NULL,
        userId INT NOT NULL,
        softSkills VARCHAR(100) NOT NULL,
        CONSTRAINT STUDENT_PK PRIMARY KEY (regNumber),
        CONSTRAINT STUDENT_UK UNIQUE (userId),
        CONSTRAINT STUDENT_COMMON_USER_FK FOREIGN KEY (userId) REFERENCES COMMON_USER (userId)
    );

    CREATE TABLE PROFESSOR (
        regNumber VARCHAR(20),
        userId INT NOT NULL,
        CONSTRAINT PROFESSOR_PK PRIMARY KEY (regNumber),
        CONSTRAINT PROFESSOR_UK UNIQUE (userId),
        CONSTRAINT PROFESSOR_COMMON_USER_FK FOREIGN KEY (userId) REFERENCES COMMON_USER (userId)
    );

    CREATE TABLE JURIDICAL_AGENT (
        userId INT NOT NULL,
        cnpj VARCHAR(14) NOT NULL,
        companyName varchar(100) NOT NULL,
        socialReason VARCHAR(100) NOT NULL,
        CONSTRAINT JURIDICAL_AGENT_PK PRIMARY KEY(userId),
        CONSTRAINT JURIDICAL_AGENT_UK UNIQUE (cnpj),
        CONSTRAINT JURIDICAL_AGENT_COMMON_USER_FK FOREIGN KEY (userId) REFERENCES COMMON_USER (userId)
    );

    CREATE TABLE PHYSICAL_AGENT (
        userId INT NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        CONSTRAINT PHYSICAL_AGENT_PK PRIMARY KEY(userId),
        CONSTRAINT PHYSICAL_AGENT_UK UNIQUE (cpf),
        CONSTRAINT PHYSICAL_AGENT_COMMON_USER_FK FOREIGN KEY (userId) REFERENCES COMMON_USER (userId)
    );

    CREATE TABLE SUBJECT (
        subjectId SERIAL,
        name VARCHAR(200) NOT NULL,
        courseSyllabus VARCHAR(10000),
        deleted BOOL DEFAULT FALSE NOT NULL,
        CONSTRAINT SUBJECT_PK PRIMARY KEY (subjectId)
    );

    CREATE TYPE stats_semester AS ENUM ('1', '2');

    CREATE TYPE stats_semester_status AS ENUM ('AD', 'CD');

    CREATE TABLE SEMESTER (
        semesterId SERIAL NOT NULL,
        subjectId INT NOT NULL,
        year INT NOT NULL,
        semester stats_semester NOT NULL,
        status stats_semester_status,
        deleted BOOL DEFAULT FALSE NOT NULL,
        CONSTRAINT SEMESTER_PK PRIMARY KEY (semesterId),
        CONSTRAINT SEMESTRE_UK UNIQUE(year, semester, subjectId)
    );

    CREATE TYPE stats_project AS ENUM ('SB', 'RL', 'AL', 'AC', 'RC', 'IC', 'EX', 'EC');

    CREATE TABLE PROJECT (
        projectId SERIAL NOT NULL,
        userId INT NOT NULL,
        subjectId INT,
        semesterId INT,
        name varchar(100) NOT NULL,
        expectedResult VARCHAR(1000) NOT NULL,
        feedback VARCHAR(1000),
        problem VARCHAR(1000) NOT NULL,
        status stats_project DEFAULT 'SB' NOT NULL,
        deleted BOOL DEFAULT FALSE NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT PROJECT_PK PRIMARY KEY (projectId),
        CONSTRAINT PROJECT_COMMON_USER_FK FOREIGN KEY (userId) REFERENCES COMMON_USER (userId),
        CONSTRAINT PROJECT_SUBJECT_FK FOREIGN KEY (subjectId) REFERENCES SUBJECT (subjectId),
        CONSTRAINT PROJECT_SEMESTER_FK FOREIGN KEY (semesterId) REFERENCES SEMESTER (semesterId)
    );

    CREATE TABLE FILE (
        fileId SERIAL NOT NULL,
        projectId INT,
        fileName VARCHAR(100) NOT NULL,
        byteContent BYTEA NOT NULL,
        CONSTRAINT FILE_PK PRIMARY KEY (fileId),
        CONSTRAINT FILE_PROJECT_FK FOREIGN KEY (projectId) REFERENCES PROJECT (projectId)
    );

    CREATE TABLE KEYWORD (
        keywordId SERIAL NOT NULL,
        keyword VARCHAR(200) NOT NULL,
        deleted BOOL DEFAULT FALSE NOT NULL,
        CONSTRAINT KEYWORD_PK PRIMARY KEY (keywordId),
        CONSTRAINT KEYWORD_UK UNIQUE (keyword)
    );

    CREATE TABLE KNOWLEDGE_AREA (
        knowledgeAreaId SERIAL NOT NULL,
        knowledgeArea VARCHAR(200) NOT NULL,
        deleted BOOL DEFAULT FALSE NOT NULL,
        CONSTRAINT KNOWLEDGE_AREA_PK PRIMARY KEY (knowledgeAreaId),
        CONSTRAINT KNOWLEDGE_AREA_UK UNIQUE (knowledgeArea)
    );

    CREATE TABLE SUBAREA (
        subAreaId SERIAL NOT NULL,
        knowledgeAreaId INT NOT NULL,
        description VARCHAR(200) NOT NULL,
        deleted BOOL DEFAULT FALSE NOT NULL,
        CONSTRAINT SUBAREA_PK PRIMARY KEY (subAreaId),
        CONSTRAINT SUBAREA_KNOWLEDGE_AREA_FK FOREIGN KEY (knowledgeAreaId) REFERENCES KNOWLEDGE_AREA (knowledgeAreaId),
        CONSTRAINT SUBAREA_UK UNIQUE (description, knowledgeAreaId)
    );

    CREATE TABLE TEAM (
        teamId SERIAL NOT NULL,
        projectId INT NOT NULL,
        deleted BOOL DEFAULT FALSE NOT NULL,
        CONSTRAINT TEAM_PK PRIMARY KEY (teamId),
        CONSTRAINT TEAM_PROJECT_FK FOREIGN KEY (projectId) REFERENCES PROJECT(projectId)
    );

    CREATE TYPE stats_post AS ENUM ('ED', 'NT', 'DP');

    CREATE TABLE POST (
        postId SERIAL NOT NULL,
        title VARCHAR(200) NOT NULL,
        hypertext VARCHAR(5000) NOT NULL,
        type stats_post NOT NULL,
        thumbnail BYTEA,
        author VARCHAR(200) NOT NULL,
        deleted BOOL DEFAULT FALSE NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
        CONSTRAINT POST_PK PRIMARY KEY (postId)
    );

    CREATE TABLE abstracts (
        keywordId INT NOT NULL,
        projectId INT NOT NULL,
        main BOOL DEFAULT FALSE NOT NULL,
        CONSTRAINT abstracts_KEYWORD_FK FOREIGN KEY (keywordId) REFERENCES KEYWORD(keywordId),
        CONSTRAINT abstracts_PROJECT_FK FOREIGN KEY (projectId) REFERENCES PROJECT(projectId)
    );

    CREATE TABLE summarize (
        keywordId INT NOT NULL,
        subjectId INT NOT NULL,
        CONSTRAINT summarize_KEYWORD_FK FOREIGN KEY (keywordId) REFERENCES KEYWORD(keywordId),
        CONSTRAINT summarize_SUBJECT_FK FOREIGN KEY (subjectId) REFERENCES SUBJECT(subjectId)
    );

    CREATE TABLE identifies (
        subAreaId INT NOT NULL,
        subjectId INT NOT NULL,
        CONSTRAINT identifies_SUBAREA_FK FOREIGN KEY (subAreaId) REFERENCES SUBAREA (subAreaId),
        CONSTRAINT identifies_SUBJECT_FK FOREIGN KEY (subjectId) REFERENCES SUBJECT (subjectId),
        CONSTRAINT identifies_UK UNIQUE (subAreaId, subjectId)
    );

    CREATE TABLE participate (
        teamId INT NOT NULL,
        regNumber VARCHAR(9) NOT NULL,
        CONSTRAINT participate_TEAM_FK FOREIGN KEY (teamId) REFERENCES TEAM (teamId),
        CONSTRAINT participate_STUDENT_FK FOREIGN KEY (regNumber) REFERENCES STUDENT (regNumber)
    );

    CREATE TABLE is_registered (
        regNumber VARCHAR(9) NOT NULL,
        semesterId INT NOT NULL,
        CONSTRAINT is_registered_STUDENT_FK FOREIGN KEY (regNumber) REFERENCES STUDENT(regNumber),
        CONSTRAINT is_registered_SEMESTER_FK FOREIGN KEY (semesterId) REFERENCES SEMESTER(semesterId)
    );

    CREATE TABLE lectures (
        regNumber VARCHAR(20) NOT NULL,
        subjectId INT NOT NULL,
        CONSTRAINT lectures_PROFESSOR_FK FOREIGN KEY (regNumber) REFERENCES PROFESSOR(regNumber),
        CONSTRAINT lectures_SUBJECT_FK FOREIGN KEY (subjectId) REFERENCES SUBJECT(subjectId)
    );

    CREATE TABLE is_assigned (
        regNumber VARCHAR(20) NOT NULL,
        semesterId INT NOT NULL,
        CONSTRAINT is_assigned_PROFESSOR_FK FOREIGN KEY (regNumber) REFERENCES PROFESSOR(regNumber),
        CONSTRAINT is_assigned_SEMESTER_FK FOREIGN KEY (semesterId) REFERENCES SEMESTER(semesterId)
    );

    CREATE TYPE semester_types AS ENUM ('1', '2', 'VERAO');

    CREATE TABLE CLASSES (
        classId SERIAL UNIQUE,
        subjectId INT NOT NULL,
        classCode VARCHAR(3) NOT NULL,
        year INT NOT NULL,
        semester semester_types NOT NULL,
        password VARCHAR(6) NOT NULL,
        deleted BOOL DEFAULT FALSE NOT NULL,
        CONSTRAINT CLASSES_PK PRIMARY KEY (subjectId, classCode)
    );

    CREATE TABLE CLASSES_TEACHER (
        classTeacherId SERIAL,
        userId INT NOT NULL,
        classId INT NOT NULL,
        CONSTRAINT CCLASSES_TEACHER_PK PRIMARY KEY (classTeacherId),
        CONSTRAINT CLASSES_TEACHER_COMMON_USER_FK FOREIGN KEY (userId) REFERENCES COMMON_USER (userId),
        CONSTRAINT CLASSES_TEACHER_CLASSES_FK FOREIGN KEY (classId) REFERENCES CLASSES (classId)
    );

    CREATE TYPE schedule_days_types AS ENUM ('Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábadp');

    CREATE TABLE CLASSES_SCHEDULE (
        classScheduleId SERIAL,
        classId INT NOT NULL,
        day schedule_days_types NOT NULL,
        start VARCHAR(5),
        finish VARCHAR(5),
        CONSTRAINT CLASSES_SCHEDULE_PK PRIMARY KEY (classScheduleId),
        CONSTRAINT CLASSES_TEACHER_CLASSES_FK FOREIGN KEY (classId) REFERENCES CLASSES (classId)
    );
    
    CREATE TABLE CONTACT (
        contactId INT NOT NULL,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(70) NOT NULL UNIQUE,
        CONSTRAINT CONTACT_PK PRIMARY KEY (contactId),
    );
`,
});

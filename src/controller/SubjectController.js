/* eslint-disable no-restricted-syntax */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-use-before-define */
const subjectRepository = require('../repository/subjectRepository');
const keywordRepository = require('../repository/keywordRepository');
const subareaRepository = require('../repository/subareaRepository');
const knowledgeAreaRepository = require('../repository/knowledgeArea');
const professorRepository = require('../repository/professorRepository');

module.exports = {
    addSubject: (input) => new Promise(async (resolve, reject) => {
        try {
            const {
                subject,
                keywords,
                subareas,
                professors,
            } = input;

            const subjectResponse = await subjectRepository.addSubject(subject);

            const keywordsResponse = await subjectUtils
                .addSubjectKeywordRelation(subjectResponse, keywords);

            await subjectUtils.addSubjectSubareaRelation(subjectResponse, subareas);
            await subjectUtils.addSubjectProfessorRelation(subjectResponse, professors);

            resolve({
                subject: subjectResponse,
                keywords: keywordsResponse,
                subareas,
                professors,
            });
        } catch (e) {
            reject(e);
        }
    }),

    getKeywords: () => new Promise(async (resolve, reject) => {
        try {
            const response = await keywordRepository.getKeywordAvailbleToSubject();
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    getKnowledgeAreas: () => new Promise(async (resolve, reject) => {
        try {
            const knowledgeAreas = await knowledgeAreaRepository.getKnowledgeAreas();
            const subareas = await subareaRepository.getSubareas();
            const response = knowledgeAreas.map((ka) => ({
                ...ka,
                subareas: subareas.filter((s) => s.knowledgeareaid === ka.knowledgeareaid)
            }));
            resolve(response);
        } catch (error) {
            reject(error)
        }
    }),

    getSubareas: () => new Promise(async (resolve, reject) => {
        try {
            const response = await subareaRepository.getSubareas();
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    getSubjects: () => new Promise(async (resolve, reject) => {
        try {
            const response = await subjectRepository.getSubjects();
            let professors = null;
            for(let i = 0; i < response.length; i++){
                professors = await professorRepository.getProfessorsofSubject({subjectid: response[i].subjectId});
                response[i]["professors"] = professors;
            }
            
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    deleteSubject: (subjectId) => new Promise(async (resolve, reject) => {
        try {
            const response = await subjectRepository.deleteSubject(subjectId);
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    getProfessors: () => new Promise(async (resolve, reject) => {
        try {
            const response = await professorRepository.getProfessors();
            resolve(response);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    getSubject: (input) => new Promise(async (resolve, reject) => {
        try {
            const subject = await subjectRepository.getSubject(input);
            const keywords = await keywordRepository.getKeywordsOfSubject(input);
            const subareas = await subareaRepository.getSubareasOfSubject(input);
            const professors = await professorRepository.getProfessorsofSubject(input);

            resolve({
                subject,
                keywords,
                subareas,
                professors,
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    }),

    updateSubject: (input) => new Promise(async (resolve, reject) => {
        try {
            const {
                subject,
                keywords,
                subareas,
                professors,
            } = input;

            await keywordRepository.removeKeywordsOfSubject(subject);
            await subareaRepository.removeSubareasOfSubject(subject);
            await professorRepository.removeProfessorsofSubject(subject);

            const keywordsResponse = await subjectUtils.addSubjectKeywordRelation(subject, keywords);

            await subjectUtils.addSubjectSubareaRelation(subject, subareas);

            await subjectUtils.addSubjectProfessorRelation(subject, professors);

            const subjectResponse = await subjectRepository.updateSubject(subject);

            resolve({
                subject: subjectResponse,
                keywords: keywordsResponse,
                subareas,
                professors,
            });
        } catch (e) {
            reject(e);
        }
    }),
};

const subjectUtils = {
    addSubjectKeywordRelation: async (subject, keywords) => {
        let res = [];
        for await (let keyword of keywords) {
            if (!keyword.hasOwnProperty('keywordid')) {
                keyword = await keywordRepository.addKeyword(keyword.keyword)
                    .catch((e) => console.log(e));
                delete keyword.deleted;
            }
            res = [...res, keyword];
            await keywordRepository.addKeywordSubjectRelation({
                keywordid: keyword.keywordId,
                subjectid: subject.subjectId,
            });
        }
        return res;
    },

    addSubjectSubareaRelation: async (subject, subareas) => {
        for await (const subarea of subareas) {
            await subareaRepository.addSubjectSubareaRelation({
                subareaid: subarea.subAreaId,
                subjectid: subject.subjectId,
            });
        }
    },

    addSubjectProfessorRelation: async (subject, professors) => {
        for await (const professor of professors) {
            await professorRepository.addProfessorSubjectRelation({
                regnumber: professor.regNumber,
                subjectid: subject.subjectId,
            });
        }
    },
};
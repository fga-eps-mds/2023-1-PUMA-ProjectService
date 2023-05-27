const script = `INSERT INTO "Puma_Infos"("infoId", "description", "goal", "methodology", "methodologyImage", "goalImage", "createdAt", "updatedAt") VALUES
(1, 'A Plataforma PUMA surgiu da necessidade de captar no mercado demandas de problemas reais de empresas ou órgãos públicos e privados para que possam ser resolvidos pelos estudantes da Engenharia de Produção da Universidade de Brasília.', 'Conectar as demandas de mercado aos estudantes para resolução de problemas reais;Facilitar a aplicação do PBL nas disciplinas de Projetos de Sistemas de Produção (PSPs);Avaliar a eficiência da aplicação da metodologia PBL no curso;Criar um portfolio de stakeholders para que problemas reais sejam trabalhados nos PSPs;Automatizar o processo de submissão e alocação de propostas de projetos às disciplinas;Avaliar o desempenho das competências transversais do aluno no decorrer do curso;Automatizar o processo de avaliação dos alunos no decorrer das disciplinas;Avaliar a satisfação dos stakeholders com a entrega das soluções;Divulgar os resultados dos melhores projetos;Acompanhar a evolução dos alunos graduados.', 'O currículo do curso de Engenharia de Produção da Universidade de Brasília está estruturado com base na metodologia PBL. Por isso adota sete disciplinas de projetos (PSPs) como a espinha dorsal do curso, presentes do quarto ao décimo semestre do currículo.Elas têm o intuito de desenvolver no aluno competências transversais, tais como liderança, gerenciamento, proatividade, além das competências técnicas adquiridas ao longo do curso. O PBL pode ser aplicado em qualquer área do conhecimento, mas seu uso tem crescido bastante nas engenharias, e incentiva os alunos a aprender fazendo.', ' ',' ' ,NOW(),NOW());



INSERT INTO "Topics"("topicId", "title", "description", "createdAt", "updatedAt") VALUES
(1, 'PBL', 'O pbl é legal', NOW(), NOW());

INSERT INTO "Section"("sectionId", "topicId","title", "description", "createdAt", "updatedAt") VALUES
(1, 1,'PBL voltado à engenharia de produção', 'O pbl na engenharia de produção é legal', NOW(), NOW());

INSERT INTO "Section"("sectionId", "topicId","title", "description", "createdAt", "updatedAt") VALUES
(2, 1,'Pbl como metodologia de ensino', 'Sem ter o que falar sobre', NOW(), NOW());




INSERT INTO "Topics"("topicId", "title", "description", "createdAt", "updatedAt") VALUES
(2, 'Engenharia de producao', 'A engenharia de produção é legal', NOW(), NOW());

INSERT INTO "Section"("sectionId", "topicId","title", "description", "createdAt", "updatedAt") VALUES
(3, 2,'Um dos melhores cursos da UnB', 'Um dos melhores cursos que encontramos atualmente na unb', NOW(), NOW());

INSERT INTO "Section"("sectionId", "topicId","title", "description", "createdAt", "updatedAt") VALUES
(4, 2,'Professores de qualidaed', 'Professores que se dedicam ao ensino e a aprendizagem', NOW(), NOW());



INSERT INTO "More_Info"("moreInfoId", "infoId", "title", "description", "createdAt", "updatedAt") VALUES
(1, 1, 'PUMA: explicação e desenvolvimento', 'descricao PUMA: explicação e desenvolvimento', NOW(), NOW());

INSERT INTO "More_Info"("moreInfoId", "infoId", "title", "description", "createdAt", "updatedAt") VALUES
(2, 1, 'Estruturação dos PSPs', 'descricao Estruturação dos PSPs', NOW(), NOW());

INSERT INTO "More_Info"("moreInfoId", "infoId", "title", "description", "createdAt", "updatedAt") VALUES
(3, 1, 'PUMA: explicação e desenvolvimento 2', 'descricao PUMA: explicação e desenvolvimento 2', NOW(), NOW());
`;

module.exports = script;

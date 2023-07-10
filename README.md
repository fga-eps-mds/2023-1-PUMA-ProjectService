# 2023-1-PUMA-ProjectService
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-1-PUMA-UserService&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-1-PUMA-ProjectService) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2023-1-PUMA-ProjectService&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_2023-1-PUMA-ProjectService)  [![npm version](https://img.shields.io/badge/npm--express-v4.17.1-blue)](https://www.npmjs.com/package/express/v/4.17.1)

## Objetivo

O serviço "Project-Service" foi planejado para lidar com todas as tarefas envolvendo projetos do sistema. Assim, o envio de propostas, o encaminhamento para o professor / disciplina adequada e as possíveis alterações nos projetos seriam todas tarefas para o Project-Service resolver.

Esse serviço é responsável por lidar com todas as operações que envolvem projetos e propostas de projeto no Puma. Interage com o banco de dados ao fazer:
- Inserts, deletes e consultas em lectures relacionamento entre PROFESSOR e SUBJECT  
- Consultas em PROFESSOR 
- Inserts e consultas em KEYWORDS 
- Insert, deletes e consultas em abstracts relacionamento entre KEYWORD e SUBJECT 
- Inserts e consultas em SUBJECT 
- Inserts, deletes e consultas em summarize relacionamento entre KEYWORDS e SUBJECT 
- Inserts e consultas em KNOWLEDGE_AREA 
- Inserts e consultas em PROJECT 
- Consultas com SEMESTER 
- Inserts e consultas em SUBAREA  
- Inserts e consultas em identifies relacionamento entre SUBJECT e SUBARES 
- Inserts e consultas em SUBJECT 

## Endpoints

### Alternativa de Keywords 

Esse endpoint coleta _summarize_ com base no _subject_, _keyword_, _lectures_ e _professor_

#### GET  
```
/keyword
```

### Criar uma Keyword

Esse endpoint cria uma nova _keyword_

#### POST  
```
/keyword
body: {keyword: <keyword>}
```

### Editar uma Keyword

Esse endpoint edita uma _keyword_

#### PUT  
```
/keyword
body: {keywordid: <id_keyword>, newKeyword: <nova_keyword>}
```

### Criar um summarize

Esse endpoint cria um _summarize_ com base na id da keyword e id do subject

#### POST  
```
/keyword/subject
body: {keywordid: <id_keyword>, subjectid: <id_subject>}
```

### Editar um summarize

Esse endpoint edita um _summarize_ com base na id da keyword e id do subject

#### PUT  
```
/keyword/subject
body: {keywordid: <id_keyword>, subjectid: <id_subject>}
```

### Deleta uma Keyword

Esse endpoint deleta uma _keyword_

#### DELETE  
```
/keyword/:keywordid
```

### Cria um Project

Esse endpoint cria um _project_

#### POST  
```
/project
body: {name: <name>,problem: <problem>,expectedresult: <expectedresult>,status: <status>,userid: <userid>,subjectid: <subjectid>,createdat: <createdat>}
```

### Edita um Project

Esse endpoint edita um _project_

#### PUT  
```
/project
body: {name: <name>,problem: <problem>,expectedresult: <expectedresult>,status: <status>,userid: <userid>,subjectid: <subjectid>}
```

### Avaliar um Project

Esse endpoint avalia um _project_

#### PUT  
```
/project/evaluate
body: {projectId: <projectId>, status: <status>, feedback: <feedback>}
```

### Realoca um Project

Esse endpoint realoca um _project_

#### PUT  
```
/project/reallocate
body: {projectId: <projectId>, status: <status>, feedback: <feedback>, subjectId: <subjectId>}
```
### Keywords disponiveis para um Projeto 

Esse endpoint encontra _keywords_ disponiveis para um _project_

#### GET 
```
/project/keywords
```

### Propostas de projetos 

Esse endpoint encontra propostas de projetos basedos no usuário que fez a requisição

#### GET 
```
/userProposals/:userId
```

### Projeto

Esse endpoint encontra um _project_ por seu id

#### GET 
```
/project/:projectId
```

### Deletar Project

Esse endpoint deleta um _project_ por seu id

#### DELETE 
```
/project/:projectId
```

### Adicionar Subject

Esse endpoint adiciona um _subject_

#### POST 
```
/subject
body: {
  subject: <subject>,
  keywords: <keywords>,
  subareas: <subareas>,
  professors: <professors>
 }
```

### Coletar Subject 

Esse endpoint coleta um _subject_

#### GET 
```
/subject
body: {subjectid : <id_subject>}
```

### Coletar Subject 

Esse endpoint coleta um _subject_ pelo id

#### GET 
```
/subject/:subjectid
```

### Coletar Keywords 

Esse endpoint coleta _keywords_ disponiveis para o _subject_

#### GET 
```
/subject/keywords
```

### Coletar Subareas 

Esse endpoint coleta _subareas_ 

#### GET 
```
/subareas
```

### Coletar Knowledgeareas 

Esse endpoint coleta _knowledgeareas_ 

#### GET 
```
/knowledgeareas
```

### Coletar Professors 

Esse endpoint coleta _professors_ 

#### GET 
```
/professors
```

### Editar Subject 

Esse endpoint edita um _subject_

#### PUT 
```
/subject/:subjectid
body: {
  subject: <subject>,
  keywords: <keywords>,
  subareas: <subareas>,
  professors: <professors>
 }
```

### Deletar Subject 

Esse endpoint deleta um _subject_

#### DELETE 
```
/subject/:subjectid
```


### Como rodar

Para utilizar o projeto com todos os microsserviços, siga as intruções de como rodar no [Api Gateway](https://github.com/fga-eps-mds/2023-1-PUMA-ApiGateway). Para buildar e iniciar este serviço individualmente, execute:

``` $ make dev ```

Para apenas buildar, execute:

```$ make build ```

Para apenas iniciar, execute:

```$ make run ```

Para encerrar os containers de desenvolvimento execute:

``` $ make down ```

Para rodar os testes, execute:

``` $ npm run test```

É necessário preencher o arquivo .env na raiz com as informações necessárias.

CREATE TABLE PROFILE (
	Id INTEGER,
	creator_id INTEGER NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	email VARCHAR(40) NOT NULL,
	password VARCHAR(30) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_profile
		FOREIGN KEY(creator_id)
			REFERENCES PROFILE(Id),
	
	CONSTRAINT fk_admin_profile_creator
		FOREIGN KEY(creator_id)
			REFERENCES ADMINISTRATOR(Id)
)


CREATE TABLE GRADE_TEACHER (
	Id INTEGER,
	grade_Id INTEGER NOT NULL,
	subject_Id INTEGER NOT NULL,
	
	CONSTRAINT fk_grade_teacher
		FOREIGN KEY(grade_Id)
			REFERENCES GRADE(Id),

	PRIMARY KEY(Id)
)


CREATE TABLE TEACHER (
	Id INTEGER UNIQUE,
	PRIMARY KEY(Id),
	CONSTRAINT fk_teacher
		FOREIGN KEY(Id)
			REFERENCES PROFILE(Id)
	
)

CREATE TABLE PARENT (
	Id INTEGER UNIQUE,
	PRIMARY KEY(Id),
	CONSTRAINT fk_parent
		FOREIGN KEY(Id)
			REFERENCES PROFILE(Id)
)

CREATE TABLE STUDENT (
	Id INTEGER UNIQUE,
	PRIMARY KEY(Id),
	grade_id INTEGER,
	
	CONSTRAINT fk_student
		FOREIGN KEY(Id)
			REFERENCES PROFILE(Id),
	
	CONSTRAINT fk_student_grades
		FOREIGN KEY(grade_id)
			REFERENCES Grade(Id)
)




CREATE TABLE ADMINISTRATOR (
	Id INTEGER UNIQUE,
	PRIMARY KEY(Id),
	CONSTRAINT fk_admin
		FOREIGN KEY(Id)
			REFERENCES PROFILE(Id)
)



CREATE TABLE SUBJECT (
	Id INTEGER,
	creator_id INTEGER NOT NULL,
	Name VARCHAR(20) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_subject
		FOREIGN KEY(creator_id)
			REFERENCES ADMINISTRATOR(Id)

)


CREATE TABLE GRADE (
	Id INTEGER,
	Value INTEGER NOT NULL,
	Year INTEGER NOT NULL,
	PRIMARY KEY(Id)
)





CREATE TABLE ABSENCE (
	Id INTEGER,
	creator_Id INTEGER NOT NULL,
	Type VARCHAR(20) NOT NULL,
	Reason VARCHAR(50) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_absence_teacher
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_absence_grade_teacher
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id)
	
)


CREATE TABLE ABSENCE_REASON (
	Id INTEGER,
	creator_Id INTEGER NOT NULL,
	Reason VARCHAR(50) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_absence_reason
		FOREIGN KEY(creator_Id)
			REFERENCES PARENT(Id)
)




CREATE TABLE MARK (
	Id INTEGER,	
	Value INTEGER NOT NULL,
	Year INTEGER NOT NULL,
	subject_Id INTEGER NOT NULL,
	teacher_Id INTEGER NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_mark_subject
		FOREIGN KEY(subject_Id)
			REFERENCES SUBJECT(Id),
	
	CONSTRAINT fk_mark_teacher
		FOREIGN KEY(teacher_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_mark_grade_teacher
		FOREIGN KEY(teacher_Id)
			REFERENCES GRADE_TEACHER(Id)
	
)





CREATE TABLE EVENT (
	Id INTEGER,
	creator_Id INTEGER NOT NULL,
	title VARCHAR(20) NOT NULL,
	description VARCHAR(50) NOT NULL,
	"date" DATE NOT NULL,
	place VARCHAR(20) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_admin_event
		FOREIGN KEY(creator_Id)
			REFERENCES ADMINISTRATOR(Id),
	
		
	CONSTRAINT fk_teacher_event
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
			
	CONSTRAINT fk_grade_teacher_event
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id)
)




CREATE TABLE FEEDBACK (
	Id INTEGER,
	creator_Id INTEGER NOT NULL,
	title VARCHAR(20) NOT NULL,
	description VARCHAR(50) NOT NULL,
	"date" DATE NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_student_feedback
		FOREIGN KEY(creator_Id)
			REFERENCES STUDENT(Id),
	
		
	CONSTRAINT fk_parent_feedback
		FOREIGN KEY(creator_Id)
			REFERENCES PARENT(Id)
)





CREATE TABLE MESSAGE (
	Id INTEGER,
	creator_Id INTEGER,
	messageText VARCHAR(100) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_admin_message
		FOREIGN KEY(creator_Id)
			REFERENCES ADMINISTRATOR(Id),
	
	CONSTRAINT fk_teacher_message
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_grade_teacher_message
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id),
	
	CONSTRAINT fk_parent_message
		FOREIGN KEY(creator_Id)
			REFERENCES PARENT(Id),
	
	CONSTRAINT fk_student_message
		FOREIGN KEY(creator_Id)
			REFERENCES STUDENT(Id)
)



CREATE TABLE CHAT (
	Id INTEGER,
	creator_Id INTEGER,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_admin_chat
		FOREIGN KEY(creator_Id)
			REFERENCES ADMINISTRATOR(Id),
	
	CONSTRAINT fk_teacher_chat
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_grade_teacher_chat
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id),
	
	CONSTRAINT fk_parent_chat
		FOREIGN KEY(creator_Id)
			REFERENCES PARENT(Id),
	
	CONSTRAINT fk_student_chat
		FOREIGN KEY(creator_Id)
			REFERENCES STUDENT(Id)
)



CREATE TABLE GROUP_CHAT (
	Id INTEGER,
	creator_Id INTEGER,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_admin_group_chat
		FOREIGN KEY(creator_Id)
			REFERENCES ADMINISTRATOR(Id),
	
	CONSTRAINT fk_teacher_group_chat
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_grade_teacher_group_chat
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id),
	
	CONSTRAINT fk_parent_group_chat
		FOREIGN KEY(creator_Id)
			REFERENCES PARENT(Id),
	
	CONSTRAINT fk_student_group_chat
		FOREIGN KEY(creator_Id)
			REFERENCES STUDENT(Id)
)


CREATE TABLE PARENT_MEETING (
	Id INTEGER,
	creator_Id INTEGER,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_admin_parent_meeting
		FOREIGN KEY(creator_Id)
			REFERENCES ADMINISTRATOR(Id),
	
	CONSTRAINT fk_teacher_parent_meeting
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_grade_teacher_parent_meeting
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id)
)

CREATE TABLE FORUM (
	Id INTEGER,
	creator_Id INTEGER,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_admin_forum
		FOREIGN KEY(creator_Id)
			REFERENCES ADMINISTRATOR(Id),
	
	CONSTRAINT fk_teacher_forum
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_grade_teacher_forum
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id)
)





CREATE TABLE grades_subjects (
	grade_id INTEGER REFERENCES GRADE(Id),
	subject_id INTEGER REFERENCES SUBJECT(Id),
	CONSTRAINT grades_subjects_pk PRIMARY KEY(grade_id, subject_id)
)


CREATE TABLE teachers_subjects (
	teacher_id INTEGER REFERENCES TEACHER(Id),
	subject_id INTEGER REFERENCES SUBJECT(Id),
	CONSTRAINT teachers_subjects_pk PRIMARY KEY(teacher_id, subject_id)
)


CREATE TABLE teachers_grades (
	teacher_id INTEGER REFERENCES TEACHER(Id),
	grade_id INTEGER REFERENCES GRADE(Id),
	CONSTRAINT teachers_grades_pk PRIMARY KEY(teacher_id, grade_id)
)


CREATE TABLE students_absences (
	student_id INTEGER REFERENCES STUDENT(Id),
	absence_id INTEGER REFERENCES ABSENCE(Id),
	CONSTRAINT students_absences_pk PRIMARY KEY(student_id, absence_id)
)


CREATE TABLE students_marks (
	student_id INTEGER REFERENCES STUDENT(Id),
	mark_id INTEGER REFERENCES MARK(Id),
	CONSTRAINT students_marks_pk PRIMARY KEY(student_id, mark_id)
)

CREATE TABLE absences_reasons (
	absence_id INTEGER REFERENCES ABSENCE(Id),
	reason_id INTEGER REFERENCES ABSENCE_REASON(Id),
	CONSTRAINT absences_reasons_pk PRIMARY KEY(absence_id, reason_id)
)


CREATE TABLE grades_subjects (
	grade_id INTEGER REFERENCES GRADE(Id),
	subject_id INTEGER REFERENCES SUBJECT(Id),
	CONSTRAINT grades_subjects_pk PRIMARY KEY(grade_id, subject_id)
)








	   


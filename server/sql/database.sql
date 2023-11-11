CREATE TABLE PROFILE (
	Id VARCHAR(40),
	creator_id VARCHAR(40),
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	email VARCHAR(40) NOT NULL,
	password VARCHAR(30) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_profile
		FOREIGN KEY(creator_id)
			REFERENCES PROFILE(Id),
	
)


CREATE TABLE GRADE_TEACHER (
	Id VARCHAR(40),
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_grade_teacher
		FOREIGN KEY(Id)
			REFERENCES PROFILE(Id)

)




CREATE TABLE TEACHER (
	Id VARCHAR(40) UNIQUE,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_teacher
		FOREIGN KEY(Id)
			REFERENCES PROFILE(Id)
	
)

CREATE TABLE PARENT (
	Id VARCHAR(40) UNIQUE,
	PRIMARY KEY(Id),
	CONSTRAINT fk_parent
		FOREIGN KEY(Id)
			REFERENCES PROFILE(Id)
)

CREATE TABLE STUDENT (
	Id VARCHAR(40) UNIQUE,
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
	Id VARCHAR(40) UNIQUE,
	PRIMARY KEY(Id),
	CONSTRAINT fk_admin
		FOREIGN KEY(Id)
			REFERENCES PROFILE(Id)
)



CREATE TABLE SUBJECT (
	Id VARCHAR(40),
	creator_id VARCHAR(40) NOT NULL,
	Name VARCHAR(20) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_subject
		FOREIGN KEY(creator_id)
			REFERENCES ADMINISTRATOR(Id)

)


CREATE TABLE GRADE (
	Id VARCHAR(40),
	Value INTEGER NOT NULL,
	Year INTEGER NOT NULL,
	PRIMARY KEY(Id)
)


CREATE TABLE GRADE_DIVISION (
	Id VARCHAR(40),
	Division CHAR(1) NOT NULL,
	PRIMARY KEY(Id)
)





CREATE TABLE ABSENCE (
	Id VARCHAR(40),
	creator_Id VARCHAR(40) NOT NULL,
	absence_type_id VARCHAR(40) NOT NULL,
	absence_reason_id VARCHAR(40) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_absence_type
		FOREIGN KEY(absence_type_id)
			REFERENCES ABSENCE_TYPES(Id),
	
	CONSTRAINT fk_absence_reason
		FOREIGN KEY(absence_reason_id)
			REFERENCES ABSENCE_REASONS(Id),
	
	CONSTRAINT fk_absence_teacher
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_absence_grade_teacher
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id)
	
)

CREATE TABLE ABSENCE_TYPES (
	absence_type_id  VARCHAR(40) NOT NULL,
	Type VARCHAR(50) NOT NULL
)

CREATE TABLE ABSENCE_REASONS (
	absence_reason_id VARCHAR(40) NOT NULL,
	Reason VARCHAR(50) NOT NULL
)


CREATE TABLE ABSENCE_EXCUSE-REASON (
	Id VARCHAR(40),
	creator_Id VARCHAR(40) NOT NULL,
	Reason VARCHAR(50) NOT NULL,
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_absence_excuse-reason
		FOREIGN KEY(creator_Id)
			REFERENCES PARENT(Id)
)




CREATE TABLE STUDENT_MARK (
	Id VARCHAR(40),	
	
	subject_id VARCHAR(40) NOT NULL,
	mark_id VARCHAR(40) NOT NULL,
	
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_mark_subject
		FOREIGN KEY(subject_id)
			REFERENCES SUBJECT(Id)

)


CREATE TABLE MARKS(
	mark_id INTEGER NOT NULL,
	mark INTEGER NOT NULL
)




CREATE TABLE EVENT (
	Id VARCHAR(40),
	creator_Id VARCHAR(40) NOT NULL,
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
	Id VARCHAR(40),
	creator_Id VARCHAR(40) NOT NULL,
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
	Id VARCHAR(40),
	creator_Id VARCHAR(40),
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
	Id VARCHAR(40),
	creator_Id VARCHAR(40),
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
	Id VARCHAR(40),
	creator_Id VARCHAR(40),
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
	Id VARCHAR(40),
	creator_Id VARCHAR(40),
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
	Id VARCHAR(40),
	creator_Id VARCHAR(40),
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

CREATE TABLE POST (
	Id VARCHAR(40),
	creator_Id VARCHAR(40),
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_admin_post
		FOREIGN KEY(creator_Id)
			REFERENCES ADMINISTRATOR(Id),
	
	CONSTRAINT fk_teacher_post
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_grade-teacher_post
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id)
)


CREATE TABLE COMMENT (
	Id VARCHAR(40),
	creator_Id VARCHAR(40),
	PRIMARY KEY(Id),
	
	CONSTRAINT fk_admin_comment
		FOREIGN KEY(creator_Id)
			REFERENCES ADMINISTRATOR(Id),
	
	CONSTRAINT fk_teacher_comment
		FOREIGN KEY(creator_Id)
			REFERENCES TEACHER(Id),
	
	CONSTRAINT fk_grade_teacher_comment
		FOREIGN KEY(creator_Id)
			REFERENCES GRADE_TEACHER(Id),
	
	CONSTRAINT fk_parent_comment
		FOREIGN KEY(creator_Id)
			REFERENCES PARENT(Id),
	
	CONSTRAINT fk_student_comment
		FOREIGN KEY(creator_Id)
			REFERENCES STUDENT(Id)
	
)


CREATE TABLE CHATS_MESSAGES (
	chat_id VARCHAR(40) REFERENCES CHAT(Id),
	message_id VARCHAR(40) REFERENCES MESSAGE(Id),
	
	CONSTRAINT chats_messages_pk PRIMARY KEY(chat_id, message_id)
)


CREATE TABLE GROUP_CHATS_MESSAGES (
	group_chat_id VARCHAR(40) REFERENCES GROUP_CHAT(Id),
	message_id VARCHAR(40) REFERENCES MESSAGE(Id),
	
	CONSTRAINT group_chats_messages_pk PRIMARY KEY(group_chat_id, message_id)
)


CREATE TABLE FORUMS_POSTS (
	forum_id VARCHAR(40) REFERENCES FORUM(Id),
	post_id VARCHAR(40) REFERENCES POST(Id),
	
	CONSTRAINT forums_posts_pk PRIMARY KEY(forum_id, post_id)
)



CREATE TABLE POSTS_COMMENTS (
	post_id VARCHAR(40) REFERENCES POST(Id),
	comment_id VARCHAR(40) REFERENCES COMMENT(Id),
	
	CONSTRAINT posts_comments_pk PRIMARY KEY(post_id, comment_id)
)



CREATE TABLE students_grades (
	student_id VARCHAR(40) REFERENCES STUDENT(Id),
	grade_id VARCHAR(40) REFERENCES GRADE(Id),

    CONSTRAINT students_grades_pk PRIMARY KEY(student_id, grade_id)
)


CREATE TABLE students_grade-divisions (
	student_id VARCHAR(40) REFERENCES STUDENT(Id),
	grade-division_id VARCHAR(40) REFERENCES GRADE_DIVISION(Id),
	CONSTRAINT students_grade-divisions_pk PRIMARY KEY(student_id, grade-division_id )
)




CREATE TABLE students_absences (
	student_id VARCHAR(40) REFERENCES STUDENT(Id),
	absence_id VARCHAR(40) REFERENCES ABSENCE(Id),
	CONSTRAINT students_absences_pk PRIMARY KEY(student_id, absence_id)
)


CREATE TABLE students_student-marks (
	student_id VARCHAR(40) REFERENCES STUDENT(Id),
	student-mark_id VARCHAR(40) REFERENCES STUDENT_MARK(Id),
	CONSTRAINT students_marks_pk PRIMARY KEY(student_id, student-mark_id)
)

CREATE TABLE absences_excuse-reasons (
	absence_id VARCHAR(40) REFERENCES ABSENCE(Id),
	excuse-reason_id VARCHAR(40) REFERENCES ABSENCE_EXCUSE-REASON(Id),
	CONSTRAINT absences_reasons_pk PRIMARY KEY(absence_id, reason_id)
)


CREATE TABLE grades_subjects (
	grade_id VARCHAR(40) REFERENCES GRADE(Id),
	subject_id VARCHAR(40) REFERENCES SUBJECT(Id),
	CONSTRAINT grades_subjects_pk PRIMARY KEY(grade_id, subject_id)
)



CREATE TABLE teachers_grades (
	teacher_id VARCHAR(40) REFERENCES TEACHER(Id),
	grade_id VARCHAR(40) REFERENCES GRADE(Id),
	CONSTRAINT teachers_grades_pk PRIMARY KEY(teacher_id, grade_id)
)


CREATE TABLE teachers_grade-divisions (
	teacher_id VARCHAR(40) REFERENCES TEACHER(Id),
	grade-divison_id VARCHAR(40) REFERENCES GRADE_DIVISION(Id),
	CONSTRAINT teachers_grade-divisions_pk PRIMARY KEY(teacher_id, grade-divison_id)
)


CREATE TABLE teachers_subjects (
	teacher_id VARCHAR(40) REFERENCES TEACHER(Id),
	subject_id VARCHAR(40) REFERENCES SUBJECT(Id),
	CONSTRAINT teachers_subjects_pk PRIMARY KEY(teacher_id, subject_id)
)


CREATE TABLE grade-teachers_grades (
	grade-teacher_id VARCHAR(40) REFERENCES GRADE_TEACHER(Id),
	grade_id VARCHAR(40) REFERENCES GRADE(Id),
	CONSTRAINT grade-teachers_grades_pk PRIMARY KEY(grade-teacher_id, grade_id)
)


CREATE TABLE grade-teachers_grade-divisions (
	grade-teacher_id VARCHAR(40) REFERENCES GRADE_TEACHER(Id),
	grade-division_id VARCHAR(40) REFERENCES GRADE_DIVISION(Id),
	CONSTRAINT grade-teachers_grade-divisions_pk PRIMARY KEY(grade-teacher_id, grade-division_id)
)

CREATE TABLE grade-teachers_subjects (
	grade-teacher_id VARCHAR(40) REFERENCES GRADE_TEACHER(Id),
	subject_id VARCHAR(40) REFERENCES SUBJECT(Id),
	CONSTRAINT grade-teachers_subjects_pk PRIMARY KEY(grade-teacher_id, subject_id)
)

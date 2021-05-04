CREATE DATABASE homeworkclub;

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR (255) UNIQUE NOT NULL,
email VARCHAR (50) NOT NULL,
password VARCHAR (255) NOT NULL,
role VARCHAR (50) NOT NULL

);

""
--Kari, Sian, Kirsty and Dora
INSERT INTO users (username,email,password,role) values ('kari','kari@@capgemini.com','letmein001','Adminstrator'),
 ('sian','sian@@capgemini.com','letmein002','Adminstrator'),
                                                        ('kirsty','kisty@@capgemini.com','letmein003','Adminstrator'),
                                                        ('dora','dora@@capgemini.com','letmein004','Adminstrator');
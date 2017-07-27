CREATE DATABASE `bandstalker`;

USE `bandstalker`;

CREATE TABLE `bandstalker`.`users` (
  `id` INT(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `username` VARCHAR(25) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` BINARY(60) NOT NULL,
  `active` BOOLEAN default FALSE,
  PRIMARY KEY (`id`));
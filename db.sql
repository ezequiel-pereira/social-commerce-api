CREATE SCHEMA IF NOT EXISTS `database` ;
USE `database` ;

CREATE TABLE `database`.`user` (
  `id` VARCHAR(32) NOT NULL,
  `username` VARCHAR(32) NOT NULL,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username`));

CREATE TABLE `database`.`auth` (
  `id` VARCHAR(32) NOT NULL,
  `username` VARCHAR(32) NOT NULL,
  `password` VARCHAR(64),
  UNIQUE INDEX `id_UNIQUE` (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username`));

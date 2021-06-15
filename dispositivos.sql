-- MySQL Script generated by MySQL Workbench
-- Tue Jun 15 11:43:24 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dispositivos
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dispositivos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dispositivos` DEFAULT CHARACTER SET utf8 ;
USE `dispositivos` ;

-- -----------------------------------------------------
-- Table `dispositivos`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivos`.`cargos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` LONGTEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dispositivos`.`estados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivos`.`estados` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `codigo` INT(1) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dispositivos`.`personas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivos`.`personas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `cargo_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_personas_cargos1_idx` (`cargo_id` ASC) ,
  CONSTRAINT `fk_personas_cargos1`
    FOREIGN KEY (`cargo_id`)
    REFERENCES `dispositivos`.`cargos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dispositivos`.`filtros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivos`.`filtros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` INT(1) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dispositivos`.`dispositivos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivos`.`dispositivos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `mac` VARCHAR(17) NOT NULL COMMENT 'AB:CD:EF:GH:IJ',
  `nombre` LONGTEXT NOT NULL,
  `marca` VARCHAR(45) NOT NULL,
  `modelo` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `persona_id` INT(11) NOT NULL,
  `filtro_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mac_UNIQUE` (`mac` ASC) ,
  INDEX `fk_dispositivos_personas1_idx` (`persona_id` ASC) ,
  INDEX `fk_dispositivos_filtros1_idx` (`filtro_id` ASC) ,
  CONSTRAINT `fk_dispositivos_personas1`
    FOREIGN KEY (`persona_id`)
    REFERENCES `dispositivos`.`personas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dispositivos_filtros1`
    FOREIGN KEY (`filtro_id`)
    REFERENCES `dispositivos`.`filtros` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dispositivos`.`ipes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivos`.`ipes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `longitud` LONGTEXT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `estado_id` INT(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `fk_ipes_estados1_idx` (`estado_id` ASC) ,
  CONSTRAINT `fk_ipes_estados1`
    FOREIGN KEY (`estado_id`)
    REFERENCES `dispositivos`.`estados` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 256
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dispositivos`.`conexiones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivos`.`conexiones` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `dispositivo_id` INT(11) NOT NULL,
  `ipe_id` INT(11) NOT NULL,
  `estado_id` INT(11) NOT NULL,
  `descripcion` LONGTEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dispositivos_has_ips_ips1_idx` (`ipe_id` ASC) ,
  INDEX `fk_dispositivos_has_ips_dispositivos1_idx` (`dispositivo_id` ASC) ,
  INDEX `fk_conexiones_estados1_idx` (`estado_id` ASC) ,
  CONSTRAINT `fk_conexiones_estados1`
    FOREIGN KEY (`estado_id`)
    REFERENCES `dispositivos`.`estados` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dispositivos_has_ips_dispositivos1`
    FOREIGN KEY (`dispositivo_id`)
    REFERENCES `dispositivos`.`dispositivos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dispositivos_has_ips_ips1`
    FOREIGN KEY (`ipe_id`)
    REFERENCES `dispositivos`.`ipes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dispositivos`.`monitoreos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivos`.`monitoreos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `descripcion` LONGTEXT NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL,
  `conexione_id` INT(11) NOT NULL,
  `estado_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_monitoreos_conexiones1_idx` (`conexione_id` ASC) ,
  INDEX `fk_monitoreos_estados1_idx` (`estado_id` ASC) ,
  CONSTRAINT `fk_monitoreos_conexiones1`
    FOREIGN KEY (`conexione_id`)
    REFERENCES `dispositivos`.`conexiones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_monitoreos_estados1`
    FOREIGN KEY (`estado_id`)
    REFERENCES `dispositivos`.`estados` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: abhyuthanamind_db
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `log_name` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `subject_type` varchar(255) DEFAULT NULL,
  `event` varchar(255) DEFAULT NULL,
  `subject_id` bigint(20) unsigned DEFAULT NULL,
  `causer_type` varchar(255) DEFAULT NULL,
  `causer_id` bigint(20) unsigned DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `batch_uuid` char(36) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject` (`subject_type`,`subject_id`),
  KEY `causer` (`causer_type`,`causer_id`),
  KEY `activity_log_log_name_index` (`log_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `address_line_1` text NOT NULL,
  `address_line_2` text DEFAULT NULL,
  `pincode` varchar(10) NOT NULL,
  `city_id` bigint(20) unsigned DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_user_id_foreign` (`user_id`),
  KEY `addresses_city_id_foreign` (`city_id`),
  CONSTRAINT `addresses_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL,
  CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_settings`
--

DROP TABLE IF EXISTS `app_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `group` varchar(255) NOT NULL DEFAULT 'general',
  `type` varchar(255) NOT NULL DEFAULT 'string',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `app_settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_settings`
--

LOCK TABLES `app_settings` WRITE;
/*!40000 ALTER TABLE `app_settings` DISABLE KEYS */;
INSERT INTO `app_settings` VALUES (1,'donation_enabled','1','features','boolean','2026-06-23 04:29:57','2026-06-23 04:29:57'),(2,'scrap_pickup_enabled','1','features','boolean','2026-06-23 04:29:57','2026-06-23 04:29:57'),(3,'wallet_enabled','0','features','boolean','2026-06-23 04:29:57','2026-06-23 04:29:57'),(4,'customer_support_number','+91 98702 91813','general','string','2026-06-23 04:29:57','2026-06-23 04:29:57'),(5,'support_phone','+91 11 3574 8627','general','string','2026-06-23 04:29:57','2026-06-23 04:29:57'),(6,'default_city_id','1','general','integer','2026-06-23 04:29:57','2026-06-23 04:29:57'),(7,'minimum_free_pickup_amount','1500','general','integer','2026-06-23 04:29:57','2026-06-23 04:29:57'),(8,'low_value_shipping_charge','100','general','integer','2026-06-23 04:29:57','2026-06-23 04:29:57'),(9,'app_version','1.0.3','general','string','2026-06-23 04:29:57','2026-06-23 04:29:57'),(10,'donation_products','[\"Cloth\",\"Shoes\",\"Toys\",\"Books\"]','general','json','2026-06-23 04:29:57','2026-06-23 04:29:57'),(11,'corporate_categories','[\"E-Waste, Electrical & Digital Devices\",\"Metals, Power & Energy Hub\",\"Old Furniture\"]','general','json','2026-06-23 04:29:57','2026-06-23 04:29:57'),(12,'corporate_meeting_types','[\"in_person\",\"google_meet\",\"skype\"]','general','json','2026-06-23 04:29:57','2026-06-23 04:29:57'),(13,'scrap_proof_images_required','1','general','boolean','2026-06-23 04:29:57','2026-06-23 04:29:57'),(14,'scrap_proof_image_labels','[\"front\",\"back\",\"left\",\"right\"]','general','json','2026-06-23 04:29:57','2026-06-23 04:29:57'),(15,'supported_languages','[\"en\",\"hi\",\"gu\"]','localization','json','2026-06-23 04:29:57','2026-06-23 04:29:57');
/*!40000 ALTER TABLE `app_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attribute_options`
--

DROP TABLE IF EXISTS `attribute_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attribute_options` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `attribute_id` bigint(20) unsigned NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`value`)),
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attribute_options_attribute_id_foreign` (`attribute_id`),
  CONSTRAINT `attribute_options_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=274 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute_options`
--

LOCK TABLES `attribute_options` WRITE;
/*!40000 ALTER TABLE `attribute_options` DISABLE KEYS */;
INSERT INTO `attribute_options` VALUES (1,1,'{\"en\": \"Metal\", \"hi\": \"Metal\"}',0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(2,1,'{\"en\": \"Plastic\", \"hi\": \"Plastic\"}',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(3,1,'{\"en\": \"Mixed\", \"hi\": \"Mixed\"}',2,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(4,2,'{\"en\": \"Small\", \"hi\": \"Small\"}',0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(5,2,'{\"en\": \"Medium\", \"hi\": \"Medium\"}',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(6,2,'{\"en\": \"Large\", \"hi\": \"Large\"}',2,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(7,3,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(8,3,'{\"en\": \"Refurbished\", \"hi\": \"Refurbished\"}',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(9,3,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(10,3,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',3,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(11,4,'{\"en\": \"Daikin\", \"hi\": \"Daikin\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(12,4,'{\"en\": \"Voltas\", \"hi\": \"Voltas\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(13,4,'{\"en\": \"LG\", \"hi\": \"LG\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(14,4,'{\"en\": \"Samsung\", \"hi\": \"Samsung\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(15,4,'{\"en\": \"Blue Star\", \"hi\": \"Blue Star\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(16,4,'{\"en\": \"Hitachi\", \"hi\": \"Hitachi\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(17,4,'{\"en\": \"Other\", \"hi\": \"Other\"}',6,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(18,5,'{\"en\": \"0.8-1 Ton\", \"hi\": \"0.8-1 Ton\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(19,5,'{\"en\": \"1.5 Ton\", \"hi\": \"1.5 Ton\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(20,5,'{\"en\": \"2 Ton\", \"hi\": \"2 Ton\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(21,5,'{\"en\": \"3 Ton\", \"hi\": \"3 Ton\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(22,5,'{\"en\": \"5.5 Ton\", \"hi\": \"5.5 Ton\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(23,5,'{\"en\": \"8 Ton\", \"hi\": \"8 Ton\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(24,6,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(25,6,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(26,6,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(27,7,'{\"en\": \"0-3 Years\", \"hi\": \"0-3 Years\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(28,7,'{\"en\": \"3-6 Years\", \"hi\": \"3-6 Years\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(29,7,'{\"en\": \"6+ Years\", \"hi\": \"6+ Years\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(30,8,'{\"en\": \"LG\", \"hi\": \"LG\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(31,8,'{\"en\": \"Samsung\", \"hi\": \"Samsung\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(32,8,'{\"en\": \"Whirlpool\", \"hi\": \"Whirlpool\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(33,8,'{\"en\": \"Bosch\", \"hi\": \"Bosch\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(34,8,'{\"en\": \"IFB\", \"hi\": \"IFB\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(35,8,'{\"en\": \"Godrej\", \"hi\": \"Godrej\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(36,8,'{\"en\": \"Other\", \"hi\": \"Other\"}',6,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(37,9,'{\"en\": \"Up to 6 Kg\", \"hi\": \"Up to 6 Kg\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(38,9,'{\"en\": \"6.5-8 Kg\", \"hi\": \"6.5-8 Kg\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(39,9,'{\"en\": \"8.5+ Kg\", \"hi\": \"8.5+ Kg\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(40,10,'{\"en\": \"Front Load\", \"hi\": \"Front Load\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(41,10,'{\"en\": \"Top Load\", \"hi\": \"Top Load\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(42,10,'{\"en\": \"Semi Automatic\", \"hi\": \"Semi Automatic\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(43,11,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(44,11,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(45,11,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(46,12,'{\"en\": \"0-3 Years\", \"hi\": \"0-3 Years\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(47,12,'{\"en\": \"3-6 Years\", \"hi\": \"3-6 Years\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(48,12,'{\"en\": \"6+ Years\", \"hi\": \"6+ Years\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(49,13,'{\"en\": \"Samsung\", \"hi\": \"Samsung\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(50,13,'{\"en\": \"LG\", \"hi\": \"LG\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(51,13,'{\"en\": \"Sony\", \"hi\": \"Sony\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(52,13,'{\"en\": \"Mi\", \"hi\": \"Mi\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(53,13,'{\"en\": \"TCL\", \"hi\": \"TCL\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(54,13,'{\"en\": \"Panasonic\", \"hi\": \"Panasonic\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(55,13,'{\"en\": \"Other\", \"hi\": \"Other\"}',6,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(56,14,'{\"en\": \"Up to 32\\\"\", \"hi\": \"Up to 32\\\"\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(57,14,'{\"en\": \"33-43\\\"\", \"hi\": \"33-43\\\"\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(58,14,'{\"en\": \"44-55\\\"\", \"hi\": \"44-55\\\"\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(59,14,'{\"en\": \"56\\\"+\", \"hi\": \"56\\\"+\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(60,15,'{\"en\": \"LED\", \"hi\": \"LED\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(61,15,'{\"en\": \"LCD\", \"hi\": \"LCD\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(62,15,'{\"en\": \"Plasma\", \"hi\": \"Plasma\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(63,15,'{\"en\": \"CRT\", \"hi\": \"CRT\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(64,16,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(65,16,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(66,16,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(67,17,'{\"en\": \"0-3 Years\", \"hi\": \"0-3 Years\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(68,17,'{\"en\": \"3-6 Years\", \"hi\": \"3-6 Years\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(69,17,'{\"en\": \"6+ Years\", \"hi\": \"6+ Years\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(70,18,'{\"en\": \"LG\", \"hi\": \"LG\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(71,18,'{\"en\": \"Samsung\", \"hi\": \"Samsung\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(72,18,'{\"en\": \"IFB\", \"hi\": \"IFB\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(73,18,'{\"en\": \"Panasonic\", \"hi\": \"Panasonic\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(74,18,'{\"en\": \"Whirlpool\", \"hi\": \"Whirlpool\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(75,18,'{\"en\": \"Other\", \"hi\": \"Other\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(76,19,'{\"en\": \"Solo\", \"hi\": \"Solo\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(77,19,'{\"en\": \"Grill\", \"hi\": \"Grill\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(78,19,'{\"en\": \"Convection\", \"hi\": \"Convection\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(79,20,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(80,20,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(81,20,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(82,21,'{\"en\": \"0-3 Years\", \"hi\": \"0-3 Years\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(83,21,'{\"en\": \"3-6 Years\", \"hi\": \"3-6 Years\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(84,21,'{\"en\": \"6+ Years\", \"hi\": \"6+ Years\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(85,22,'{\"en\": \"LG\", \"hi\": \"LG\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(86,22,'{\"en\": \"Samsung\", \"hi\": \"Samsung\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(87,22,'{\"en\": \"Whirlpool\", \"hi\": \"Whirlpool\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(88,22,'{\"en\": \"Godrej\", \"hi\": \"Godrej\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(89,22,'{\"en\": \"Haier\", \"hi\": \"Haier\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(90,22,'{\"en\": \"Panasonic\", \"hi\": \"Panasonic\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(91,22,'{\"en\": \"Other\", \"hi\": \"Other\"}',6,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(92,23,'{\"en\": \"Up to 200 L\", \"hi\": \"Up to 200 L\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(93,23,'{\"en\": \"201-300 L\", \"hi\": \"201-300 L\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(94,23,'{\"en\": \"301-450 L\", \"hi\": \"301-450 L\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(95,23,'{\"en\": \"450+ L\", \"hi\": \"450+ L\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(96,24,'{\"en\": \"Single Door\", \"hi\": \"Single Door\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(97,24,'{\"en\": \"Double Door\", \"hi\": \"Double Door\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(98,24,'{\"en\": \"Side-by-Side\", \"hi\": \"Side-by-Side\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(99,25,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(100,25,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(101,25,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(102,26,'{\"en\": \"0-3 Years\", \"hi\": \"0-3 Years\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(103,26,'{\"en\": \"3-6 Years\", \"hi\": \"3-6 Years\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(104,26,'{\"en\": \"6+ Years\", \"hi\": \"6+ Years\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(105,27,'{\"en\": \"Philips\", \"hi\": \"Philips\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(106,27,'{\"en\": \"Preethi\", \"hi\": \"Preethi\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(107,27,'{\"en\": \"Bajaj\", \"hi\": \"Bajaj\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(108,27,'{\"en\": \"Sujata\", \"hi\": \"Sujata\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(109,27,'{\"en\": \"Havells\", \"hi\": \"Havells\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(110,27,'{\"en\": \"Other\", \"hi\": \"Other\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(111,28,'{\"en\": \"1 Jar\", \"hi\": \"1 Jar\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(112,28,'{\"en\": \"2 Jars\", \"hi\": \"2 Jars\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(113,28,'{\"en\": \"3+ Jars\", \"hi\": \"3+ Jars\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(114,29,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(115,29,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(116,29,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(117,30,'{\"en\": \"Elica\", \"hi\": \"Elica\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(118,30,'{\"en\": \"Faber\", \"hi\": \"Faber\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(119,30,'{\"en\": \"Hindware\", \"hi\": \"Hindware\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(120,30,'{\"en\": \"Glen\", \"hi\": \"Glen\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(121,30,'{\"en\": \"Kaff\", \"hi\": \"Kaff\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(122,30,'{\"en\": \"Other\", \"hi\": \"Other\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(123,31,'{\"en\": \"Below 1000 m3/h\", \"hi\": \"Below 1000 m3/h\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(124,31,'{\"en\": \"1000-1200 m3/h\", \"hi\": \"1000-1200 m3/h\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(125,31,'{\"en\": \"1200+ m3/h\", \"hi\": \"1200+ m3/h\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(126,32,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(127,32,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(128,32,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(129,33,'{\"en\": \"Kent\", \"hi\": \"Kent\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(130,33,'{\"en\": \"Aquaguard\", \"hi\": \"Aquaguard\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(131,33,'{\"en\": \"Pureit\", \"hi\": \"Pureit\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(132,33,'{\"en\": \"Livpure\", \"hi\": \"Livpure\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(133,33,'{\"en\": \"AO Smith\", \"hi\": \"AO Smith\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(134,33,'{\"en\": \"Other\", \"hi\": \"Other\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(135,34,'{\"en\": \"RO\", \"hi\": \"RO\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(136,34,'{\"en\": \"RO+UV\", \"hi\": \"RO+UV\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(137,34,'{\"en\": \"RO+UV+UF\", \"hi\": \"RO+UV+UF\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(138,35,'{\"en\": \"Working\", \"hi\": \"Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(139,35,'{\"en\": \"Non-Working\", \"hi\": \"Non-Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(140,35,'{\"en\": \"Scrap\", \"hi\": \"Scrap\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(141,36,'{\"en\": \"Apple\", \"hi\": \"Apple\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(142,36,'{\"en\": \"Samsung\", \"hi\": \"Samsung\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(143,36,'{\"en\": \"OnePlus\", \"hi\": \"OnePlus\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(144,36,'{\"en\": \"Motorola\", \"hi\": \"Motorola\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(145,36,'{\"en\": \"Nothing\", \"hi\": \"Nothing\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(146,36,'{\"en\": \"Xiaomi\", \"hi\": \"Xiaomi\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(147,36,'{\"en\": \"Vivo\", \"hi\": \"Vivo\"}',6,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(148,36,'{\"en\": \"Oppo\", \"hi\": \"Oppo\"}',7,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(149,36,'{\"en\": \"Realme\", \"hi\": \"Realme\"}',8,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(150,36,'{\"en\": \"Other\", \"hi\": \"Other\"}',9,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(151,37,'{\"en\": \"64 GB\", \"hi\": \"64 GB\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(152,37,'{\"en\": \"128 GB\", \"hi\": \"128 GB\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(153,37,'{\"en\": \"256 GB\", \"hi\": \"256 GB\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(154,37,'{\"en\": \"512 GB\", \"hi\": \"512 GB\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(155,38,'{\"en\": \"0-1 Year\", \"hi\": \"0-1 Year\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(156,38,'{\"en\": \"1-2 Years\", \"hi\": \"1-2 Years\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(157,38,'{\"en\": \"2-3 Years\", \"hi\": \"2-3 Years\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(158,38,'{\"en\": \"3+ Years\", \"hi\": \"3+ Years\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(159,39,'{\"en\": \"No Damage\", \"hi\": \"No Damage\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(160,39,'{\"en\": \"Minor Scratch\", \"hi\": \"Minor Scratch\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(161,39,'{\"en\": \"Cracked\", \"hi\": \"Cracked\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(162,40,'{\"en\": \"Fully Working\", \"hi\": \"Fully Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(163,40,'{\"en\": \"Partially Working\", \"hi\": \"Partially Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(164,40,'{\"en\": \"Not Working\", \"hi\": \"Not Working\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(165,41,'{\"en\": \"Apple\", \"hi\": \"Apple\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(166,41,'{\"en\": \"Dell\", \"hi\": \"Dell\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(167,41,'{\"en\": \"HP\", \"hi\": \"HP\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(168,41,'{\"en\": \"Lenovo\", \"hi\": \"Lenovo\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(169,41,'{\"en\": \"Asus\", \"hi\": \"Asus\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(170,41,'{\"en\": \"Acer\", \"hi\": \"Acer\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(171,41,'{\"en\": \"MSI\", \"hi\": \"MSI\"}',6,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(172,41,'{\"en\": \"Other\", \"hi\": \"Other\"}',7,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(173,42,'{\"en\": \"Intel i3 / Ryzen 3\", \"hi\": \"Intel i3 / Ryzen 3\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(174,42,'{\"en\": \"Intel i5 / Ryzen 5\", \"hi\": \"Intel i5 / Ryzen 5\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(175,42,'{\"en\": \"Intel i7+ / Ryzen 7+\", \"hi\": \"Intel i7+ / Ryzen 7+\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(176,42,'{\"en\": \"Apple MacBook\", \"hi\": \"Apple MacBook\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(177,43,'{\"en\": \"1st-5th Gen\", \"hi\": \"1st-5th Gen\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(178,43,'{\"en\": \"6th-8th Gen\", \"hi\": \"6th-8th Gen\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(179,43,'{\"en\": \"9th-10th Gen\", \"hi\": \"9th-10th Gen\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(180,43,'{\"en\": \"11th-13th Gen\", \"hi\": \"11th-13th Gen\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(181,43,'{\"en\": \"Intel\", \"hi\": \"Intel\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(182,43,'{\"en\": \"M1\", \"hi\": \"M1\"}',5,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(183,43,'{\"en\": \"M2\", \"hi\": \"M2\"}',6,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(184,43,'{\"en\": \"M1 Pro\", \"hi\": \"M1 Pro\"}',7,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(185,43,'{\"en\": \"M2 Pro\", \"hi\": \"M2 Pro\"}',8,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(186,43,'{\"en\": \"M3 / M3 Pro\", \"hi\": \"M3 / M3 Pro\"}',9,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(187,44,'{\"en\": \"4 GB\", \"hi\": \"4 GB\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(188,44,'{\"en\": \"8 GB\", \"hi\": \"8 GB\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(189,44,'{\"en\": \"16 GB\", \"hi\": \"16 GB\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(190,44,'{\"en\": \"32 GB+\", \"hi\": \"32 GB+\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(191,45,'{\"en\": \"HDD\", \"hi\": \"HDD\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(192,45,'{\"en\": \"SSD SATA\", \"hi\": \"SSD SATA\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(193,45,'{\"en\": \"NVMe SSD\", \"hi\": \"NVMe SSD\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(194,46,'{\"en\": \"Good\", \"hi\": \"Good\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(195,46,'{\"en\": \"Minor Dents\", \"hi\": \"Minor Dents\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(196,46,'{\"en\": \"Major Damage\", \"hi\": \"Major Damage\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(197,47,'{\"en\": \"Good\", \"hi\": \"Good\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(198,47,'{\"en\": \"Average\", \"hi\": \"Average\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(199,47,'{\"en\": \"Poor\", \"hi\": \"Poor\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(200,48,'{\"en\": \"Fully Working\", \"hi\": \"Fully Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(201,48,'{\"en\": \"Partially Working\", \"hi\": \"Partially Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(202,48,'{\"en\": \"Not Working\", \"hi\": \"Not Working\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(203,49,'{\"en\": \"High Copper\", \"hi\": \"High Copper\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(204,49,'{\"en\": \"Mixed\", \"hi\": \"Mixed\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(205,49,'{\"en\": \"Low Copper\", \"hi\": \"Low Copper\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(206,50,'{\"en\": \"Clean Stripped\", \"hi\": \"Clean Stripped\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(207,50,'{\"en\": \"Partially Stripped\", \"hi\": \"Partially Stripped\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(208,50,'{\"en\": \"Unstripped\", \"hi\": \"Unstripped\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(209,51,'{\"en\": \"Premium\", \"hi\": \"Premium\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(210,51,'{\"en\": \"Standard\", \"hi\": \"Standard\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(211,51,'{\"en\": \"Low\", \"hi\": \"Low\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(212,52,'{\"en\": \"Branded Desktop\", \"hi\": \"Branded Desktop\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(213,52,'{\"en\": \"Assembled Desktop\", \"hi\": \"Assembled Desktop\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(214,52,'{\"en\": \"Bare Cabinet\", \"hi\": \"Bare Cabinet\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(215,53,'{\"en\": \"Intel i3 / Ryzen 3\", \"hi\": \"Intel i3 / Ryzen 3\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(216,53,'{\"en\": \"Intel i5 / Ryzen 5\", \"hi\": \"Intel i5 / Ryzen 5\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(217,53,'{\"en\": \"Intel i7+ / Ryzen 7+\", \"hi\": \"Intel i7+ / Ryzen 7+\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(218,54,'{\"en\": \"1st-5th Gen\", \"hi\": \"1st-5th Gen\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(219,54,'{\"en\": \"6th-8th Gen\", \"hi\": \"6th-8th Gen\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(220,54,'{\"en\": \"9th-10th Gen\", \"hi\": \"9th-10th Gen\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(221,54,'{\"en\": \"11th-13th Gen\", \"hi\": \"11th-13th Gen\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(222,55,'{\"en\": \"No RAM\", \"hi\": \"No RAM\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(223,55,'{\"en\": \"4-8 GB\", \"hi\": \"4-8 GB\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(224,55,'{\"en\": \"16 GB+\", \"hi\": \"16 GB+\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(225,56,'{\"en\": \"No Storage\", \"hi\": \"No Storage\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(226,56,'{\"en\": \"HDD\", \"hi\": \"HDD\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(227,56,'{\"en\": \"SSD / NVMe\", \"hi\": \"SSD / NVMe\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(228,57,'{\"en\": \"Fully Working\", \"hi\": \"Fully Working\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(229,57,'{\"en\": \"Partially Working\", \"hi\": \"Partially Working\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(230,57,'{\"en\": \"Not Working\", \"hi\": \"Not Working\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(231,58,'{\"en\": \"Solid Wood\", \"hi\": \"Solid Wood\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(232,58,'{\"en\": \"Engineered Wood\", \"hi\": \"Engineered Wood\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(233,58,'{\"en\": \"Plastic\", \"hi\": \"Plastic\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(234,58,'{\"en\": \"Metal\", \"hi\": \"Metal\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(235,58,'{\"en\": \"Other\", \"hi\": \"Other\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(236,59,'{\"en\": \"Small\", \"hi\": \"Small\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(237,59,'{\"en\": \"Medium\", \"hi\": \"Medium\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(238,59,'{\"en\": \"Large\", \"hi\": \"Large\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(239,60,'{\"en\": \"Good\", \"hi\": \"Good\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(240,60,'{\"en\": \"Usable\", \"hi\": \"Usable\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(241,60,'{\"en\": \"Damaged\", \"hi\": \"Damaged\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(242,61,'{\"en\": \"Heavy Steel\", \"hi\": \"Heavy Steel\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(243,61,'{\"en\": \"Light Steel\", \"hi\": \"Light Steel\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(244,61,'{\"en\": \"Wood + Steel Mix\", \"hi\": \"Wood + Steel Mix\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(245,61,'{\"en\": \"Other\", \"hi\": \"Other\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(246,62,'{\"en\": \"2 Door Compact\", \"hi\": \"2 Door Compact\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(247,62,'{\"en\": \"2 Door Standard\", \"hi\": \"2 Door Standard\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(248,62,'{\"en\": \"3 Door / Large\", \"hi\": \"3 Door / Large\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(249,63,'{\"en\": \"Good\", \"hi\": \"Good\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(250,63,'{\"en\": \"Usable\", \"hi\": \"Usable\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(251,63,'{\"en\": \"Damaged\", \"hi\": \"Damaged\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(252,64,'{\"en\": \"Solid Wood\", \"hi\": \"Solid Wood\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(253,64,'{\"en\": \"Engineered Wood\", \"hi\": \"Engineered Wood\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(254,64,'{\"en\": \"Metal Frame\", \"hi\": \"Metal Frame\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(255,64,'{\"en\": \"Plastic\", \"hi\": \"Plastic\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(256,64,'{\"en\": \"Other\", \"hi\": \"Other\"}',4,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(257,65,'{\"en\": \"2-3 ft\", \"hi\": \"2-3 ft\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(258,65,'{\"en\": \"4 ft\", \"hi\": \"4 ft\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(259,65,'{\"en\": \"5 ft+\", \"hi\": \"5 ft+\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(260,66,'{\"en\": \"Good\", \"hi\": \"Good\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(261,66,'{\"en\": \"Usable\", \"hi\": \"Usable\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(262,66,'{\"en\": \"Damaged\", \"hi\": \"Damaged\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(263,67,'{\"en\": \"1 Seater\", \"hi\": \"1 Seater\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(264,67,'{\"en\": \"2 Seater\", \"hi\": \"2 Seater\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(265,67,'{\"en\": \"3 Seater\", \"hi\": \"3 Seater\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(266,67,'{\"en\": \"L-Shape / 5 Seater+\", \"hi\": \"L-Shape / 5 Seater+\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(267,68,'{\"en\": \"Solid Wood\", \"hi\": \"Solid Wood\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(268,68,'{\"en\": \"Engineered Wood\", \"hi\": \"Engineered Wood\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(269,68,'{\"en\": \"Metal\", \"hi\": \"Metal\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(270,68,'{\"en\": \"Other\", \"hi\": \"Other\"}',3,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(271,69,'{\"en\": \"Good\", \"hi\": \"Good\"}',0,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(272,69,'{\"en\": \"Usable\", \"hi\": \"Usable\"}',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(273,69,'{\"en\": \"Damaged\", \"hi\": \"Damaged\"}',2,'2026-06-23 04:29:58','2026-06-23 04:29:58');
/*!40000 ALTER TABLE `attribute_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attributes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`name`)),
  `code` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `type` enum('select','radio','checkbox','text','number') NOT NULL DEFAULT 'select',
  `is_required` tinyint(1) NOT NULL DEFAULT 0,
  `unit` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `attributes_slug_unique` (`slug`),
  UNIQUE KEY `attributes_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` VALUES (1,'{\"en\": \"Material Type\", \"hi\": \"Material Type\"}',NULL,'material-type','select',0,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(2,'{\"en\": \"Pickup Size\", \"hi\": \"Pickup Size\"}',NULL,'pickup-size','select',0,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(3,'{\"en\": \"Condition\", \"hi\": \"Condition\"}',NULL,'condition','select',0,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(4,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'air-conditioner-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(5,'{\"en\": \"Cooling Capacity (Ton)\", \"hi\": \"Cooling Capacity (Ton)\"}',NULL,'air-conditioner-cooling-capacity-ton','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(6,'{\"en\": \"Working Condition\", \"hi\": \"Working Condition\"}',NULL,'air-conditioner-working-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(7,'{\"en\": \"Usage Age (If Working)\", \"hi\": \"Usage Age (If Working)\"}',NULL,'air-conditioner-usage-age-if-working','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(8,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'washing-machine-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(9,'{\"en\": \"Drum Capacity (Kg)\", \"hi\": \"Drum Capacity (Kg)\"}',NULL,'washing-machine-drum-capacity-kg','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(10,'{\"en\": \"Machine Type\", \"hi\": \"Machine Type\"}',NULL,'washing-machine-machine-type','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(11,'{\"en\": \"Working Condition\", \"hi\": \"Working Condition\"}',NULL,'washing-machine-working-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(12,'{\"en\": \"Usage Age (If Working)\", \"hi\": \"Usage Age (If Working)\"}',NULL,'washing-machine-usage-age-if-working','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(13,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'television-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(14,'{\"en\": \"Screen Size (Inch)\", \"hi\": \"Screen Size (Inch)\"}',NULL,'television-screen-size-inch','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(15,'{\"en\": \"Display Type\", \"hi\": \"Display Type\"}',NULL,'television-display-type','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(16,'{\"en\": \"Working Condition\", \"hi\": \"Working Condition\"}',NULL,'television-working-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(17,'{\"en\": \"Usage Age (If Working)\", \"hi\": \"Usage Age (If Working)\"}',NULL,'television-usage-age-if-working','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(18,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'microwave-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(19,'{\"en\": \"Type\", \"hi\": \"Type\"}',NULL,'microwave-type','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(20,'{\"en\": \"Working Condition\", \"hi\": \"Working Condition\"}',NULL,'microwave-working-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(21,'{\"en\": \"Usage Age (If Working)\", \"hi\": \"Usage Age (If Working)\"}',NULL,'microwave-usage-age-if-working','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(22,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'refrigerator-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(23,'{\"en\": \"Capacity\", \"hi\": \"Capacity\"}',NULL,'refrigerator-capacity','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(24,'{\"en\": \"Door Type\", \"hi\": \"Door Type\"}',NULL,'refrigerator-door-type','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(25,'{\"en\": \"Working Condition\", \"hi\": \"Working Condition\"}',NULL,'refrigerator-working-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(26,'{\"en\": \"Usage Age (If Working)\", \"hi\": \"Usage Age (If Working)\"}',NULL,'refrigerator-usage-age-if-working','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(27,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'mixer-grinder-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(28,'{\"en\": \"Jar Count\", \"hi\": \"Jar Count\"}',NULL,'mixer-grinder-jar-count','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(29,'{\"en\": \"Working Condition\", \"hi\": \"Working Condition\"}',NULL,'mixer-grinder-working-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(30,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'kitchen-chimney-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(31,'{\"en\": \"Suction Capacity\", \"hi\": \"Suction Capacity\"}',NULL,'kitchen-chimney-suction-capacity','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(32,'{\"en\": \"Working Condition\", \"hi\": \"Working Condition\"}',NULL,'kitchen-chimney-working-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(33,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'water-purifier-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(34,'{\"en\": \"Purifier Type\", \"hi\": \"Purifier Type\"}',NULL,'water-purifier-purifier-type','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(35,'{\"en\": \"Working Condition\", \"hi\": \"Working Condition\"}',NULL,'water-purifier-working-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(36,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'mobile-phone-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(37,'{\"en\": \"Storage Variant\", \"hi\": \"Storage Variant\"}',NULL,'mobile-phone-storage-variant','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(38,'{\"en\": \"Device Age\", \"hi\": \"Device Age\"}',NULL,'mobile-phone-device-age','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(39,'{\"en\": \"Screen Condition\", \"hi\": \"Screen Condition\"}',NULL,'mobile-phone-screen-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(40,'{\"en\": \"Functional Status\", \"hi\": \"Functional Status\"}',NULL,'mobile-phone-functional-status','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(41,'{\"en\": \"Brand\", \"hi\": \"Brand\"}',NULL,'laptop-brand','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(42,'{\"en\": \"Processor Tier\", \"hi\": \"Processor Tier\"}',NULL,'laptop-processor-tier','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(43,'{\"en\": \"Processor Generation\", \"hi\": \"Processor Generation\"}',NULL,'laptop-processor-generation','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(44,'{\"en\": \"RAM Variant\", \"hi\": \"RAM Variant\"}',NULL,'laptop-ram-variant','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(45,'{\"en\": \"Storage Type\", \"hi\": \"Storage Type\"}',NULL,'laptop-storage-type','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(46,'{\"en\": \"Body Condition\", \"hi\": \"Body Condition\"}',NULL,'laptop-body-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(47,'{\"en\": \"Battery Health\", \"hi\": \"Battery Health\"}',NULL,'laptop-battery-health','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(48,'{\"en\": \"Functional Status\", \"hi\": \"Functional Status\"}',NULL,'laptop-functional-status','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(49,'{\"en\": \"Metal Content\", \"hi\": \"Metal Content\"}',NULL,'cables-wires-metal-content','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(50,'{\"en\": \"Insulation State\", \"hi\": \"Insulation State\"}',NULL,'cables-wires-insulation-state','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(51,'{\"en\": \"Quality Grade\", \"hi\": \"Quality Grade\"}',NULL,'cables-wires-quality-grade','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(52,'{\"en\": \"Cabinet Type\", \"hi\": \"Cabinet Type\"}',NULL,'cpu-cabinet-cabinet-type','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(53,'{\"en\": \"Processor Tier\", \"hi\": \"Processor Tier\"}',NULL,'cpu-cabinet-processor-tier','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(54,'{\"en\": \"Processor Generation\", \"hi\": \"Processor Generation\"}',NULL,'cpu-cabinet-processor-generation','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(55,'{\"en\": \"RAM Installed\", \"hi\": \"RAM Installed\"}',NULL,'cpu-cabinet-ram-installed','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(56,'{\"en\": \"Storage Installed\", \"hi\": \"Storage Installed\"}',NULL,'cpu-cabinet-storage-installed','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(57,'{\"en\": \"Functional Status\", \"hi\": \"Functional Status\"}',NULL,'cpu-cabinet-functional-status','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(58,'{\"en\": \"Material\", \"hi\": \"Material\"}',NULL,'wooden-chair-material','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(59,'{\"en\": \"Size\", \"hi\": \"Size\"}',NULL,'wooden-chair-size','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(60,'{\"en\": \"Condition\", \"hi\": \"Condition\"}',NULL,'wooden-chair-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(61,'{\"en\": \"Material\", \"hi\": \"Material\"}',NULL,'steel-cupboard-material','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(62,'{\"en\": \"Size\", \"hi\": \"Size\"}',NULL,'steel-cupboard-size','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(63,'{\"en\": \"Condition\", \"hi\": \"Condition\"}',NULL,'steel-cupboard-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(64,'{\"en\": \"Material\", \"hi\": \"Material\"}',NULL,'study-table-material','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(65,'{\"en\": \"Size\", \"hi\": \"Size\"}',NULL,'study-table-size','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(66,'{\"en\": \"Condition\", \"hi\": \"Condition\"}',NULL,'study-table-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(67,'{\"en\": \"Sofa Type\", \"hi\": \"Sofa Type\"}',NULL,'sofa-set-sofa-type','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(68,'{\"en\": \"Frame Material\", \"hi\": \"Frame Material\"}',NULL,'sofa-set-frame-material','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(69,'{\"en\": \"Condition\", \"hi\": \"Condition\"}',NULL,'sofa-set-condition','select',0,NULL,1,'2026-06-23 04:29:58','2026-06-23 04:29:58');
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('abhyuthanamind_cache_admin@rewarity.com|127.0.0.1','i:1;',1782482908),('abhyuthanamind_cache_admin@rewarity.com|127.0.0.1:timer','i:1782482908;',1782482908);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_type_id` bigint(20) unsigned DEFAULT NULL,
  `name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`name`)),
  `slug` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `requires_details` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  KEY `categories_category_type_id_foreign` (`category_type_id`),
  CONSTRAINT `categories_category_type_id_foreign` FOREIGN KEY (`category_type_id`) REFERENCES `category_types` (`id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,1,'{\"en\": \"Air Conditioner\", \"hi\": \"Air Conditioner\"}','e-waste-electrical-digital-devices-air-conditioner','images/new/scrap/air_conditioner.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(2,1,'{\"en\": \"Washing Machine\", \"hi\": \"Washing Machine\"}','e-waste-electrical-digital-devices-washing-machine','images/new/scrap/washing_machine.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(3,1,'{\"en\": \"Television\", \"hi\": \"Television\"}','e-waste-electrical-digital-devices-television','images/new/scrap/television.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(4,1,'{\"en\": \"Microwave\", \"hi\": \"Microwave\"}','e-waste-electrical-digital-devices-microwave','images/new/scrap/microwave.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(5,1,'{\"en\": \"Refrigerator\", \"hi\": \"Refrigerator\"}','e-waste-electrical-digital-devices-refrigerator','images/new/scrap/refrigerator.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(6,1,'{\"en\": \"Mixer Grinder\", \"hi\": \"Mixer Grinder\"}','e-waste-electrical-digital-devices-mixer-grinder','images/new/scrap/mixer_grinder.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(7,1,'{\"en\": \"Kitchen Chimney\", \"hi\": \"Kitchen Chimney\"}','e-waste-electrical-digital-devices-kitchen-chimney','images/new/scrap/kitchen_chimney.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(8,1,'{\"en\": \"Water Purifier\", \"hi\": \"Water Purifier\"}','e-waste-electrical-digital-devices-water-purifier','images/new/scrap/water_purifier.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(9,1,'{\"en\": \"Mobile Phone\", \"hi\": \"Mobile Phone\"}','e-waste-electrical-digital-devices-mobile-phone','images/new/scrap/mobile_phone.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(10,1,'{\"en\": \"Laptop\", \"hi\": \"Laptop\"}','e-waste-electrical-digital-devices-laptop','images/new/scrap/laptop.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(11,1,'{\"en\": \"Cables & Wires\", \"hi\": \"Cables & Wires\"}','e-waste-electrical-digital-devices-cables-wires','images/new/scrap/cables_wires.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(12,1,'{\"en\": \"CPU Cabinet\", \"hi\": \"CPU Cabinet\"}','e-waste-electrical-digital-devices-cpu-cabinet','images/new/scrap/cpu_cabinet.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(13,1,'{\"en\": \"Desktop Computer\", \"hi\": \"Desktop Computer\"}','e-waste-electrical-digital-devices-desktop-computer','images/new/scrap/desktop_computer.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(14,1,'{\"en\": \"CRT Monitor\", \"hi\": \"CRT Monitor\"}','e-waste-electrical-digital-devices-crt-monitor','images/new/scrap/crt_monitor.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(15,1,'{\"en\": \"LCD Monitor\", \"hi\": \"LCD Monitor\"}','e-waste-electrical-digital-devices-lcd-monitor','images/new/scrap/lcd_monitor.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(16,1,'{\"en\": \"LED Monitor\", \"hi\": \"LED Monitor\"}','e-waste-electrical-digital-devices-led-monitor','images/new/scrap/led_monitor.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(17,1,'{\"en\": \"Mouse\", \"hi\": \"Mouse\"}','e-waste-electrical-digital-devices-mouse','images/new/scrap/mouse.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(18,1,'{\"en\": \"Keyboard\", \"hi\": \"Keyboard\"}','e-waste-electrical-digital-devices-keyboard','images/new/scrap/keyboard.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(19,1,'{\"en\": \"Motherboard\", \"hi\": \"Motherboard\"}','e-waste-electrical-digital-devices-motherboard','images/new/scrap/motherboard.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(20,1,'{\"en\": \"Hard Disk Drive\", \"hi\": \"Hard Disk Drive\"}','e-waste-electrical-digital-devices-hard-disk-drive','images/new/scrap/hard_disk_drive.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(21,1,'{\"en\": \"Server\", \"hi\": \"Server\"}','e-waste-electrical-digital-devices-server','images/new/scrap/server.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(22,1,'{\"en\": \"RAM\", \"hi\": \"RAM\"}','e-waste-electrical-digital-devices-ram','images/new/scrap/ram.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(23,1,'{\"en\": \"Printer\", \"hi\": \"Printer\"}','e-waste-electrical-digital-devices-printer','images/new/scrap/printer.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(24,1,'{\"en\": \"Scanner\", \"hi\": \"Scanner\"}','e-waste-electrical-digital-devices-scanner','images/new/scrap/scanner.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(25,1,'{\"en\": \"Tablet\", \"hi\": \"Tablet\"}','e-waste-electrical-digital-devices-tablet','images/new/scrap/tablet.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(26,1,'{\"en\": \"Charger\", \"hi\": \"Charger\"}','e-waste-electrical-digital-devices-charger','images/new/scrap/charger.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(27,1,'{\"en\": \"Laptop Adapter\", \"hi\": \"Laptop Adapter\"}','e-waste-electrical-digital-devices-laptop-adapter','images/new/scrap/adapter.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(28,1,'{\"en\": \"Mobile Adaptor\", \"hi\": \"Mobile Adaptor\"}','e-waste-electrical-digital-devices-mobile-adaptor','images/new/scrap/mobile_adaptor.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(29,1,'{\"en\": \"Power Bank\", \"hi\": \"Power Bank\"}','e-waste-electrical-digital-devices-power-bank','images/new/scrap/power_bank.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(30,1,'{\"en\": \"Earbuds/Earphone\", \"hi\": \"Earbuds/Earphone\"}','e-waste-electrical-digital-devices-earbudsearphone','images/new/scrap/earphones_earbuds.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(31,1,'{\"en\": \"Headphones\", \"hi\": \"Headphones\"}','e-waste-electrical-digital-devices-headphones','images/new/scrap/headphones.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(32,1,'{\"en\": \"Induction Cooktop\", \"hi\": \"Induction Cooktop\"}','e-waste-electrical-digital-devices-induction-cooktop','images/new/scrap/induction_cooktop.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(33,1,'{\"en\": \"UPS 600 VA With Battery\", \"hi\": \"UPS 600 VA With Battery\"}','e-waste-electrical-digital-devices-ups-600-va-with-battery','images/new/scrap/ups_with_battery.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(34,1,'{\"en\": \"UPS 600 VA Without Battery\", \"hi\": \"UPS 600 VA Without Battery\"}','e-waste-electrical-digital-devices-ups-600-va-without-battery','images/new/scrap/ups_without_battery.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(35,1,'{\"en\": \"Inverter With Battery\", \"hi\": \"Inverter With Battery\"}','e-waste-electrical-digital-devices-inverter-with-battery','images/new/scrap/inverter_with_battery.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(36,1,'{\"en\": \"Inverter Without Battery\", \"hi\": \"Inverter Without Battery\"}','e-waste-electrical-digital-devices-inverter-without-battery','images/new/scrap/inverter_without_battery.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(37,1,'{\"en\": \"Geyser\", \"hi\": \"Geyser\"}','e-waste-electrical-digital-devices-geyser','images/new/scrap/geyser.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(38,1,'{\"en\": \"Ceiling Fan / Wall Mounted Fan\", \"hi\": \"Ceiling Fan / Wall Mounted Fan\"}','e-waste-electrical-digital-devices-ceiling-fan-wall-mounted-fan','images/new/scrap/ceiling_wall_fan.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(39,1,'{\"en\": \"Table Fan / Stand Fan\", \"hi\": \"Table Fan / Stand Fan\"}','e-waste-electrical-digital-devices-table-fan-stand-fan','images/new/scrap/table_stand_fan.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(40,1,'{\"en\": \"Air Cooler\", \"hi\": \"Air Cooler\"}','e-waste-electrical-digital-devices-air-cooler','images/new/scrap/air_cooler.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(41,2,'{\"en\": \"MS Scrap\", \"hi\": \"MS Scrap\"}','metals-power-energy-hub-ms-scrap','images/new/scrap/ms_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(42,2,'{\"en\": \"Cast Iron Scrap\", \"hi\": \"Cast Iron Scrap\"}','metals-power-energy-hub-cast-iron-scrap','images/new/scrap/cast_iron_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(43,2,'{\"en\": \"Heavy Melting Scrap\", \"hi\": \"Heavy Melting Scrap\"}','metals-power-energy-hub-heavy-melting-scrap','images/new/scrap/heavy_melting_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(44,2,'{\"en\": \"Iron Rod / Saria Scrap\", \"hi\": \"Iron Rod / Saria Scrap\"}','metals-power-energy-hub-iron-rod-saria-scrap','images/new/scrap/iron_rod_saria.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(45,2,'{\"en\": \"Old Steel Pipes & Plates\", \"hi\": \"Old Steel Pipes & Plates\"}','metals-power-energy-hub-old-steel-pipes-plates','images/new/scrap/old_steel_pipes_plates.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(46,2,'{\"en\": \"Machinery Iron Parts\", \"hi\": \"Machinery Iron Parts\"}','metals-power-energy-hub-machinery-iron-parts','images/new/scrap/machinery_iron_parts.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(47,2,'{\"en\": \"Copper Wire\", \"hi\": \"Copper Wire\"}','metals-power-energy-hub-copper-wire','images/new/scrap/copper_wire.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(48,2,'{\"en\": \"Copper\", \"hi\": \"Copper\"}','metals-power-energy-hub-copper','images/new/scrap/copper.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(49,2,'{\"en\": \"Bras\", \"hi\": \"Bras\"}','metals-power-energy-hub-bras','images/new/scrap/bras.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(50,2,'{\"en\": \"Aluminium Scrap\", \"hi\": \"Aluminium Scrap\"}','metals-power-energy-hub-aluminium-scrap','images/new/scrap/aluminium_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(51,2,'{\"en\": \"Lead Scrap\", \"hi\": \"Lead Scrap\"}','metals-power-energy-hub-lead-scrap','images/new/scrap/lead_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(52,2,'{\"en\": \"Zinc Scrap\", \"hi\": \"Zinc Scrap\"}','metals-power-energy-hub-zinc-scrap','images/new/scrap/zinc_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(53,2,'{\"en\": \"Nickel Scrap\", \"hi\": \"Nickel Scrap\"}','metals-power-energy-hub-nickel-scrap','images/new/scrap/nickel_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(54,2,'{\"en\": \"CNC Cutting Scrap\", \"hi\": \"CNC Cutting Scrap\"}','metals-power-energy-hub-cnc-cutting-scrap','images/new/scrap/cnc_cutting_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(55,2,'{\"en\": \"Punching Scrap\", \"hi\": \"Punching Scrap\"}','metals-power-energy-hub-punching-scrap','images/new/scrap/punching_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(56,2,'{\"en\": \"Metal Turning (Boring Scrap)\", \"hi\": \"Metal Turning (Boring Scrap)\"}','metals-power-energy-hub-metal-turning-boring-scrap','images/new/scrap/metal_turning_boring.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(57,2,'{\"en\": \"Fabrication Waste\", \"hi\": \"Fabrication Waste\"}','metals-power-energy-hub-fabrication-waste','images/new/scrap/fabrication_waste.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(58,2,'{\"en\": \"Iron Nails\", \"hi\": \"Iron Nails\"}','metals-power-energy-hub-iron-nails','images/new/scrap/iron_nails.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(59,2,'{\"en\": \"Battery\", \"hi\": \"Battery\"}','metals-power-energy-hub-battery','images/new/scrap/battery.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(60,3,'{\"en\": \"Water Bottles\", \"hi\": \"Water Bottles\"}','plastic-scrap-categories-water-bottles','images/new/scrap/water_bottles.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(61,3,'{\"en\": \"Soft Drink Bottles\", \"hi\": \"Soft Drink Bottles\"}','plastic-scrap-categories-soft-drink-bottles','images/new/scrap/soft_drink_bottles.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(62,3,'{\"en\": \"Transparent Oil Bottles\", \"hi\": \"Transparent Oil Bottles\"}','plastic-scrap-categories-transparent-oil-bottles','images/new/scrap/transparent_oil_bottles.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(63,3,'{\"en\": \"Detergent Bottles\", \"hi\": \"Detergent Bottles\"}','plastic-scrap-categories-detergent-bottles','images/new/scrap/detergent_bottles.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(64,3,'{\"en\": \"Chemical Cans\", \"hi\": \"Chemical Cans\"}','plastic-scrap-categories-chemical-cans','images/new/scrap/chemical_cans.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(65,3,'{\"en\": \"Plastic Drums\", \"hi\": \"Plastic Drums\"}','plastic-scrap-categories-plastic-drums','images/new/scrap/plastic_drums.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(66,3,'{\"en\": \"Pipes\", \"hi\": \"Pipes\"}','plastic-scrap-categories-pipes','images/new/scrap/pipes.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(67,3,'{\"en\": \"Wire Insulations\", \"hi\": \"Wire Insulations\"}','plastic-scrap-categories-wire-insulations','images/new/scrap/wire_insulations.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(68,3,'{\"en\": \"Flex Sheets\", \"hi\": \"Flex Sheets\"}','plastic-scrap-categories-flex-sheets','images/new/scrap/flex_sheets.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(69,3,'{\"en\": \"Carry Bags\", \"hi\": \"Carry Bags\"}','plastic-scrap-categories-carry-bags','images/new/scrap/carry_bags.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(70,3,'{\"en\": \"Packaging Films\", \"hi\": \"Packaging Films\"}','plastic-scrap-categories-packaging-films','images/new/scrap/packaging_films.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(71,3,'{\"en\": \"Stretch Wrap\", \"hi\": \"Stretch Wrap\"}','plastic-scrap-categories-stretch-wrap','images/new/scrap/stretch_wrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(72,3,'{\"en\": \"Plastic Crates\", \"hi\": \"Plastic Crates\"}','plastic-scrap-categories-plastic-crates','images/new/scrap/plastic_crates.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(73,3,'{\"en\": \"Plastic Chairs\", \"hi\": \"Plastic Chairs\"}','plastic-scrap-categories-plastic-chairs','images/new/scrap/plastic_chairs.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(74,3,'{\"en\": \"Battery Boxes\", \"hi\": \"Battery Boxes\"}','plastic-scrap-categories-battery-boxes','images/new/scrap/battery_boxes.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(75,3,'{\"en\": \"Thermocol\", \"hi\": \"Thermocol\"}','plastic-scrap-categories-thermocol','images/new/scrap/thermocol.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(76,3,'{\"en\": \"Disposable Cups\", \"hi\": \"Disposable Cups\"}','plastic-scrap-categories-disposable-cups','images/new/scrap/disposable_cups.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(77,3,'{\"en\": \"Foam Packaging\", \"hi\": \"Foam Packaging\"}','plastic-scrap-categories-foam-packaging','images/new/scrap/foam_packaging.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(78,4,'{\"en\": \"Newspaper\", \"hi\": \"Newspaper\"}','paper-plastic-glass-recyclables-newspaper','images/new/scrap/newspaper.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(79,4,'{\"en\": \"Cardboard\", \"hi\": \"Cardboard\"}','paper-plastic-glass-recyclables-cardboard','images/new/scrap/cardboard.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(80,4,'{\"en\": \"Plastic Bottles\", \"hi\": \"Plastic Bottles\"}','paper-plastic-glass-recyclables-plastic-bottles','images/new/scrap/water_bottles.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(81,4,'{\"en\": \"Glass Bottles\", \"hi\": \"Glass Bottles\"}','paper-plastic-glass-recyclables-glass-bottles','images/new/scrap/glass_bottles.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(82,4,'{\"en\": \"White Record Paper\", \"hi\": \"White Record Paper\"}','paper-plastic-glass-recyclables-white-record-paper','images/new/scrap/white_record_paper.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(83,4,'{\"en\": \"Office Paper Scrap\", \"hi\": \"Office Paper Scrap\"}','paper-plastic-glass-recyclables-office-paper-scrap','images/new/scrap/office_paper_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(84,4,'{\"en\": \"Mixed Paper\", \"hi\": \"Mixed Paper\"}','paper-plastic-glass-recyclables-mixed-paper','images/new/scrap/mixed_paper.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(85,4,'{\"en\": \"Books Scrap\", \"hi\": \"Books Scrap\"}','paper-plastic-glass-recyclables-books-scrap','images/new/scrap/books_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(86,4,'{\"en\": \"Notebook Scrap\", \"hi\": \"Notebook Scrap\"}','paper-plastic-glass-recyclables-notebook-scrap','images/new/scrap/notebook_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(87,4,'{\"en\": \"Brown Corrugated Carton Scrap\", \"hi\": \"Brown Corrugated Carton Scrap\"}','paper-plastic-glass-recyclables-brown-corrugated-carton-scrap','images/new/scrap/brown_corrugated_carton.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(88,4,'{\"en\": \"Duplex Board Carton Scrap\", \"hi\": \"Duplex Board Carton Scrap\"}','paper-plastic-glass-recyclables-duplex-board-carton-scrap','images/new/scrap/duplex_board_carton.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(89,4,'{\"en\": \"Corrugated Sheet / Punching Waste\", \"hi\": \"Corrugated Sheet / Punching Waste\"}','paper-plastic-glass-recyclables-corrugated-sheet-punching-waste','images/new/scrap/corrugated_sheet_punching.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(90,5,'{\"en\": \"Wooden Chair\", \"hi\": \"Wooden Chair\"}','old-furniture-wooden-chair','images/new/scrap/wooden_chair.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(91,5,'{\"en\": \"Steel Cupboard\", \"hi\": \"Steel Cupboard\"}','old-furniture-steel-cupboard','images/new/scrap/steel_cupboard.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(92,5,'{\"en\": \"Study Table\", \"hi\": \"Study Table\"}','old-furniture-study-table','images/new/scrap/study_table.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(93,5,'{\"en\": \"Sofa Set\", \"hi\": \"Sofa Set\"}','old-furniture-sofa-set','images/new/scrap/sofa_set.jpg',0,NULL,1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(94,5,'{\"en\": \"Bed\", \"hi\": \"Bed\"}','old-furniture-bed','images/new/scrap/bed.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(95,5,'{\"en\": \"Dressing Table\", \"hi\": \"Dressing Table\"}','old-furniture-dressing-table','images/new/scrap/dressing_table.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(96,5,'{\"en\": \"Dining Table\", \"hi\": \"Dining Table\"}','old-furniture-dining-table','images/new/scrap/dining_table.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(97,5,'{\"en\": \"Work Stations\", \"hi\": \"Work Stations\"}','old-furniture-work-stations','images/new/scrap/work_stations.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(98,5,'{\"en\": \"Reception Table\", \"hi\": \"Reception Table\"}','old-furniture-reception-table','images/new/scrap/reception_table.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(99,5,'{\"en\": \"Boss Chair\", \"hi\": \"Boss Chair\"}','old-furniture-boss-chair','images/new/scrap/boss_chair.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(100,5,'{\"en\": \"Settee Sofa\", \"hi\": \"Settee Sofa\"}','old-furniture-settee-sofa','images/new/scrap/settee_sofa.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(101,6,'{\"en\": \"Lithium-Ion Battery\", \"hi\": \"Lithium-Ion Battery\"}','hazardous-waste-lithium-ion-battery','images/new/scrap/lithium_ion_battery.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(102,6,'{\"en\": \"Inverter Battery\", \"hi\": \"Inverter Battery\"}','hazardous-waste-inverter-battery','images/new/scrap/inverter_battery.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(103,6,'{\"en\": \"Used Oil\", \"hi\": \"Used Oil\"}','hazardous-waste-used-oil','images/new/scrap/used_oil.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(104,6,'{\"en\": \"Lead\", \"hi\": \"Lead\"}','hazardous-waste-lead','images/new/scrap/lead_scrap.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(105,6,'{\"en\": \"CFL Bulb\", \"hi\": \"CFL Bulb\"}','hazardous-waste-cfl-bulb','images/new/scrap/cfl_bulb.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(106,6,'{\"en\": \"Tube Light\", \"hi\": \"Tube Light\"}','hazardous-waste-tube-light','images/new/scrap/tube_light.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(107,6,'{\"en\": \"Bulb\", \"hi\": \"Bulb\"}','hazardous-waste-bulb','images/new/scrap/bulb.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(108,7,'{\"en\": \"Scooty\", \"hi\": \"Scooty\"}','vehicle-machinery-waste-scooty','images/new/scrap/scooty.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(109,7,'{\"en\": \"Bike\", \"hi\": \"Bike\"}','vehicle-machinery-waste-bike','images/new/scrap/bike.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(110,7,'{\"en\": \"Car\", \"hi\": \"Car\"}','vehicle-machinery-waste-car','images/new/scrap/car.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(111,7,'{\"en\": \"Tata Ace\", \"hi\": \"Tata Ace\"}','vehicle-machinery-waste-tata-ace','images/new/scrap/tata_ace.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(112,7,'{\"en\": \"Pick Bolero\", \"hi\": \"Pick Bolero\"}','vehicle-machinery-waste-pick-bolero','images/new/scrap/pick_bolero.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(113,7,'{\"en\": \"Tata 407\", \"hi\": \"Tata 407\"}','vehicle-machinery-waste-tata-407','images/new/scrap/tata_407.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(114,7,'{\"en\": \"Bus\", \"hi\": \"Bus\"}','vehicle-machinery-waste-bus','images/new/scrap/bus.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL),(115,7,'{\"en\": \"Truck\", \"hi\": \"Truck\"}','vehicle-machinery-waste-truck','images/new/scrap/truck.jpg',0,NULL,1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_attributes`
--

DROP TABLE IF EXISTS `category_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_attributes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned NOT NULL,
  `attribute_id` bigint(20) unsigned NOT NULL,
  `is_required` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_attributes_category_id_foreign` (`category_id`),
  KEY `category_attributes_attribute_id_foreign` (`attribute_id`),
  CONSTRAINT `category_attributes_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_attributes_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_attributes`
--

LOCK TABLES `category_attributes` WRITE;
/*!40000 ALTER TABLE `category_attributes` DISABLE KEYS */;
INSERT INTO `category_attributes` VALUES (1,1,4,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(2,1,5,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(3,1,6,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(4,1,7,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(5,2,8,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(6,2,9,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(7,2,10,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(8,2,11,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(9,2,12,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(10,3,13,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(11,3,14,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(12,3,15,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(13,3,16,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(14,3,17,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(15,4,18,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(16,4,19,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(17,4,20,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(18,4,21,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(19,5,22,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(20,5,23,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(21,5,24,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(22,5,25,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(23,5,26,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(24,6,27,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(25,6,28,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(26,6,29,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(27,7,30,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(28,7,31,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(29,7,32,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(30,8,33,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(31,8,34,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(32,8,35,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(33,9,36,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(34,9,37,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(35,9,38,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(36,9,39,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(37,9,40,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(38,10,41,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(39,10,42,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(40,10,43,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(41,10,44,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(42,10,45,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(43,10,46,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(44,10,47,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(45,10,48,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(46,11,49,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(47,11,50,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(48,11,51,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(49,12,52,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(50,12,53,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(51,12,54,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(52,12,55,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(53,12,56,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(54,12,57,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(55,90,58,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(56,90,59,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(57,90,60,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(58,91,61,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(59,91,62,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(60,91,63,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(61,92,64,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(62,92,65,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(63,92,66,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(64,93,67,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(65,93,68,1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(66,93,69,1,'2026-06-23 04:29:58','2026-06-23 04:29:58');
/*!40000 ALTER TABLE `category_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_types`
--

DROP TABLE IF EXISTS `category_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`name`)),
  `slug` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `show_in_corporate_booking` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_types_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_types`
--

LOCK TABLES `category_types` WRITE;
/*!40000 ALTER TABLE `category_types` DISABLE KEYS */;
INSERT INTO `category_types` VALUES (1,'{\"en\": \"E-Waste, Electrical & Digital Devices\", \"hi\": \"E-Waste, Electrical & Digital Devices\"}','e-waste-electrical-digital-devices','images/new/categories/cat_e_waste.jpg',1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(2,'{\"en\": \"Metals, Power & Energy Hub\", \"hi\": \"Metals, Power & Energy Hub\"}','metals-power-energy-hub','images/new/categories/cat_metals.jpg',1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(3,'{\"en\": \"Plastic Scrap Categories\", \"hi\": \"Plastic Scrap Categories\"}','plastic-scrap-categories','images/new/categories/cat_plastic.jpg',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(4,'{\"en\": \"Paper, Plastic & Glass Recyclables\", \"hi\": \"Paper, Plastic & Glass Recyclables\"}','paper-plastic-glass-recyclables','images/new/categories/cat_paper_glass.jpg',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(5,'{\"en\": \"Old Furniture\", \"hi\": \"Old Furniture\"}','old-furniture','images/new/categories/cat_furniture.jpg',1,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(6,'{\"en\": \"Hazardous Waste\", \"hi\": \"Hazardous Waste\"}','hazardous-waste','images/new/categories/cat_hazardous.jpg',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(7,'{\"en\": \"Vehicle & Machinery Waste\", \"hi\": \"Vehicle & Machinery Waste\"}','vehicle-machinery-waste','images/new/categories/cat_vehicles.jpg',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57');
/*!40000 ALTER TABLE `category_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificates` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `certificate_type` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `issue_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `show_on_website` tinyint(1) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `certificates_is_active_sort_order_index` (`is_active`,`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `state_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `default_zone` varchar(255) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cities_state_id_foreign` (`state_id`),
  CONSTRAINT `cities_state_id_foreign` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,1,'Mumbai',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(2,1,'Pune',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(3,1,'Nagpur',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(4,1,'Nashik',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(5,1,'Thane',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(6,2,'New Delhi',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(7,2,'North Delhi',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(8,2,'South Delhi',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(9,2,'East Delhi',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(10,2,'West Delhi',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(11,3,'Bangalore',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(12,3,'Mysore',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(13,3,'Mangalore',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(14,3,'Hubli',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(15,3,'Belgaum',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(16,4,'Chennai',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(17,4,'Coimbatore',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(18,4,'Madurai',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(19,4,'Tiruchirappalli',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(20,4,'Salem',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(21,5,'Ahmedabad',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(22,5,'Surat',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(23,5,'Vadodara',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(24,5,'Rajkot',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(25,5,'Bhavnagar',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(26,6,'Kolkata',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(27,6,'Howrah',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(28,6,'Durgapur',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(29,6,'Asansol',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(30,6,'Siliguri',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(31,7,'Hyderabad',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(32,7,'Warangal',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(33,7,'Nizamabad',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(34,7,'Khammam',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(35,7,'Karimnagar',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(36,8,'Lucknow',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(37,8,'Kanpur',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(38,8,'Ghaziabad',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(39,8,'Agra',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(40,8,'Varanasi',NULL,NULL,1,'2026-06-23 04:29:57','2026-06-23 04:29:57');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `pickup_request_id` bigint(20) unsigned DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'general',
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('pending','resolved') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_messages_user_id_foreign` (`user_id`),
  KEY `contact_messages_pickup_request_id_foreign` (`pickup_request_id`),
  CONSTRAINT `contact_messages_pickup_request_id_foreign` FOREIGN KEY (`pickup_request_id`) REFERENCES `pickup_requests` (`id`) ON DELETE SET NULL,
  CONSTRAINT `contact_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_banners`
--

DROP TABLE IF EXISTS `home_banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `home_banners` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_banners`
--

LOCK TABLES `home_banners` WRITE;
/*!40000 ALTER TABLE `home_banners` DISABLE KEYS */;
/*!40000 ALTER TABLE `home_banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industries`
--

DROP TABLE IF EXISTS `industries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `industries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `long_description` longtext DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `industries_slug_unique` (`slug`),
  KEY `industries_is_active_sort_order_index` (`is_active`,`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industries`
--

LOCK TABLES `industries` WRITE;
/*!40000 ALTER TABLE `industries` DISABLE KEYS */;
INSERT INTO `industries` VALUES (1,'OEM','oem','Original Equipment Manufacturer\'s primary concern is their Dead On Arrival products.','Original Equipment Manufacturers face the constant challenge of managing Dead On Arrival (DOA) products, defective returns and end-of-life inventory. We provide certified solutions tailored to OEM needs.','industries/oem.jpg',1,0,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(2,'E-Commerce Companies','e-commerce-companies','E-commerce companies look for third-party logistics partners to collect returns.','E-commerce companies always look forward to a reliable third-party logistics provider to collect returns, manage damaged goods and dispose of unsellable inventory responsibly.','industries/e-commerce-companies.jpg',1,1,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(3,'Corporates','corporates','All corporate companies have hardware and software requirements from time to time.','All corporate companies have various hardware and software requirements from time to time, generating retired IT assets that require secure, compliant disposition and data destruction.','industries/corporates.jpg',1,2,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(4,'Logistics & Distribution','logistics-distribution','Many products are destroyed or damaged while in transit and need responsible handling.','Many products are destroyed or damaged while in transit. These products need responsible collection and disposal to avoid environmental harm and recover residual value.','industries/logistics-distribution.jpg',1,3,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35');
/*!40000 ALTER TABLE `industries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_logs`
--

DROP TABLE IF EXISTS `inventory_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `warehouse_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `weight` decimal(10,2) NOT NULL DEFAULT 0.00,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `type` enum('in','out','adjustment') NOT NULL,
  `reference_id` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inventory_logs_warehouse_id_foreign` (`warehouse_id`),
  KEY `inventory_logs_category_id_foreign` (`category_id`),
  CONSTRAINT `inventory_logs_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_logs_warehouse_id_foreign` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_logs`
--

LOCK TABLES `inventory_logs` WRITE;
/*!40000 ALTER TABLE `inventory_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_items`
--

DROP TABLE IF EXISTS `media_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_items_is_active_sort_order_index` (`is_active`,`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_items`
--

LOCK TABLES `media_items` WRITE;
/*!40000 ALTER TABLE `media_items` DISABLE KEYS */;
INSERT INTO `media_items` VALUES (1,'Plant Exterior','plant','media/plant-exterior.jpg','Abhyuthanam recycling plant exterior',1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(2,'Plant Floor','plant','media/plant-floor.jpg','Abhyuthanam recycling plant floor',1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(3,'Collection Process','process','media/process-collection.jpg','E-waste collection process',1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(4,'Dismantling Process','process','media/process-dismantling.jpg','E-waste dismantling process',1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(5,'Separation Process','process','media/process-separation.jpg','Material separation process',1,4,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(6,'Shredding Process','process','media/process-shredding.jpg','E-waste shredding process',1,5,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(7,'About Us — Main','about','media/about-main.jpg','Abhyuthanam Recyclers team',1,6,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(8,'About Us — Truck','about','media/about-truck.jpg','Pickup truck',1,7,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(9,'About Us — Worker','about','media/about-worker.jpg','Facility worker',1,8,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(10,'Recycling Highlight 1','recycle','media/recycle-1.jpg','Recycling process highlight',1,9,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(11,'Recycling Highlight 2','recycle','media/recycle-2.jpg','Recycling process highlight',1,10,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(12,'Recycling Highlight 3','recycle','media/recycle-3.jpg','Recycling process highlight',1,11,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(13,'Co-Founder — Amit Kumar Ojha','owner','media/owner-1.jpg','Amit Kumar Ojha, Co-Founder & Managing Director',1,12,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(14,'Co-Founder — Manju Ojha','owner','media/owner-2.jpg','Manju Ojha, Co-Founder & Director',1,13,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(15,'Journey — Company Founded (2023)','journey','media/founded.jpg','Company founded 2023',1,14,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(16,'Journey — Plant Set Up','journey','media/plant.jpg','Plant set up',1,15,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(17,'Journey — Certifications Achieved','journey','media/certifications.jpg','Certifications achieved',1,16,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(18,'Journey — Capacity Scaled','journey','media/capacity.jpg','Capacity scaled to 8,400 MT/year',1,17,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(19,'Journey — Team Expanded','journey','media/team.jpg','Team and services expanded',1,18,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(20,'Journey — Growing Customer Base','journey','media/customers.jpg','Growing customer base',1,19,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35');
/*!40000 ALTER TABLE `media_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_02_08_094020_create_permission_tables',1),(5,'2026_02_08_094022_create_activity_log_table',1),(6,'2026_02_08_094023_add_event_column_to_activity_log_table',1),(7,'2026_02_08_094024_add_batch_uuid_column_to_activity_log_table',1),(8,'2026_02_08_094335_create_ewaste_core_tables',1),(9,'2026_02_08_094335_create_pickup_operations_tables',1),(10,'2026_02_08_094336_create_finance_inventory_tables',1),(11,'2026_02_08_094444_add_fields_to_users_table',1),(12,'2026_02_08_094555_create_personal_access_tokens_table',1),(13,'2026_02_08_114346_add_bank_details_to_users_table',1),(14,'2026_02_13_070454_create_pickup_request_attributes_table',1),(15,'2026_02_13_071506_create_states_table',1),(16,'2026_02_13_071508_create_cities_table',1),(17,'2026_02_13_071510_add_city_id_to_warehouses_table',1),(18,'2026_02_13_071656_add_city_id_to_pickup_requests_table',1),(19,'2026_02_13_071928_create_notifications_table',1),(20,'2026_02_13_071930_add_fcm_token_to_users_table',1),(21,'2026_02_13_072259_create_settlements_table',1),(22,'2026_02_13_072959_add_reschedule_reason_to_pickup_requests_table',1),(23,'2026_02_13_090328_add_type_and_pricing_fields_to_categories_tables',1),(24,'2026_02_13_090945_add_is_required_to_attributes_table',1),(25,'2026_02_13_091427_add_code_to_warehouses_table',1),(26,'2026_02_13_092007_add_capacity_to_warehouses_table',1),(27,'2026_02_13_093126_add_city_id_to_users_table',1),(28,'2026_02_13_100000_add_partner_fields_to_pickup_requests_table',1),(29,'2026_02_13_123000_add_code_to_attributes_table',1),(30,'2026_03_16_064541_create_addresses_table',1),(31,'2026_03_16_064545_create_payment_details_table',1),(32,'2026_03_16_071559_create_category_types_table',1),(33,'2026_03_16_091412_add_image_path_to_category_types_table',1),(34,'2026_03_23_165303_change_category_types_name_to_json',1),(35,'2026_04_09_050925_add_address_id_and_payout_method_to_pickup_requests_table',1),(36,'2026_04_09_051225_create_contact_messages_table',1),(37,'2026_04_09_051225_create_pages_table',1),(38,'2026_04_09_051638_add_is_online_to_users_table',1),(39,'2026_04_09_053359_create_withdrawals_table',1),(40,'2026_04_09_054125_add_review_fields_to_pickup_requests_table',1),(41,'2026_04_09_061011_add_warehouse_id_to_pickup_requests_table',1),(42,'2026_04_10_000000_add_payment_detail_id_to_pickup_requests_table',1),(43,'2026_04_10_174000_add_timestamps_to_assignments_table',1),(44,'2026_04_10_180000_add_donation_fields_to_pickup_requests_table',1),(45,'2026_04_10_181000_add_language_to_users_table',1),(46,'2026_04_10_182000_create_app_settings_table',1),(47,'2026_04_10_183000_add_tracking_fields_to_users_table',1),(48,'2026_04_10_184000_add_service_radius_to_warehouses_table',1),(49,'2026_04_11_002600_create_channel_partners_table',1),(50,'2026_04_11_071721_create_waitlist_table',1),(51,'2026_04_11_071735_add_area_to_warehouses_table',1),(52,'2026_04_11_072951_add_service_types_to_warehouses_table',1),(53,'2026_04_13_043323_add_is_available_to_users_table',1),(54,'2026_04_13_043327_create_pickup_boy_locations_table',1),(55,'2026_04_13_043328_create_pickup_status_logs_table',1),(56,'2026_04_13_214000_add_extra_fields_to_users_table',1),(57,'2026_04_13_214500_add_condition_to_pickup_items_table',1),(58,'2026_04_16_102451_create_pickup_assignment_histories_table',1),(59,'2026_04_16_103722_create_approval_requests_table',1),(60,'2026_04_18_124500_update_pickup_and_assignment_statuses',1),(61,'2026_04_23_181922_add_warehouse_limit_to_channel_partners_table',1),(62,'2026_04_26_072355_update_request_type_enum_in_pickup_requests_table',1),(63,'2026_04_26_072500_update_request_type_enum_in_pickup_requests_table',1),(64,'2026_04_26_074500_add_visibility_to_roles_table',1),(65,'2026_04_30_120000_add_help_support_fields_to_contact_messages_table',1),(66,'2026_04_30_130000_add_referral_code_to_users_table',1),(67,'2026_04_30_130100_create_referral_settings_table',1),(68,'2026_04_30_130200_create_referrals_table',1),(69,'2026_04_30_130300_create_referral_coupons_table',1),(70,'2026_04_30_130400_add_coupon_fields_to_pickup_requests_table',1),(71,'2026_05_01_100000_add_default_zone_to_cities_table',1),(72,'2026_05_01_100100_create_pickup_boy_warehouse_table',1),(73,'2026_05_01_100200_create_pickup_price_logs_table',1),(74,'2026_05_01_100300_extend_assignments_table',1),(75,'2026_05_01_100400_add_price_lock_to_pickup_requests_table',1),(76,'2026_05_01_100500_add_extras_to_pickup_items_table',1),(77,'2026_05_05_210000_add_option_rule_unique_index_to_pricing_rules',1),(78,'2026_05_06_101500_add_adjustment_fields_to_pricing_rules',1),(79,'2026_05_08_180000_add_requires_details_to_categories_table',1),(80,'2026_05_09_081659_add_driver_fields_to_users_table',1),(81,'2026_05_09_190000_create_channel_partner_customers_table',1),(82,'2026_05_12_120000_add_location_to_pickup_images_table',1),(83,'2026_05_23_140000_add_service_capabilities_to_warehouses_table',1),(84,'2026_05_24_090000_add_show_in_corporate_booking_to_category_types_table',1),(85,'2026_05_26_120000_add_sort_order_to_categories_table',1),(86,'2026_06_04_000001_add_service_pincodes_to_warehouses_table',1),(87,'2026_06_06_000000_add_pincode_to_users_table',1),(88,'2026_06_06_203500_create_pricing_variant_rules_table',1),(89,'2026_06_07_000000_add_employee_id_to_users_table',1),(90,'2026_06_07_000000_refactor_request_lifecycle',1),(91,'2026_06_09_113137_add_deleted_at_to_users_table',1),(92,'2026_06_09_214758_add_customer_email_to_pickup_requests_table',1),(93,'2026_06_09_215200_add_meeting_type_to_pickup_requests_table',1),(94,'2026_06_11_120000_add_payment_receipt_image_to_pickup_requests_table',1),(95,'2026_06_11_130000_add_pincode_to_waitlist_table',1),(96,'2026_06_13_120000_create_home_banners_table',1),(97,'2026_06_16_094500_add_carbon_per_unit_to_pricing_rules',1),(106,'2026_06_26_120000_create_scrap_categories_table',2),(107,'2026_06_26_120001_create_scrap_items_table',2),(108,'2026_06_26_120002_create_services_table',2),(109,'2026_06_26_120003_create_industries_table',2),(110,'2026_06_26_120004_create_testimonials_table',2),(111,'2026_06_26_120005_create_certificates_table',2),(112,'2026_06_26_120006_create_media_items_table',2),(113,'2026_06_26_120007_create_page_sections_table',2),(114,'2026_06_26_180000_remove_pickup_boy_channel_partner_referral_corporate_modules',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` bigint(20) unsigned NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_sections`
--

DROP TABLE IF EXISTS `page_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_sections` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `page_key` varchar(255) NOT NULL,
  `section_key` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `json_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json_data`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `page_sections_page_key_section_key_unique` (`page_key`,`section_key`),
  KEY `page_sections_page_key_is_active_sort_order_index` (`page_key`,`is_active`,`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_sections`
--

LOCK TABLES `page_sections` WRITE;
/*!40000 ALTER TABLE `page_sections` DISABLE KEYS */;
INSERT INTO `page_sections` VALUES (1,'home','hero','ABHYUTHANAM RECYCLER','Certified e-waste and scrap recycling for businesses and households.','Abhyuthanam Recyclers is a certified e-waste and scrap recycling company helping businesses and households dispose responsibly through secure, transparent and sustainable processes.','page-sections/home-hero.jpg',NULL,1,0,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(2,'about','hero','About Abhyuthanam Recyclers','Founded 2023 · UPSIDA Plastic City, Dibiyapur, Uttar Pradesh','Abhyuthanam Recyclers was started in 2023 with one simple idea — make it easy and safe for Indian businesses and homes to get rid of old electronics the right way.','page-sections/about-hero.jpg',NULL,1,1,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(3,'contact','info','Get in Touch',NULL,NULL,NULL,'{\"emails\":[\"sales@abhyuthanamind.com\",\"info@abhyuthanamind.com\"],\"phones\":[\"+91 77385 74635\",\"1800 203 0267\",\"011-4476-1731\"],\"plant_address\":\"E-15, UPSIDA Plastic City, Dibiyapur, Uttar Pradesh - 206244\",\"corporate_address\":\"E-44\\/3, 1st Floor, Industrial Area, Phase-II, Okhla, New Delhi - 110020\",\"hours\":\"Mon \\u2013 Sat: 9:00 AM \\u2013 6:00 PM\"}',1,2,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(4,'footer','contact',NULL,NULL,NULL,NULL,'{\"email\":\"info@abhyuthanamind.com\",\"phones\":[\"+91 77385 74635\",\"1800 2030 267\"],\"address\":\"E-15, UPSIDA Plastic City, Dibiyapur, UP, PIN- 206244\"}',1,3,'2026-06-26 06:49:35','2026-06-26 06:49:35');
/*!40000 ALTER TABLE `page_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,'privacy-policy','Privacy Policy','<h2>Privacy Policy</h2>\n<p>Last updated: April 26, 2026</p>\n<p>Welcome to Scrapify. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and protect your information when you use the Scrapify mobile app, website, and related services.</p>\n\n<h3>1. Who We Are</h3>\n<p>Scrapify (“we”, “our”, “us”) is the data controller for your personal data.</p>\n<p>If you have any questions about this policy, contact:<br>\nEmail: <a href=\"mailto:privacy@scrapi5.com\">privacy@scrapi5.com</a></p>\n\n<h3>2. Data We Collect</h3>\n<p>We may collect and process the following categories of data:</p>\n<ul>\n    <li><strong>Identity Data:</strong> name, username, profile details.</li>\n    <li><strong>Contact Data:</strong> phone number, email address, pickup address, billing details.</li>\n    <li><strong>Location Data:</strong> approximate or precise location (if enabled) to check service availability and schedule pickups.</li>\n    <li><strong>Pickup/Order Data:</strong> request details, pickup history, booking status, uploaded images, notes, and preferences.</li>\n    <li><strong>Device and Technical Data:</strong> IP address, device type, OS version, app version, crash logs, diagnostics.</li>\n    <li><strong>Communication Data:</strong> support messages, feedback, and responses.</li>\n</ul>\n\n<h3>3. Permissions We Use</h3>\n<p>Depending on your device and app flow, Scrapify may request:</p>\n<ul>\n    <li><strong>Camera Permission (android.permission.CAMERA):</strong> to capture photos for scrap/donation/corporate pickup requests and verification flows.</li>\n    <li><strong>Photos/Storage Permission:</strong> to upload existing images from your gallery.</li>\n    <li><strong>Location Permission:</strong> to detect serviceable area, improve address selection, and support pickup scheduling.</li>\n    <li><strong>Notification Permission:</strong> to send booking and status updates.</li>\n</ul>\n<p>You can revoke permissions anytime from device settings, but some features may stop working properly.</p>\n\n<h3>4. How We Collect Data</h3>\n<p>We collect data through:</p>\n<ul>\n    <li><strong>Direct interactions:</strong> when you register, create pickup requests, upload photos, or contact support.</li>\n    <li><strong>Automated collection:</strong> app analytics, diagnostics, and technical logs generated while using the app.</li>\n    <li><strong>Service interactions:</strong> booking updates, order status changes, and account actions.</li>\n</ul>\n\n<h3>5. How We Use Your Data</h3>\n<p>We use your data to:</p>\n<ul>\n    <li>Create and manage your account.</li>\n    <li>Process scrap/donation/corporate pickup requests.</li>\n    <li>Verify request details and support operations.</li>\n    <li>Show pickup history and live status updates.</li>\n    <li>Improve app performance, reliability, and security.</li>\n    <li>Send transactional notifications (OTP, booking updates, reminders).</li>\n    <li>Comply with legal and regulatory requirements.</li>\n</ul>\n<p>We process personal data only when there is a valid legal basis, including contract performance, legal obligations, legitimate interests, or consent (where required).</p>\n\n<h3>6. Data Sharing</h3>\n<p>We may share limited data with:</p>\n<ul>\n    <li><strong>Operational partners:</strong> (pickup teams, warehouse/network partners) only as needed to fulfill your request.</li>\n    <li><strong>Technology providers:</strong> (hosting, analytics, notifications, support tools).</li>\n    <li><strong>Legal/regulatory authorities:</strong> when required by law.</li>\n</ul>\n<p>We do not sell your personal data.</p>\n\n<h3>7. Data Retention</h3>\n<p>We retain personal data only as long as necessary for service delivery, legal compliance, fraud prevention, dispute handling, and record-keeping. Retention duration depends on data type and legal obligations.</p>\n\n<h3>8. Data Security</h3>\n<p>We use reasonable technical and organizational safeguards to protect your information from unauthorized access, misuse, alteration, and loss. However, no system is 100% secure.</p>\n\n<h3>9. Your Rights</h3>\n<p>Subject to applicable law, you may have rights to:</p>\n<ul>\n    <li>Access your personal data</li>\n    <li>Correct inaccurate data</li>\n    <li>Request deletion of data</li>\n    <li>Restrict or object to certain processing</li>\n    <li>Withdraw consent (where applicable)</li>\n</ul>\n<p>To exercise rights, contact: <a href=\"mailto:privacy@scrapi5.com\">privacy@scrapi5.com</a></p>\n\n<h3>10. Children’s Privacy</h3>\n<p>Scrapify is not intended for children under 18. We do not knowingly collect personal data from children.</p>\n\n<h3>11. International Data Transfers</h3>\n<p>If data is processed outside your region, we take reasonable steps to ensure appropriate safeguards are in place.</p>\n\n<h3>12. Changes to This Policy</h3>\n<p>We may update this Privacy Policy from time to time. Updated versions will be posted with a revised “Last updated” date.</p>\n\n<h3>13. Contact Us</h3>\n<p>For privacy questions, requests, or complaints:<br>\nEmail: <a href=\"mailto:privacy@scrapi5.com\">privacy@scrapi5.com</a><br>\nLandline: +91 11 3574 8627<br>\nMobile: +91 98702 91813<br>\nAddress: E-44/3 Okhla Industrial Area Phase - 2, New Delhi - 110020</p>',1,'2026-06-23 04:30:00','2026-06-23 04:30:00');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_details`
--

DROP TABLE IF EXISTS `payment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `type` varchar(255) NOT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(255) DEFAULT NULL,
  `account_holder_name` varchar(255) DEFAULT NULL,
  `upi_id` varchar(255) DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_details_user_id_foreign` (`user_id`),
  CONSTRAINT `payment_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_details`
--

LOCK TABLES `payment_details` WRITE;
/*!40000 ALTER TABLE `payment_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `pickup_request_id` bigint(20) unsigned DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `status` enum('pending','processing','completed','failed','approved') NOT NULL DEFAULT 'pending',
  `type` enum('bank_transfer','upi','cash','wallet') NOT NULL DEFAULT 'cash',
  `proof_image_path` varchar(255) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_user_id_foreign` (`user_id`),
  KEY `payments_pickup_request_id_foreign` (`pickup_request_id`),
  CONSTRAINT `payments_pickup_request_id_foreign` FOREIGN KEY (`pickup_request_id`) REFERENCES `pickup_requests` (`id`) ON DELETE SET NULL,
  CONSTRAINT `payments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'view_users','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(2,'create_users','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(3,'edit_users','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(4,'delete_users','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(5,'view_roles','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(6,'create_roles','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(7,'edit_roles','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(8,'delete_roles','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(9,'view_categories','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(10,'create_categories','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(11,'edit_categories','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(12,'delete_categories','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(13,'view_pickups','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(14,'create_pickups','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(15,'edit_pickups','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(16,'cancel_pickups','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(17,'assign_pickups','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(18,'verify_kyc','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(19,'approve_payments','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(20,'view_warehouse','web','2026-06-23 04:29:57','2026-06-23 04:29:57'),(21,'update_inventory','web','2026-06-23 04:29:57','2026-06-23 04:29:57');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup_images`
--

DROP TABLE IF EXISTS `pickup_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pickup_request_id` bigint(20) unsigned NOT NULL,
  `pickup_item_id` bigint(20) unsigned DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'item',
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pickup_images_pickup_request_id_foreign` (`pickup_request_id`),
  KEY `pickup_images_pickup_item_id_foreign` (`pickup_item_id`),
  CONSTRAINT `pickup_images_pickup_item_id_foreign` FOREIGN KEY (`pickup_item_id`) REFERENCES `pickup_items` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_images_pickup_request_id_foreign` FOREIGN KEY (`pickup_request_id`) REFERENCES `pickup_requests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_images`
--

LOCK TABLES `pickup_images` WRITE;
/*!40000 ALTER TABLE `pickup_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `pickup_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup_items`
--

DROP TABLE IF EXISTS `pickup_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pickup_request_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `weight` decimal(8,2) DEFAULT NULL,
  `condition` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price_per_unit` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pickup_items_pickup_request_id_foreign` (`pickup_request_id`),
  KEY `pickup_items_category_id_foreign` (`category_id`),
  CONSTRAINT `pickup_items_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pickup_items_pickup_request_id_foreign` FOREIGN KEY (`pickup_request_id`) REFERENCES `pickup_requests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_items`
--

LOCK TABLES `pickup_items` WRITE;
/*!40000 ALTER TABLE `pickup_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `pickup_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup_price_logs`
--

DROP TABLE IF EXISTS `pickup_price_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup_price_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pickup_request_id` bigint(20) unsigned NOT NULL,
  `old_amount` decimal(12,2) DEFAULT NULL,
  `new_amount` decimal(12,2) NOT NULL,
  `modified_by` bigint(20) unsigned DEFAULT NULL,
  `modified_by_type` varchar(255) DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pickup_price_logs_modified_by_foreign` (`modified_by`),
  KEY `pickup_price_logs_pickup_request_id_index` (`pickup_request_id`),
  CONSTRAINT `pickup_price_logs_modified_by_foreign` FOREIGN KEY (`modified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_price_logs_pickup_request_id_foreign` FOREIGN KEY (`pickup_request_id`) REFERENCES `pickup_requests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_price_logs`
--

LOCK TABLES `pickup_price_logs` WRITE;
/*!40000 ALTER TABLE `pickup_price_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `pickup_price_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup_request_attributes`
--

DROP TABLE IF EXISTS `pickup_request_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup_request_attributes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pickup_request_id` bigint(20) unsigned NOT NULL,
  `attribute_id` bigint(20) unsigned NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`value`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pickup_request_attributes_pickup_request_id_foreign` (`pickup_request_id`),
  KEY `pickup_request_attributes_attribute_id_foreign` (`attribute_id`),
  CONSTRAINT `pickup_request_attributes_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pickup_request_attributes_pickup_request_id_foreign` FOREIGN KEY (`pickup_request_id`) REFERENCES `pickup_requests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_request_attributes`
--

LOCK TABLES `pickup_request_attributes` WRITE;
/*!40000 ALTER TABLE `pickup_request_attributes` DISABLE KEYS */;
/*!40000 ALTER TABLE `pickup_request_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup_requests`
--

DROP TABLE IF EXISTS `pickup_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup_requests` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `request_type` enum('scrap','donation','corporate') DEFAULT 'scrap',
  `donation_category` varchar(255) DEFAULT NULL,
  `pickup_code` varchar(255) DEFAULT NULL,
  `customer_id` bigint(20) unsigned NOT NULL,
  `address_id` bigint(20) unsigned DEFAULT NULL,
  `payment_detail_id` bigint(20) unsigned DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `meeting_type` varchar(255) DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `city_id` bigint(20) unsigned DEFAULT NULL,
  `warehouse_id` bigint(20) unsigned DEFAULT NULL,
  `warehouse_assigned_at` timestamp NULL DEFAULT NULL,
  `pickup_started_at` timestamp NULL DEFAULT NULL,
  `pickup_completed_at` timestamp NULL DEFAULT NULL,
  `warehouse_received_at` timestamp NULL DEFAULT NULL,
  `address` text NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `scheduled_at` datetime NOT NULL,
  `payout_method` varchar(255) DEFAULT NULL,
  `reschedule_reason` text DEFAULT NULL,
  `status` enum('pending','created','assigned','accepted','on_the_way','arrived','reached_location','verifying','pickup_started','picked_up','pickup_completed','completed','delivered_to_warehouse','cancelled','rescheduled','reschedule_requested') DEFAULT 'pending',
  `status_new` varchar(255) NOT NULL DEFAULT 'pending_warehouse',
  `estimated_amount` decimal(10,2) DEFAULT NULL,
  `coupon_code` varchar(12) DEFAULT NULL,
  `coupon_discount_value` decimal(10,2) DEFAULT NULL,
  `final_amount` decimal(10,2) DEFAULT NULL,
  `price_locked_at` timestamp NULL DEFAULT NULL,
  `final_amount_modified_by` bigint(20) unsigned DEFAULT NULL,
  `cancellation_reason` text DEFAULT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `rating` tinyint(3) unsigned DEFAULT NULL,
  `review` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `warehouse_received_by` bigint(20) unsigned DEFAULT NULL,
  `payment_pending_at` timestamp NULL DEFAULT NULL,
  `payment_completed_at` timestamp NULL DEFAULT NULL,
  `completed_at` timestamp NULL DEFAULT NULL,
  `payment_status` enum('pending','processing','completed','failed') DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_reference` varchar(255) DEFAULT NULL,
  `payment_receipt_image` varchar(255) DEFAULT NULL,
  `receiver_name` varchar(255) DEFAULT NULL,
  `assigned_by` bigint(20) unsigned DEFAULT NULL,
  `next_allowed_actions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`next_allowed_actions`)),
  PRIMARY KEY (`id`),
  UNIQUE KEY `pickup_requests_pickup_code_unique` (`pickup_code`),
  UNIQUE KEY `pickup_requests_payment_reference_unique` (`payment_reference`),
  KEY `pickup_requests_customer_id_foreign` (`customer_id`),
  KEY `pickup_requests_city_id_foreign` (`city_id`),
  KEY `pickup_requests_created_by_foreign` (`created_by`),
  KEY `pickup_requests_address_id_foreign` (`address_id`),
  KEY `pickup_requests_warehouse_id_foreign` (`warehouse_id`),
  KEY `pickup_requests_payment_detail_id_foreign` (`payment_detail_id`),
  KEY `pickup_requests_final_amount_modified_by_foreign` (`final_amount_modified_by`),
  KEY `pickup_requests_warehouse_received_by_foreign` (`warehouse_received_by`),
  KEY `pickup_requests_assigned_by_foreign` (`assigned_by`),
  CONSTRAINT `pickup_requests_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_requests_assigned_by_foreign` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_requests_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_requests_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_requests_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pickup_requests_final_amount_modified_by_foreign` FOREIGN KEY (`final_amount_modified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_requests_payment_detail_id_foreign` FOREIGN KEY (`payment_detail_id`) REFERENCES `payment_details` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_requests_warehouse_id_foreign` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_requests_warehouse_received_by_foreign` FOREIGN KEY (`warehouse_received_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_requests`
--

LOCK TABLES `pickup_requests` WRITE;
/*!40000 ALTER TABLE `pickup_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `pickup_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup_status_logs`
--

DROP TABLE IF EXISTS `pickup_status_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pickup_status_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pickup_request_id` bigint(20) unsigned NOT NULL,
  `status` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pickup_status_logs_pickup_request_id_foreign` (`pickup_request_id`),
  KEY `pickup_status_logs_created_by_foreign` (`created_by`),
  CONSTRAINT `pickup_status_logs_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pickup_status_logs_pickup_request_id_foreign` FOREIGN KEY (`pickup_request_id`) REFERENCES `pickup_requests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_status_logs`
--

LOCK TABLES `pickup_status_logs` WRITE;
/*!40000 ALTER TABLE `pickup_status_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `pickup_status_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricing_rules`
--

DROP TABLE IF EXISTS `pricing_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pricing_rules` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned NOT NULL,
  `pricing_type` enum('per_kg','per_piece','per_capacity') NOT NULL DEFAULT 'per_piece',
  `attribute_option_id` bigint(20) unsigned DEFAULT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `carbon_per_unit` decimal(10,3) DEFAULT NULL COMMENT 'Estimated CO2 saved in kg for one pricing unit',
  `adjustment_type` enum('fixed','percentage') NOT NULL DEFAULT 'fixed',
  `adjustment_value` decimal(10,2) DEFAULT NULL COMMENT 'For percentage type store +/- percent, for fixed store absolute delta',
  `min_quantity` int(11) NOT NULL DEFAULT 1,
  `currency` varchar(255) NOT NULL DEFAULT 'INR',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pricing_rules_category_option_unique` (`category_id`,`attribute_option_id`),
  KEY `pricing_rules_attribute_option_id_foreign` (`attribute_option_id`),
  KEY `pricing_rules_category_option_idx` (`category_id`,`attribute_option_id`),
  CONSTRAINT `pricing_rules_attribute_option_id_foreign` FOREIGN KEY (`attribute_option_id`) REFERENCES `attribute_options` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pricing_rules_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=379 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricing_rules`
--

LOCK TABLES `pricing_rules` WRITE;
/*!40000 ALTER TABLE `pricing_rules` DISABLE KEYS */;
INSERT INTO `pricing_rules` VALUES (1,1,'per_piece',NULL,3050.00,85.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(2,2,'per_piece',NULL,850.00,32.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(3,3,'per_piece',NULL,200.00,18.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(4,4,'per_piece',NULL,300.00,14.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(5,5,'per_piece',NULL,900.00,55.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(6,6,'per_piece',NULL,130.00,7.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(7,7,'per_piece',NULL,200.00,12.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(8,8,'per_piece',NULL,150.00,9.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(9,9,'per_piece',NULL,150.00,12.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(10,10,'per_piece',NULL,700.00,28.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(11,11,'per_kg',NULL,40.00,6.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(12,12,'per_piece',NULL,450.00,20.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(13,13,'per_piece',NULL,800.00,26.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(14,14,'per_piece',NULL,200.00,16.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(15,15,'per_piece',NULL,100.00,9.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(16,16,'per_piece',NULL,100.00,10.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(17,17,'per_piece',NULL,5.00,0.300,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(18,18,'per_piece',NULL,18.00,0.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(19,19,'per_piece',NULL,150.00,6.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(20,20,'per_piece',NULL,120.00,4.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(21,21,'per_piece',NULL,1800.00,45.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(22,22,'per_piece',NULL,80.00,1.500,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(23,23,'per_piece',NULL,200.00,10.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(24,24,'per_piece',NULL,100.00,8.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(25,25,'per_piece',NULL,150.00,10.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(26,26,'per_piece',NULL,5.00,0.500,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(27,27,'per_piece',NULL,15.00,0.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(28,28,'per_piece',NULL,3.00,0.300,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(29,29,'per_piece',NULL,10.00,2.500,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(30,30,'per_piece',NULL,3.00,0.400,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(31,31,'per_piece',NULL,10.00,1.100,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(32,32,'per_piece',NULL,60.00,8.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(33,33,'per_piece',NULL,200.00,18.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(34,34,'per_piece',NULL,100.00,7.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(35,35,'per_piece',NULL,1500.00,35.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(36,36,'per_piece',NULL,300.00,14.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(37,37,'per_piece',NULL,150.00,11.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(38,38,'per_piece',NULL,150.00,6.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(39,39,'per_piece',NULL,150.00,5.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(40,40,'per_piece',NULL,200.00,10.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(41,41,'per_kg',NULL,25.00,1.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(42,42,'per_kg',NULL,25.00,1.700,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(43,43,'per_kg',NULL,27.00,1.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(44,44,'per_kg',NULL,27.00,1.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(45,45,'per_kg',NULL,45.00,2.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(46,46,'per_kg',NULL,27.00,1.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(47,47,'per_kg',NULL,350.00,3.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(48,48,'per_kg',NULL,600.00,4.200,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(49,49,'per_kg',NULL,280.00,2.100,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(50,50,'per_kg',NULL,240.00,1.700,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(51,51,'per_kg',NULL,80.00,1.300,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(52,52,'per_kg',NULL,40.00,1.100,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(53,53,'per_kg',NULL,120.00,3.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(54,54,'per_kg',NULL,27.00,1.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(55,55,'per_kg',NULL,27.00,1.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(56,56,'per_kg',NULL,27.00,1.600,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(57,57,'per_kg',NULL,27.00,1.700,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(58,58,'per_kg',NULL,27.00,1.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(59,59,'per_kg',NULL,80.00,2.500,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(60,60,'per_kg',NULL,10.00,1.600,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(61,61,'per_kg',NULL,10.00,1.600,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(62,62,'per_kg',NULL,12.00,1.700,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(63,63,'per_kg',NULL,15.00,1.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(64,64,'per_kg',NULL,15.00,1.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(65,65,'per_kg',NULL,17.00,2.200,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(66,66,'per_kg',NULL,12.00,1.800,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(67,67,'per_kg',NULL,11.00,1.300,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(68,68,'per_kg',NULL,10.00,1.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(69,69,'per_kg',NULL,9.00,0.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(70,70,'per_kg',NULL,9.00,0.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(71,71,'per_kg',NULL,10.00,1.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(72,72,'per_kg',NULL,18.00,2.100,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(73,73,'per_kg',NULL,16.00,2.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(74,74,'per_kg',NULL,17.00,2.100,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(75,75,'per_kg',NULL,8.00,0.600,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(76,76,'per_kg',NULL,8.00,0.700,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(77,77,'per_kg',NULL,8.00,0.700,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(78,78,'per_kg',NULL,12.00,1.300,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(79,79,'per_kg',NULL,12.00,0.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(80,80,'per_kg',NULL,14.00,1.600,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(81,81,'per_kg',NULL,6.00,0.700,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(82,82,'per_kg',NULL,14.00,1.400,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(83,83,'per_kg',NULL,14.00,1.400,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(84,84,'per_kg',NULL,10.00,1.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(85,85,'per_kg',NULL,13.00,1.200,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(86,86,'per_kg',NULL,11.00,1.100,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(87,87,'per_kg',NULL,10.00,0.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(88,88,'per_kg',NULL,11.00,1.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(89,89,'per_kg',NULL,10.00,0.900,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(90,90,'per_piece',NULL,150.00,18.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(91,91,'per_piece',NULL,500.00,42.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(92,92,'per_piece',NULL,150.00,20.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(93,93,'per_piece',NULL,300.00,28.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(94,94,'per_piece',NULL,1600.00,55.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(95,95,'per_piece',NULL,600.00,24.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(96,96,'per_piece',NULL,750.00,38.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(97,97,'per_piece',NULL,900.00,44.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(98,98,'per_piece',NULL,1500.00,60.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(99,99,'per_piece',NULL,900.00,26.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(100,100,'per_piece',NULL,900.00,32.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(101,101,'per_kg',NULL,120.00,7.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(102,102,'per_kg',NULL,65.00,3.500,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(103,103,'per_kg',NULL,20.00,0.700,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(104,104,'per_kg',NULL,105.00,1.400,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(105,105,'per_piece',NULL,1.00,0.100,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(106,106,'per_piece',NULL,2.00,0.200,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(107,107,'per_piece',NULL,1.00,0.100,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(108,108,'per_piece',NULL,3800.00,210.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(109,109,'per_piece',NULL,5500.00,320.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(110,110,'per_piece',NULL,28000.00,1800.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(111,111,'per_piece',NULL,28000.00,2200.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(112,112,'per_piece',NULL,32000.00,2500.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(113,113,'per_piece',NULL,50000.00,4200.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(114,114,'per_piece',NULL,80000.00,9000.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(115,115,'per_piece',NULL,110000.00,12000.000,'fixed',NULL,1,'INR',1,'2026-06-23 04:29:57','2026-06-23 04:29:58'),(116,1,'per_piece',11,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(117,1,'per_piece',12,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(118,1,'per_piece',13,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(119,1,'per_piece',14,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(120,1,'per_piece',15,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(121,1,'per_piece',16,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(122,1,'per_piece',17,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(123,1,'per_piece',18,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(124,1,'per_piece',19,0.00,NULL,'percentage',45.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(125,1,'per_piece',20,0.00,NULL,'percentage',90.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(126,1,'per_piece',21,0.00,NULL,'percentage',135.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(127,1,'per_piece',22,0.00,NULL,'percentage',200.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(128,1,'per_piece',23,0.00,NULL,'percentage',300.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(129,1,'per_piece',24,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(130,1,'per_piece',25,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(131,1,'per_piece',26,0.00,NULL,'percentage',-3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(132,1,'per_piece',27,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(133,1,'per_piece',28,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(134,1,'per_piece',29,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(135,2,'per_piece',30,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(136,2,'per_piece',31,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(137,2,'per_piece',32,0.00,NULL,'percentage',8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(138,2,'per_piece',33,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(139,2,'per_piece',34,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(140,2,'per_piece',35,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(141,2,'per_piece',36,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(142,2,'per_piece',37,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(143,2,'per_piece',38,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(144,2,'per_piece',39,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(145,2,'per_piece',40,0.00,NULL,'percentage',30.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(146,2,'per_piece',41,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(147,2,'per_piece',42,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(148,2,'per_piece',43,0.00,NULL,'percentage',7.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(149,2,'per_piece',44,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(150,2,'per_piece',45,0.00,NULL,'percentage',-5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(151,2,'per_piece',46,0.00,NULL,'percentage',10.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(152,2,'per_piece',47,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(153,2,'per_piece',48,0.00,NULL,'percentage',-3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(154,3,'per_piece',49,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(155,3,'per_piece',50,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(156,3,'per_piece',51,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(157,3,'per_piece',52,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(158,3,'per_piece',53,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(159,3,'per_piece',54,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(160,3,'per_piece',55,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(161,3,'per_piece',56,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(162,3,'per_piece',57,0.00,NULL,'percentage',10.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(163,3,'per_piece',58,0.00,NULL,'percentage',25.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(164,3,'per_piece',59,0.00,NULL,'percentage',50.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(165,3,'per_piece',60,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(166,3,'per_piece',61,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(167,3,'per_piece',62,0.00,NULL,'percentage',-6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(168,3,'per_piece',63,0.00,NULL,'percentage',-6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(169,3,'per_piece',64,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(170,3,'per_piece',65,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(171,3,'per_piece',66,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(172,3,'per_piece',67,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(173,3,'per_piece',68,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(174,3,'per_piece',69,0.00,NULL,'percentage',-3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(175,4,'per_piece',70,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(176,4,'per_piece',71,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(177,4,'per_piece',72,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(178,4,'per_piece',73,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(179,4,'per_piece',74,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(180,4,'per_piece',75,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(181,4,'per_piece',76,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(182,4,'per_piece',77,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(183,4,'per_piece',78,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(184,4,'per_piece',79,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(185,4,'per_piece',80,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(186,4,'per_piece',81,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(187,4,'per_piece',82,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(188,4,'per_piece',83,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(189,4,'per_piece',84,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(190,5,'per_piece',85,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(191,5,'per_piece',86,0.00,NULL,'percentage',6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(192,5,'per_piece',87,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(193,5,'per_piece',88,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(194,5,'per_piece',89,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(195,5,'per_piece',90,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(196,5,'per_piece',91,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(197,5,'per_piece',92,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(198,5,'per_piece',93,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(199,5,'per_piece',94,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(200,5,'per_piece',95,0.00,NULL,'percentage',6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(201,5,'per_piece',96,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(202,5,'per_piece',97,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(203,5,'per_piece',98,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(204,5,'per_piece',99,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(205,5,'per_piece',100,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(206,5,'per_piece',101,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(207,5,'per_piece',102,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(208,5,'per_piece',103,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(209,5,'per_piece',104,0.00,NULL,'percentage',-3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(210,6,'per_piece',105,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(211,6,'per_piece',106,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(212,6,'per_piece',107,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(213,6,'per_piece',108,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(214,6,'per_piece',109,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(215,6,'per_piece',110,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(216,6,'per_piece',111,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(217,6,'per_piece',112,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(218,6,'per_piece',113,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(219,6,'per_piece',114,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(220,6,'per_piece',115,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(221,6,'per_piece',116,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(222,7,'per_piece',117,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(223,7,'per_piece',118,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(224,7,'per_piece',119,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(225,7,'per_piece',120,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(226,7,'per_piece',121,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(227,7,'per_piece',122,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(228,7,'per_piece',123,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(229,7,'per_piece',124,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(230,7,'per_piece',125,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(231,7,'per_piece',126,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(232,7,'per_piece',127,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(233,7,'per_piece',128,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(234,8,'per_piece',129,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(235,8,'per_piece',130,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(236,8,'per_piece',131,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(237,8,'per_piece',132,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(238,8,'per_piece',133,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(239,8,'per_piece',134,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(240,8,'per_piece',135,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(241,8,'per_piece',136,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(242,8,'per_piece',137,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(243,8,'per_piece',138,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(244,8,'per_piece',139,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(245,8,'per_piece',140,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(246,9,'per_piece',141,0.00,NULL,'percentage',8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(247,9,'per_piece',142,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(248,9,'per_piece',143,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(249,9,'per_piece',144,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(250,9,'per_piece',145,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(251,9,'per_piece',146,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(252,9,'per_piece',147,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(253,9,'per_piece',148,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(254,9,'per_piece',149,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(255,9,'per_piece',150,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(256,9,'per_piece',151,0.00,NULL,'percentage',-3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(257,9,'per_piece',152,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(258,9,'per_piece',153,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(259,9,'per_piece',154,0.00,NULL,'percentage',7.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(260,9,'per_piece',155,0.00,NULL,'percentage',6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(261,9,'per_piece',156,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(262,9,'per_piece',157,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(263,9,'per_piece',158,0.00,NULL,'percentage',-6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(264,9,'per_piece',159,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(265,9,'per_piece',160,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(266,9,'per_piece',161,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(267,9,'per_piece',162,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(268,9,'per_piece',163,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(269,9,'per_piece',164,0.00,NULL,'percentage',-10.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(270,10,'per_piece',165,0.00,NULL,'percentage',12.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(271,10,'per_piece',166,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(272,10,'per_piece',167,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(273,10,'per_piece',168,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(274,10,'per_piece',169,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(275,10,'per_piece',170,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(276,10,'per_piece',171,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(277,10,'per_piece',172,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(278,10,'per_piece',173,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(279,10,'per_piece',174,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(280,10,'per_piece',175,0.00,NULL,'percentage',8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(281,10,'per_piece',176,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(282,10,'per_piece',177,0.00,NULL,'percentage',-12.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(283,10,'per_piece',178,0.00,NULL,'percentage',-5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(284,10,'per_piece',179,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(285,10,'per_piece',180,0.00,NULL,'percentage',8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(286,10,'per_piece',181,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(287,10,'per_piece',182,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(288,10,'per_piece',183,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(289,10,'per_piece',184,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(290,10,'per_piece',185,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(291,10,'per_piece',186,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(292,10,'per_piece',187,0.00,NULL,'percentage',-5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(293,10,'per_piece',188,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(294,10,'per_piece',189,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(295,10,'per_piece',190,0.00,NULL,'percentage',9.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(296,10,'per_piece',191,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(297,10,'per_piece',192,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(298,10,'per_piece',193,0.00,NULL,'percentage',6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(299,10,'per_piece',194,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(300,10,'per_piece',195,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(301,10,'per_piece',196,0.00,NULL,'percentage',-7.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(302,10,'per_piece',197,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(303,10,'per_piece',198,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(304,10,'per_piece',199,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(305,10,'per_piece',200,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(306,10,'per_piece',201,0.00,NULL,'percentage',-5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(307,10,'per_piece',202,0.00,NULL,'percentage',-12.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(308,11,'per_kg',203,0.00,NULL,'percentage',6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(309,11,'per_kg',204,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(310,11,'per_kg',205,0.00,NULL,'percentage',-5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(311,11,'per_kg',206,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(312,11,'per_kg',207,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(313,11,'per_kg',208,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(314,11,'per_kg',209,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(315,11,'per_kg',210,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(316,11,'per_kg',211,0.00,NULL,'percentage',-3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(317,12,'per_piece',212,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(318,12,'per_piece',213,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(319,12,'per_piece',214,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(320,12,'per_piece',215,0.00,NULL,'percentage',-3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(321,12,'per_piece',216,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(322,12,'per_piece',217,0.00,NULL,'percentage',7.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(323,12,'per_piece',218,0.00,NULL,'percentage',-10.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(324,12,'per_piece',219,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(325,12,'per_piece',220,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(326,12,'per_piece',221,0.00,NULL,'percentage',7.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(327,12,'per_piece',222,0.00,NULL,'percentage',-5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(328,12,'per_piece',223,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(329,12,'per_piece',224,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(330,12,'per_piece',225,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(331,12,'per_piece',226,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(332,12,'per_piece',227,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(333,12,'per_piece',228,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(334,12,'per_piece',229,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(335,12,'per_piece',230,0.00,NULL,'percentage',-10.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(336,90,'per_piece',231,0.00,NULL,'percentage',6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(337,90,'per_piece',232,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(338,90,'per_piece',233,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(339,90,'per_piece',234,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(340,90,'per_piece',235,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(341,90,'per_piece',236,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(342,90,'per_piece',237,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(343,90,'per_piece',238,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(344,90,'per_piece',239,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(345,90,'per_piece',240,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(346,90,'per_piece',241,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(347,91,'per_piece',242,0.00,NULL,'percentage',7.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(348,91,'per_piece',243,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(349,91,'per_piece',244,0.00,NULL,'percentage',1.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(350,91,'per_piece',245,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(351,91,'per_piece',246,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(352,91,'per_piece',247,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(353,91,'per_piece',248,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(354,91,'per_piece',249,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(355,91,'per_piece',250,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(356,91,'per_piece',251,0.00,NULL,'percentage',-9.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(357,92,'per_piece',252,0.00,NULL,'percentage',5.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(358,92,'per_piece',253,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(359,92,'per_piece',254,0.00,NULL,'percentage',3.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(360,92,'per_piece',255,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(361,92,'per_piece',256,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(362,92,'per_piece',257,0.00,NULL,'percentage',-2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(363,92,'per_piece',258,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(364,92,'per_piece',259,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(365,92,'per_piece',260,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(366,92,'per_piece',261,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(367,92,'per_piece',262,0.00,NULL,'percentage',-8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(368,93,'per_piece',263,0.00,NULL,'percentage',-4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(369,93,'per_piece',264,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(370,93,'per_piece',265,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(371,93,'per_piece',266,0.00,NULL,'percentage',8.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(372,93,'per_piece',267,0.00,NULL,'percentage',6.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(373,93,'per_piece',268,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(374,93,'per_piece',269,0.00,NULL,'percentage',2.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(375,93,'per_piece',270,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(376,93,'per_piece',271,0.00,NULL,'percentage',4.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(377,93,'per_piece',272,0.00,NULL,'percentage',0.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(378,93,'per_piece',273,0.00,NULL,'percentage',-10.00,1,'INR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58');
/*!40000 ALTER TABLE `pricing_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricing_variant_rules`
--

DROP TABLE IF EXISTS `pricing_variant_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pricing_variant_rules` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `variant_key` varchar(255) NOT NULL,
  `option_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`option_values`)),
  `base_price` decimal(12,2) NOT NULL,
  `source_column` varchar(8) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pricing_variant_category_key_unique` (`category_id`,`variant_key`),
  KEY `pricing_variant_category_status_idx` (`category_id`,`status`),
  CONSTRAINT `pricing_variant_rules_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricing_variant_rules`
--

LOCK TABLES `pricing_variant_rules` WRITE;
/*!40000 ALTER TABLE `pricing_variant_rules` DISABLE KEYS */;
INSERT INTO `pricing_variant_rules` VALUES (1,1,'Air Conditioner | 0.8-1 Ton','air-conditioner-08-1-ton','[\"0.8-1 Ton\"]',3050.00,'X',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(2,1,'Air Conditioner | 1.5 Ton','air-conditioner-15-ton','[\"1.5 Ton\"]',4422.50,'Y',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(3,1,'Air Conditioner | 2 Ton','air-conditioner-2-ton','[\"2 Ton\"]',5795.00,'Z',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(4,1,'Air Conditioner | 3 Ton','air-conditioner-3-ton','[\"3 Ton\"]',7167.50,'AA',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(5,1,'Air Conditioner | 5.5 Ton','air-conditioner-55-ton','[\"5.5 Ton\"]',9150.00,'AB',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(6,1,'Air Conditioner | 8 Ton','air-conditioner-8-ton','[\"8 Ton\"]',12200.00,'AC',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(7,2,'Washing Machine | Front Load | Up to 6 Kg','washing-machine-front-load-up-to-6-kg','[\"Front Load\", \"Up to 6 Kg\"]',1105.00,'AD',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(8,2,'Washing Machine | Front Load | 6.5-8 Kg','washing-machine-front-load-65-8-kg','[\"Front Load\", \"6.5-8 Kg\"]',1122.00,'AE',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(9,2,'Washing Machine | Front Load | 8.5+ Kg','washing-machine-front-load-85-kg','[\"Front Load\", \"8.5+ Kg\"]',1130.50,'AF',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(10,2,'Washing Machine | Top Load | Up to 6 Kg','washing-machine-top-load-up-to-6-kg','[\"Top Load\", \"Up to 6 Kg\"]',867.00,'AG',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(11,2,'Washing Machine | Top Load | 6.5-8 Kg','washing-machine-top-load-65-8-kg','[\"Top Load\", \"6.5-8 Kg\"]',884.00,'AH',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(12,2,'Washing Machine | Top Load | 8.5+ Kg','washing-machine-top-load-85-kg','[\"Top Load\", \"8.5+ Kg\"]',892.50,'AI',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(13,2,'Washing Machine | Semi Automatic | Up to 6 Kg','washing-machine-semi-automatic-up-to-6-kg','[\"Semi Automatic\", \"Up to 6 Kg\"]',850.00,'AJ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(14,2,'Washing Machine | Semi Automatic | 6.5-8 Kg','washing-machine-semi-automatic-65-8-kg','[\"Semi Automatic\", \"6.5-8 Kg\"]',867.00,'AK',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(15,2,'Washing Machine | Semi Automatic | 8.5+ Kg','washing-machine-semi-automatic-85-kg','[\"Semi Automatic\", \"8.5+ Kg\"]',875.50,'AL',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(16,3,'Television | Up to 32\" | LED','television-up-to-32-led','[\"Up to 32\\\"\", \"LED\"]',210.00,'AM',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(17,3,'Television | Up to 32\" | LCD','television-up-to-32-lcd','[\"Up to 32\\\"\", \"LCD\"]',192.00,'AN',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(18,3,'Television | Up to 32\" | Plasma','television-up-to-32-plasma','[\"Up to 32\\\"\", \"Plasma\"]',188.00,'AO',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(19,3,'Television | Up to 32\" | CRT','television-up-to-32-crt','[\"Up to 32\\\"\", \"CRT\"]',188.00,'AP',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(20,3,'Television | 33-43\" | LED','television-33-43-led','[\"33-43\\\"\", \"LED\"]',230.00,'AQ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(21,3,'Television | 33-43\" | LCD','television-33-43-lcd','[\"33-43\\\"\", \"LCD\"]',212.00,'AR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(22,3,'Television | 33-43\" | Plasma','television-33-43-plasma','[\"33-43\\\"\", \"Plasma\"]',208.00,'AS',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(23,3,'Television | 33-43\" | CRT','television-33-43-crt','[\"33-43\\\"\", \"CRT\"]',208.00,'AT',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(24,3,'Television | 44-55\" | LED','television-44-55-led','[\"44-55\\\"\", \"LED\"]',260.00,'AU',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(25,3,'Television | 44-55\" | LCD','television-44-55-lcd','[\"44-55\\\"\", \"LCD\"]',242.00,'AV',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(26,3,'Television | 44-55\" | Plasma','television-44-55-plasma','[\"44-55\\\"\", \"Plasma\"]',238.00,'AW',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(27,3,'Television | 44-55\" | CRT','television-44-55-crt','[\"44-55\\\"\", \"CRT\"]',238.00,'AX',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(28,3,'Television | 56\"+ | LED','television-56-led','[\"56\\\"+\", \"LED\"]',310.00,'AY',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(29,3,'Television | 56\"+ | LCD','television-56-lcd','[\"56\\\"+\", \"LCD\"]',292.00,'AZ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(30,3,'Television | 56\"+ | Plasma','television-56-plasma','[\"56\\\"+\", \"Plasma\"]',288.00,'BA',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(31,3,'Television | 56\"+ | CRT','television-56-crt','[\"56\\\"+\", \"CRT\"]',288.00,'BB',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(32,4,'Microwave | Solo','microwave-solo','[\"Solo\"]',300.00,'BC',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(33,4,'Microwave | Grill','microwave-grill','[\"Grill\"]',306.00,'BD',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(34,4,'Microwave | Convection','microwave-convection','[\"Convection\"]',312.00,'BE',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(35,5,'Refrigerator | Single Door | Up to 200 L','refrigerator-single-door-up-to-200-l','[\"Single Door\", \"Up to 200 L\"]',882.00,'BF',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(36,5,'Refrigerator | Single Door | 201-300 L','refrigerator-single-door-201-300-l','[\"Single Door\", \"201-300 L\"]',909.00,'BG',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(37,5,'Refrigerator | Single Door | 301-450 L','refrigerator-single-door-301-450-l','[\"Single Door\", \"301-450 L\"]',936.00,'BH',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(38,5,'Refrigerator | Single Door | 450+ L','refrigerator-single-door-450-l','[\"Single Door\", \"450+ L\"]',954.00,'BI',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(39,5,'Refrigerator | Double Door | Up to 200 L','refrigerator-double-door-up-to-200-l','[\"Double Door\", \"Up to 200 L\"]',900.00,'BJ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(40,5,'Refrigerator | Double Door | 201-300 L','refrigerator-double-door-201-300-l','[\"Double Door\", \"201-300 L\"]',927.00,'BK',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(41,5,'Refrigerator | Double Door | 301-450 L','refrigerator-double-door-301-450-l','[\"Double Door\", \"301-450 L\"]',954.00,'BL',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(42,5,'Refrigerator | Double Door | 450+ L','refrigerator-double-door-450-l','[\"Double Door\", \"450+ L\"]',972.00,'BM',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(43,5,'Refrigerator | Side-by-Side | Up to 200 L','refrigerator-side-by-side-up-to-200-l','[\"Side-by-Side\", \"Up to 200 L\"]',927.00,'BN',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(44,5,'Refrigerator | Side-by-Side | 201-300 L','refrigerator-side-by-side-201-300-l','[\"Side-by-Side\", \"201-300 L\"]',954.00,'BO',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(45,5,'Refrigerator | Side-by-Side | 301-450 L','refrigerator-side-by-side-301-450-l','[\"Side-by-Side\", \"301-450 L\"]',981.00,'BP',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(46,5,'Refrigerator | Side-by-Side | 450+ L','refrigerator-side-by-side-450-l','[\"Side-by-Side\", \"450+ L\"]',999.00,'BQ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(47,6,'Mixer Grinder | 1 Jar','mixer-grinder-1-jar','[\"1 Jar\"]',127.40,'BR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(48,6,'Mixer Grinder | 2 Jars','mixer-grinder-2-jars','[\"2 Jars\"]',130.00,'BS',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(49,6,'Mixer Grinder | 3+ Jars','mixer-grinder-3-jars','[\"3+ Jars\"]',132.60,'BT',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(50,7,'Kitchen Chimney | Below 1000 m3/h','kitchen-chimney-below-1000-m3h','[\"Below 1000 m3/h\"]',196.00,'BU',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(51,7,'Kitchen Chimney | 1000-1200 m3/h','kitchen-chimney-1000-1200-m3h','[\"1000-1200 m3/h\"]',202.00,'BV',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(52,7,'Kitchen Chimney | 1200+ m3/h','kitchen-chimney-1200-m3h','[\"1200+ m3/h\"]',206.00,'BW',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(53,8,'Water Purifier | RO','water-purifier-ro','[\"RO\"]',150.00,'BX',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(54,8,'Water Purifier | RO+UV','water-purifier-rouv','[\"RO+UV\"]',153.00,'BY',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(55,8,'Water Purifier | RO+UV+UF','water-purifier-rouvuf','[\"RO+UV+UF\"]',156.00,'BZ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(56,9,'Mobile Phone | 64 GB','mobile-phone-64-gb','[\"64 GB\"]',145.50,'CA',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(57,9,'Mobile Phone | 128 GB','mobile-phone-128-gb','[\"128 GB\"]',150.00,'CB',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(58,9,'Mobile Phone | 256 GB','mobile-phone-256-gb','[\"256 GB\"]',156.00,'CC',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(59,9,'Mobile Phone | 512 GB','mobile-phone-512-gb','[\"512 GB\"]',160.50,'CD',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(60,10,'Laptop | Intel i3 / Ryzen 3 | 1st-5th Gen','laptop-intel-i3-ryzen-3-1st-5th-gen','[\"Intel i3 / Ryzen 3\", \"1st-5th Gen\"]',588.00,'CE',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(61,10,'Laptop | Intel i3 / Ryzen 3 | 6th-8th Gen','laptop-intel-i3-ryzen-3-6th-8th-gen','[\"Intel i3 / Ryzen 3\", \"6th-8th Gen\"]',637.00,'CF',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(62,10,'Laptop | Intel i3 / Ryzen 3 | 9th-10th Gen','laptop-intel-i3-ryzen-3-9th-10th-gen','[\"Intel i3 / Ryzen 3\", \"9th-10th Gen\"]',686.00,'CG',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(63,10,'Laptop | Intel i3 / Ryzen 3 | 11th-13th Gen','laptop-intel-i3-ryzen-3-11th-13th-gen','[\"Intel i3 / Ryzen 3\", \"11th-13th Gen\"]',728.00,'CH',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(64,10,'Laptop | Intel i5 / Ryzen 5 | 1st-5th Gen','laptop-intel-i5-ryzen-5-1st-5th-gen','[\"Intel i5 / Ryzen 5\", \"1st-5th Gen\"]',616.00,'CI',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(65,10,'Laptop | Intel i5 / Ryzen 5 | 6th-8th Gen','laptop-intel-i5-ryzen-5-6th-8th-gen','[\"Intel i5 / Ryzen 5\", \"6th-8th Gen\"]',665.00,'CJ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(66,10,'Laptop | Intel i5 / Ryzen 5 | 9th-10th Gen','laptop-intel-i5-ryzen-5-9th-10th-gen','[\"Intel i5 / Ryzen 5\", \"9th-10th Gen\"]',714.00,'CK',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(67,10,'Laptop | Intel i5 / Ryzen 5 | 11th-13th Gen','laptop-intel-i5-ryzen-5-11th-13th-gen','[\"Intel i5 / Ryzen 5\", \"11th-13th Gen\"]',756.00,'CL',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(68,10,'Laptop | Intel i7+ / Ryzen 7+ | 1st-5th Gen','laptop-intel-i7-ryzen-7-1st-5th-gen','[\"Intel i7+ / Ryzen 7+\", \"1st-5th Gen\"]',672.00,'CM',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(69,10,'Laptop | Intel i7+ / Ryzen 7+ | 6th-8th Gen','laptop-intel-i7-ryzen-7-6th-8th-gen','[\"Intel i7+ / Ryzen 7+\", \"6th-8th Gen\"]',721.00,'CN',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(70,10,'Laptop | Intel i7+ / Ryzen 7+ | 9th-10th Gen','laptop-intel-i7-ryzen-7-9th-10th-gen','[\"Intel i7+ / Ryzen 7+\", \"9th-10th Gen\"]',770.00,'CO',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(71,10,'Laptop | Intel i7+ / Ryzen 7+ | 11th-13th Gen','laptop-intel-i7-ryzen-7-11th-13th-gen','[\"Intel i7+ / Ryzen 7+\", \"11th-13th Gen\"]',812.00,'CP',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(72,10,'Laptop | Apple MacBook | Intel','laptop-apple-macbook-intel','[\"Apple MacBook\", \"Intel\"]',784.00,'EW',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(73,10,'Laptop | Apple MacBook | M1','laptop-apple-macbook-m1','[\"Apple MacBook\", \"M1\"]',1085.00,'EX',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(74,10,'Laptop | Apple MacBook | M2','laptop-apple-macbook-m2','[\"Apple MacBook\", \"M2\"]',1225.00,'EY',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(75,10,'Laptop | Apple MacBook | M1 Pro','laptop-apple-macbook-m1-pro','[\"Apple MacBook\", \"M1 Pro\"]',1435.00,'EZ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(76,10,'Laptop | Apple MacBook | M2 Pro','laptop-apple-macbook-m2-pro','[\"Apple MacBook\", \"M2 Pro\"]',1575.00,'FA',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(77,10,'Laptop | Apple MacBook | M3 / M3 Pro','laptop-apple-macbook-m3-m3-pro','[\"Apple MacBook\", \"M3 / M3 Pro\"]',1715.00,'FB',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(78,11,'Cables & Wires | High Copper','cables-wires-high-copper','[\"High Copper\"]',42.40,'CQ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(79,11,'Cables & Wires | Mixed','cables-wires-mixed','[\"Mixed\"]',40.00,'CR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(80,11,'Cables & Wires | Low Copper','cables-wires-low-copper','[\"Low Copper\"]',38.00,'CS',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(81,12,'CPU Cabinet | Branded Desktop | Intel i3 / Ryzen 3 | 1st-5th Gen','cpu-cabinet-branded-desktop-intel-i3-ryzen-3-1st-5th-gen','[\"Branded Desktop\", \"Intel i3 / Ryzen 3\", \"1st-5th Gen\"]',454.50,'CT',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(82,12,'CPU Cabinet | Branded Desktop | Intel i5 / Ryzen 5 | 1st-5th Gen','cpu-cabinet-branded-desktop-intel-i5-ryzen-5-1st-5th-gen','[\"Branded Desktop\", \"Intel i5 / Ryzen 5\", \"1st-5th Gen\"]',468.00,'CU',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(83,12,'CPU Cabinet | Branded Desktop | Intel i7+ / Ryzen 7+ | 1st-5th Gen','cpu-cabinet-branded-desktop-intel-i7-ryzen-7-1st-5th-gen','[\"Branded Desktop\", \"Intel i7+ / Ryzen 7+\", \"1st-5th Gen\"]',499.50,'CV',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(84,12,'CPU Cabinet | Assembled Desktop | Intel i3 / Ryzen 3 | 1st-5th Gen','cpu-cabinet-assembled-desktop-intel-i3-ryzen-3-1st-5th-gen','[\"Assembled Desktop\", \"Intel i3 / Ryzen 3\", \"1st-5th Gen\"]',436.50,'CW',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(85,12,'CPU Cabinet | Assembled Desktop | Intel i5 / Ryzen 5 | 1st-5th Gen','cpu-cabinet-assembled-desktop-intel-i5-ryzen-5-1st-5th-gen','[\"Assembled Desktop\", \"Intel i5 / Ryzen 5\", \"1st-5th Gen\"]',450.00,'CX',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(86,12,'CPU Cabinet | Assembled Desktop | Intel i7+ / Ryzen 7+ | 1st-5th Gen','cpu-cabinet-assembled-desktop-intel-i7-ryzen-7-1st-5th-gen','[\"Assembled Desktop\", \"Intel i7+ / Ryzen 7+\", \"1st-5th Gen\"]',481.50,'CY',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(87,12,'CPU Cabinet | Bare Cabinet | Intel i3 / Ryzen 3 | 1st-5th Gen','cpu-cabinet-bare-cabinet-intel-i3-ryzen-3-1st-5th-gen','[\"Bare Cabinet\", \"Intel i3 / Ryzen 3\", \"1st-5th Gen\"]',400.50,'CZ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(88,12,'CPU Cabinet | Bare Cabinet | Intel i5 / Ryzen 5 | 1st-5th Gen','cpu-cabinet-bare-cabinet-intel-i5-ryzen-5-1st-5th-gen','[\"Bare Cabinet\", \"Intel i5 / Ryzen 5\", \"1st-5th Gen\"]',414.00,'DA',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(89,12,'CPU Cabinet | Bare Cabinet | Intel i7+ / Ryzen 7+ | 1st-5th Gen','cpu-cabinet-bare-cabinet-intel-i7-ryzen-7-1st-5th-gen','[\"Bare Cabinet\", \"Intel i7+ / Ryzen 7+\", \"1st-5th Gen\"]',445.50,'DB',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(90,12,'CPU Cabinet | Branded Desktop | Intel i3 / Ryzen 3 | 6th-8th Gen','cpu-cabinet-branded-desktop-intel-i3-ryzen-3-6th-8th-gen','[\"Branded Desktop\", \"Intel i3 / Ryzen 3\", \"6th-8th Gen\"]',490.86,'FC',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(91,12,'CPU Cabinet | Branded Desktop | Intel i5 / Ryzen 5 | 6th-8th Gen','cpu-cabinet-branded-desktop-intel-i5-ryzen-5-6th-8th-gen','[\"Branded Desktop\", \"Intel i5 / Ryzen 5\", \"6th-8th Gen\"]',505.44,'FD',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(92,12,'CPU Cabinet | Branded Desktop | Intel i7+ / Ryzen 7+ | 6th-8th Gen','cpu-cabinet-branded-desktop-intel-i7-ryzen-7-6th-8th-gen','[\"Branded Desktop\", \"Intel i7+ / Ryzen 7+\", \"6th-8th Gen\"]',539.46,'FE',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(93,12,'CPU Cabinet | Assembled Desktop | Intel i3 / Ryzen 3 | 6th-8th Gen','cpu-cabinet-assembled-desktop-intel-i3-ryzen-3-6th-8th-gen','[\"Assembled Desktop\", \"Intel i3 / Ryzen 3\", \"6th-8th Gen\"]',471.42,'FF',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(94,12,'CPU Cabinet | Assembled Desktop | Intel i5 / Ryzen 5 | 6th-8th Gen','cpu-cabinet-assembled-desktop-intel-i5-ryzen-5-6th-8th-gen','[\"Assembled Desktop\", \"Intel i5 / Ryzen 5\", \"6th-8th Gen\"]',486.00,'FG',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(95,12,'CPU Cabinet | Assembled Desktop | Intel i7+ / Ryzen 7+ | 6th-8th Gen','cpu-cabinet-assembled-desktop-intel-i7-ryzen-7-6th-8th-gen','[\"Assembled Desktop\", \"Intel i7+ / Ryzen 7+\", \"6th-8th Gen\"]',520.02,'FH',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(96,12,'CPU Cabinet | Bare Cabinet | Intel i3 / Ryzen 3 | 6th-8th Gen','cpu-cabinet-bare-cabinet-intel-i3-ryzen-3-6th-8th-gen','[\"Bare Cabinet\", \"Intel i3 / Ryzen 3\", \"6th-8th Gen\"]',432.54,'FI',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(97,12,'CPU Cabinet | Bare Cabinet | Intel i5 / Ryzen 5 | 6th-8th Gen','cpu-cabinet-bare-cabinet-intel-i5-ryzen-5-6th-8th-gen','[\"Bare Cabinet\", \"Intel i5 / Ryzen 5\", \"6th-8th Gen\"]',447.12,'FJ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(98,12,'CPU Cabinet | Bare Cabinet | Intel i7+ / Ryzen 7+ | 6th-8th Gen','cpu-cabinet-bare-cabinet-intel-i7-ryzen-7-6th-8th-gen','[\"Bare Cabinet\", \"Intel i7+ / Ryzen 7+\", \"6th-8th Gen\"]',481.14,'FK',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(99,12,'CPU Cabinet | Branded Desktop | Intel i3 / Ryzen 3 | 9th-10th Gen','cpu-cabinet-branded-desktop-intel-i3-ryzen-3-9th-10th-gen','[\"Branded Desktop\", \"Intel i3 / Ryzen 3\", \"9th-10th Gen\"]',527.22,'FL',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(100,12,'CPU Cabinet | Branded Desktop | Intel i5 / Ryzen 5 | 9th-10th Gen','cpu-cabinet-branded-desktop-intel-i5-ryzen-5-9th-10th-gen','[\"Branded Desktop\", \"Intel i5 / Ryzen 5\", \"9th-10th Gen\"]',542.88,'FM',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(101,12,'CPU Cabinet | Branded Desktop | Intel i7+ / Ryzen 7+ | 9th-10th Gen','cpu-cabinet-branded-desktop-intel-i7-ryzen-7-9th-10th-gen','[\"Branded Desktop\", \"Intel i7+ / Ryzen 7+\", \"9th-10th Gen\"]',579.42,'FN',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(102,12,'CPU Cabinet | Assembled Desktop | Intel i3 / Ryzen 3 | 9th-10th Gen','cpu-cabinet-assembled-desktop-intel-i3-ryzen-3-9th-10th-gen','[\"Assembled Desktop\", \"Intel i3 / Ryzen 3\", \"9th-10th Gen\"]',506.34,'FO',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(103,12,'CPU Cabinet | Assembled Desktop | Intel i5 / Ryzen 5 | 9th-10th Gen','cpu-cabinet-assembled-desktop-intel-i5-ryzen-5-9th-10th-gen','[\"Assembled Desktop\", \"Intel i5 / Ryzen 5\", \"9th-10th Gen\"]',522.00,'FP',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(104,12,'CPU Cabinet | Assembled Desktop | Intel i7+ / Ryzen 7+ | 9th-10th Gen','cpu-cabinet-assembled-desktop-intel-i7-ryzen-7-9th-10th-gen','[\"Assembled Desktop\", \"Intel i7+ / Ryzen 7+\", \"9th-10th Gen\"]',558.54,'FQ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(105,12,'CPU Cabinet | Bare Cabinet | Intel i3 / Ryzen 3 | 9th-10th Gen','cpu-cabinet-bare-cabinet-intel-i3-ryzen-3-9th-10th-gen','[\"Bare Cabinet\", \"Intel i3 / Ryzen 3\", \"9th-10th Gen\"]',464.58,'FR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(106,12,'CPU Cabinet | Bare Cabinet | Intel i5 / Ryzen 5 | 9th-10th Gen','cpu-cabinet-bare-cabinet-intel-i5-ryzen-5-9th-10th-gen','[\"Bare Cabinet\", \"Intel i5 / Ryzen 5\", \"9th-10th Gen\"]',480.24,'FS',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(107,12,'CPU Cabinet | Bare Cabinet | Intel i7+ / Ryzen 7+ | 9th-10th Gen','cpu-cabinet-bare-cabinet-intel-i7-ryzen-7-9th-10th-gen','[\"Bare Cabinet\", \"Intel i7+ / Ryzen 7+\", \"9th-10th Gen\"]',516.78,'FT',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(108,12,'CPU Cabinet | Branded Desktop | Intel i3 / Ryzen 3 | 11th-13th Gen','cpu-cabinet-branded-desktop-intel-i3-ryzen-3-11th-13th-gen','[\"Branded Desktop\", \"Intel i3 / Ryzen 3\", \"11th-13th Gen\"]',563.58,'FU',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(109,12,'CPU Cabinet | Branded Desktop | Intel i5 / Ryzen 5 | 11th-13th Gen','cpu-cabinet-branded-desktop-intel-i5-ryzen-5-11th-13th-gen','[\"Branded Desktop\", \"Intel i5 / Ryzen 5\", \"11th-13th Gen\"]',580.32,'FV',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(110,12,'CPU Cabinet | Branded Desktop | Intel i7+ / Ryzen 7+ | 11th-13th Gen','cpu-cabinet-branded-desktop-intel-i7-ryzen-7-11th-13th-gen','[\"Branded Desktop\", \"Intel i7+ / Ryzen 7+\", \"11th-13th Gen\"]',619.38,'FW',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(111,12,'CPU Cabinet | Assembled Desktop | Intel i3 / Ryzen 3 | 11th-13th Gen','cpu-cabinet-assembled-desktop-intel-i3-ryzen-3-11th-13th-gen','[\"Assembled Desktop\", \"Intel i3 / Ryzen 3\", \"11th-13th Gen\"]',541.26,'FX',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(112,12,'CPU Cabinet | Assembled Desktop | Intel i5 / Ryzen 5 | 11th-13th Gen','cpu-cabinet-assembled-desktop-intel-i5-ryzen-5-11th-13th-gen','[\"Assembled Desktop\", \"Intel i5 / Ryzen 5\", \"11th-13th Gen\"]',558.00,'FY',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(113,12,'CPU Cabinet | Assembled Desktop | Intel i7+ / Ryzen 7+ | 11th-13th Gen','cpu-cabinet-assembled-desktop-intel-i7-ryzen-7-11th-13th-gen','[\"Assembled Desktop\", \"Intel i7+ / Ryzen 7+\", \"11th-13th Gen\"]',597.06,'FZ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(114,12,'CPU Cabinet | Bare Cabinet | Intel i3 / Ryzen 3 | 11th-13th Gen','cpu-cabinet-bare-cabinet-intel-i3-ryzen-3-11th-13th-gen','[\"Bare Cabinet\", \"Intel i3 / Ryzen 3\", \"11th-13th Gen\"]',496.62,'GA',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(115,12,'CPU Cabinet | Bare Cabinet | Intel i5 / Ryzen 5 | 11th-13th Gen','cpu-cabinet-bare-cabinet-intel-i5-ryzen-5-11th-13th-gen','[\"Bare Cabinet\", \"Intel i5 / Ryzen 5\", \"11th-13th Gen\"]',513.36,'GB',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(116,12,'CPU Cabinet | Bare Cabinet | Intel i7+ / Ryzen 7+ | 11th-13th Gen','cpu-cabinet-bare-cabinet-intel-i7-ryzen-7-11th-13th-gen','[\"Bare Cabinet\", \"Intel i7+ / Ryzen 7+\", \"11th-13th Gen\"]',552.42,'GC',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(117,90,'Wooden Chair | Solid Wood | Small','wooden-chair-solid-wood-small','[\"Solid Wood\", \"Small\"]',156.00,'DC',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(118,90,'Wooden Chair | Solid Wood | Medium','wooden-chair-solid-wood-medium','[\"Solid Wood\", \"Medium\"]',159.00,'DD',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(119,90,'Wooden Chair | Solid Wood | Large','wooden-chair-solid-wood-large','[\"Solid Wood\", \"Large\"]',163.50,'DE',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(120,90,'Wooden Chair | Engineered Wood | Small','wooden-chair-engineered-wood-small','[\"Engineered Wood\", \"Small\"]',150.00,'DF',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(121,90,'Wooden Chair | Engineered Wood | Medium','wooden-chair-engineered-wood-medium','[\"Engineered Wood\", \"Medium\"]',153.00,'DG',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(122,90,'Wooden Chair | Engineered Wood | Large','wooden-chair-engineered-wood-large','[\"Engineered Wood\", \"Large\"]',157.50,'DH',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(123,90,'Wooden Chair | Plastic | Small','wooden-chair-plastic-small','[\"Plastic\", \"Small\"]',144.00,'DI',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(124,90,'Wooden Chair | Plastic | Medium','wooden-chair-plastic-medium','[\"Plastic\", \"Medium\"]',147.00,'DJ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(125,90,'Wooden Chair | Plastic | Large','wooden-chair-plastic-large','[\"Plastic\", \"Large\"]',151.50,'DK',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(126,90,'Wooden Chair | Metal | Small','wooden-chair-metal-small','[\"Metal\", \"Small\"]',148.50,'DL',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(127,90,'Wooden Chair | Metal | Medium','wooden-chair-metal-medium','[\"Metal\", \"Medium\"]',151.50,'DM',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(128,90,'Wooden Chair | Metal | Large','wooden-chair-metal-large','[\"Metal\", \"Large\"]',156.00,'DN',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(129,90,'Wooden Chair | Other | Small','wooden-chair-other-small','[\"Other\", \"Small\"]',147.00,'DO',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(130,90,'Wooden Chair | Other | Medium','wooden-chair-other-medium','[\"Other\", \"Medium\"]',150.00,'DP',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(131,90,'Wooden Chair | Other | Large','wooden-chair-other-large','[\"Other\", \"Large\"]',154.50,'DQ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(132,91,'Steel Cupboard | Heavy Steel | 2 Door Compact','steel-cupboard-heavy-steel-2-door-compact','[\"Heavy Steel\", \"2 Door Compact\"]',525.00,'DR',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(133,91,'Steel Cupboard | Heavy Steel | 2 Door Standard','steel-cupboard-heavy-steel-2-door-standard','[\"Heavy Steel\", \"2 Door Standard\"]',535.00,'DS',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(134,91,'Steel Cupboard | Heavy Steel | 3 Door / Large','steel-cupboard-heavy-steel-3-door-large','[\"Heavy Steel\", \"3 Door / Large\"]',560.00,'DT',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(135,91,'Steel Cupboard | Light Steel | 2 Door Compact','steel-cupboard-light-steel-2-door-compact','[\"Light Steel\", \"2 Door Compact\"]',500.00,'DU',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(136,91,'Steel Cupboard | Light Steel | 2 Door Standard','steel-cupboard-light-steel-2-door-standard','[\"Light Steel\", \"2 Door Standard\"]',510.00,'DV',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(137,91,'Steel Cupboard | Light Steel | 3 Door / Large','steel-cupboard-light-steel-3-door-large','[\"Light Steel\", \"3 Door / Large\"]',535.00,'DW',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(138,91,'Steel Cupboard | Wood + Steel Mix | 2 Door Compact','steel-cupboard-wood-steel-mix-2-door-compact','[\"Wood + Steel Mix\", \"2 Door Compact\"]',495.00,'DX',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(139,91,'Steel Cupboard | Wood + Steel Mix | 2 Door Standard','steel-cupboard-wood-steel-mix-2-door-standard','[\"Wood + Steel Mix\", \"2 Door Standard\"]',505.00,'DY',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(140,91,'Steel Cupboard | Wood + Steel Mix | 3 Door / Large','steel-cupboard-wood-steel-mix-3-door-large','[\"Wood + Steel Mix\", \"3 Door / Large\"]',530.00,'DZ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(141,91,'Steel Cupboard | Other | 2 Door Compact','steel-cupboard-other-2-door-compact','[\"Other\", \"2 Door Compact\"]',490.00,'EA',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(142,91,'Steel Cupboard | Other | 2 Door Standard','steel-cupboard-other-2-door-standard','[\"Other\", \"2 Door Standard\"]',500.00,'EB',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(143,91,'Steel Cupboard | Other | 3 Door / Large','steel-cupboard-other-3-door-large','[\"Other\", \"3 Door / Large\"]',525.00,'EC',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(144,92,'Study Table | Solid Wood | 2-3 ft','study-table-solid-wood-2-3-ft','[\"Solid Wood\", \"2-3 ft\"]',154.50,'ED',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(145,92,'Study Table | Solid Wood | 4 ft','study-table-solid-wood-4-ft','[\"Solid Wood\", \"4 ft\"]',157.50,'EE',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(146,92,'Study Table | Solid Wood | 5 ft+','study-table-solid-wood-5-ft','[\"Solid Wood\", \"5 ft+\"]',163.50,'EF',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(147,92,'Study Table | Engineered Wood | 2-3 ft','study-table-engineered-wood-2-3-ft','[\"Engineered Wood\", \"2-3 ft\"]',150.00,'EG',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(148,92,'Study Table | Engineered Wood | 4 ft','study-table-engineered-wood-4-ft','[\"Engineered Wood\", \"4 ft\"]',153.00,'EH',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(149,92,'Study Table | Engineered Wood | 5 ft+','study-table-engineered-wood-5-ft','[\"Engineered Wood\", \"5 ft+\"]',159.00,'EI',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(150,92,'Study Table | Metal Frame | 2-3 ft','study-table-metal-frame-2-3-ft','[\"Metal Frame\", \"2-3 ft\"]',151.50,'EJ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(151,92,'Study Table | Metal Frame | 4 ft','study-table-metal-frame-4-ft','[\"Metal Frame\", \"4 ft\"]',154.50,'EK',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(152,92,'Study Table | Metal Frame | 5 ft+','study-table-metal-frame-5-ft','[\"Metal Frame\", \"5 ft+\"]',160.50,'EL',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(153,92,'Study Table | Plastic | 2-3 ft','study-table-plastic-2-3-ft','[\"Plastic\", \"2-3 ft\"]',144.00,'EM',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(154,92,'Study Table | Plastic | 4 ft','study-table-plastic-4-ft','[\"Plastic\", \"4 ft\"]',147.00,'EN',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(155,92,'Study Table | Plastic | 5 ft+','study-table-plastic-5-ft','[\"Plastic\", \"5 ft+\"]',153.00,'EO',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(156,92,'Study Table | Other | 2-3 ft','study-table-other-2-3-ft','[\"Other\", \"2-3 ft\"]',147.00,'EP',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(157,92,'Study Table | Other | 4 ft','study-table-other-4-ft','[\"Other\", \"4 ft\"]',150.00,'EQ',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(158,92,'Study Table | Other | 5 ft+','study-table-other-5-ft','[\"Other\", \"5 ft+\"]',156.00,'ER',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(159,93,'Sofa Set | 1 Seater','sofa-set-1-seater','[\"1 Seater\"]',288.00,'ES',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(160,93,'Sofa Set | 2 Seater','sofa-set-2-seater','[\"2 Seater\"]',300.00,'ET',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(161,93,'Sofa Set | 3 Seater','sofa-set-3-seater','[\"3 Seater\"]',312.00,'EU',1,'2026-06-23 04:29:58','2026-06-23 04:29:58'),(162,93,'Sofa Set | L-Shape / 5 Seater+','sofa-set-l-shape-5-seater','[\"L-Shape / 5 Seater+\"]',324.00,'EV',1,'2026-06-23 04:29:58','2026-06-23 04:29:58');
/*!40000 ALTER TABLE `pricing_variant_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_status_logs`
--

DROP TABLE IF EXISTS `request_status_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request_status_logs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `request_id` bigint(20) unsigned NOT NULL,
  `old_status` varchar(255) DEFAULT NULL,
  `new_status` varchar(255) NOT NULL,
  `changed_by_user_id` bigint(20) unsigned NOT NULL,
  `changed_by_role` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `request_status_logs_request_id_foreign` (`request_id`),
  KEY `request_status_logs_changed_by_user_id_foreign` (`changed_by_user_id`),
  CONSTRAINT `request_status_logs_changed_by_user_id_foreign` FOREIGN KEY (`changed_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `request_status_logs_request_id_foreign` FOREIGN KEY (`request_id`) REFERENCES `pickup_requests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_status_logs`
--

LOCK TABLES `request_status_logs` WRITE;
/*!40000 ALTER TABLE `request_status_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_status_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(13,2),(13,3),(13,4),(13,5),(13,6),(14,1),(14,2),(14,4),(15,1),(15,3),(16,1),(16,2),(16,4),(17,1),(18,1),(19,1),(19,6),(20,1),(20,5),(21,1),(21,5);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','web',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(2,'customer','web',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(3,'pickup_boy','web',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(4,'channel_partner','web',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(5,'warehouse','web',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(6,'payment_admin','web',1,0,'2026-06-23 04:29:57','2026-06-23 04:29:57');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scrap_categories`
--

DROP TABLE IF EXISTS `scrap_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scrap_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `scrap_categories_slug_unique` (`slug`),
  KEY `scrap_categories_is_active_sort_order_index` (`is_active`,`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scrap_categories`
--

LOCK TABLES `scrap_categories` WRITE;
/*!40000 ALTER TABLE `scrap_categories` DISABLE KEYS */;
INSERT INTO `scrap_categories` VALUES (1,'Large Appliances','large-appliances','Refrigerator',NULL,1,0,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(2,'Mobiles & Computers','mobiles-computers','Laptop',NULL,1,1,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(3,'Metals','metals','Layers',NULL,1,2,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(4,'Electronics','electronics','Tv',NULL,1,3,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(5,'Office Equipment','office-equipment','Printer',NULL,1,4,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(6,'Batteries & Cables','batteries-cables','BatteryCharging',NULL,1,5,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(7,'Other Scrap','other-scrap','Boxes',NULL,1,6,'2026-06-26 06:49:35','2026-06-26 06:49:35');
/*!40000 ALTER TABLE `scrap_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scrap_items`
--

DROP TABLE IF EXISTS `scrap_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scrap_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `scrap_category_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `rate` decimal(10,2) NOT NULL DEFAULT 0.00,
  `unit` varchar(255) NOT NULL DEFAULT 'piece',
  `image_path` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `scrap_items_scrap_category_id_foreign` (`scrap_category_id`),
  KEY `scrap_items_is_active_sort_order_index` (`is_active`,`sort_order`),
  CONSTRAINT `scrap_items_scrap_category_id_foreign` FOREIGN KEY (`scrap_category_id`) REFERENCES `scrap_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scrap_items`
--

LOCK TABLES `scrap_items` WRITE;
/*!40000 ALTER TABLE `scrap_items` DISABLE KEYS */;
INSERT INTO `scrap_items` VALUES (1,1,'Split AC 1.5 Ton (Indoor + Outdoor)',3700.00,'piece','scrap-items/split-ac.jpg',NULL,1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(2,1,'Window AC 1.5 Ton',4300.00,'piece','scrap-items/window-ac.jpg',NULL,1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(3,1,'Split AC 1 Ton (Indoor + Outdoor)',3200.00,'piece','scrap-items/split-ac-1ton.jpg',NULL,1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(4,1,'AC 2 Ton (Copper Coil)',5000.00,'piece','scrap-items/ac-2ton.jpg',NULL,1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(5,1,'Front Load Washing Machine',1400.00,'piece','scrap-items/washing-machine-front.jpg',NULL,1,4,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(6,1,'Top Load Washing Machine',900.00,'piece','scrap-items/washing-machine-top.jpg',NULL,1,5,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(7,1,'Semi Automatic Washing Machine',800.00,'piece','scrap-items/washing-machine-semi.jpg',NULL,1,6,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(8,1,'Single Door Fridge',900.00,'piece','scrap-items/fridge-single.jpg',NULL,1,7,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(9,1,'Double Door Fridge',1400.00,'piece','scrap-items/fridge-double.jpg',NULL,1,8,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(10,1,'Geyser',22.00,'kg','scrap-items/geyser.jpg',NULL,1,9,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(11,1,'RO Purifier',100.00,'piece','scrap-items/ro-purifier.jpg',NULL,1,10,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(12,2,'Scrap Laptop',350.00,'piece','scrap-items/laptop.jpg',NULL,1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(13,2,'Computer CPU',250.00,'piece','scrap-items/cpu.jpg',NULL,1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(14,2,'CRT Monitor',175.00,'piece','scrap-items/crt-monitor.jpg',NULL,1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(15,2,'LCD Monitor',50.00,'piece','scrap-items/lcd-monitor.jpg',NULL,1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(16,2,'LED Monitor',50.00,'piece','scrap-items/led-monitor.jpg',NULL,1,4,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(17,2,'Mobile Phone (Android)',60.00,'piece','scrap-items/android-phone.jpg',NULL,1,5,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(18,2,'Mobile Phone (Keypad)',30.00,'piece','scrap-items/keypad-phone.jpg',NULL,1,6,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(19,2,'Mobile Charger',5.00,'piece','scrap-items/mobile-charger.jpg',NULL,1,7,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(20,2,'Laptop Charger',10.00,'piece','scrap-items/laptop-charger.jpg',NULL,1,8,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(21,3,'Copper',575.00,'kg','scrap-items/copper.jpg',NULL,1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(22,3,'Aluminium',140.00,'kg','scrap-items/aluminium.jpg',NULL,1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(23,3,'Iron Cooler',27.00,'kg','scrap-items/iron-cooler.jpg',NULL,1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(24,3,'Plastic Cooler',18.00,'kg','scrap-items/plastic-cooler.jpg',NULL,1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(25,3,'UPS / Inverter (Copper Coil)',55.00,'kg','scrap-items/ups-inverter.jpg',NULL,1,4,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(26,3,'UPS / Inverter (Aluminium Coil)',40.00,'kg','scrap-items/ups-inverter.jpg',NULL,1,5,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(27,4,'LED TV',400.00,'piece','scrap-items/led-tv.jpg',NULL,1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(28,4,'LCD TV',350.00,'piece','scrap-items/led-tv.jpg',NULL,1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(29,4,'Ceiling Fan (Copper winding)',150.00,'piece','scrap-items/ceiling-fan.jpg',NULL,1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(30,4,'Ceiling Fan (Aluminium winding)',80.00,'piece','scrap-items/ceiling-fan.jpg',NULL,1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(31,4,'Exhaust Fan',50.00,'piece','scrap-items/exhaust-fan.jpg',NULL,1,4,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(32,4,'LED Bulb',1.00,'piece','scrap-items/led-bulb.jpg',NULL,1,5,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(33,4,'Tubelight',1.00,'piece','scrap-items/tubelight.jpg',NULL,1,6,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(34,5,'Desktop Workstation',250.00,'piece','scrap-items/desktop-workstation.jpg',NULL,1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(35,5,'Printer / Scanner',40.00,'kg','scrap-items/printer-scanner.jpg',NULL,1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(36,5,'Server (Rack Unit)',90.00,'kg','scrap-items/server-rack.jpg',NULL,1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(37,5,'Network Switch / Router',120.00,'kg','scrap-items/network-router.jpg',NULL,1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(38,5,'UPS Battery Backup',55.00,'kg','scrap-items/ups-battery.jpg',NULL,1,4,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(39,6,'Lead Acid Battery',95.00,'kg','scrap-items/lead-acid-battery.jpg',NULL,1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(40,6,'Lithium-ion Battery Pack',120.00,'kg','scrap-items/lithium-battery.jpg',NULL,1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(41,6,'Copper Cable / Wiring',575.00,'kg','scrap-items/copper-cable.jpg',NULL,1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(42,6,'Mixed Cables',60.00,'kg','scrap-items/mixed-cables.jpg',NULL,1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(43,7,'Mixed E-Waste',35.00,'kg','scrap-items/mixed-ewaste.jpg',NULL,1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(44,7,'Plastic Scrap',18.00,'kg','scrap-items/plastic-scrap.jpg',NULL,1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(45,7,'PCB / Circuit Boards',250.00,'kg','scrap-items/pcb.jpg',NULL,1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(46,7,'Steel Scrap',30.00,'kg','scrap-items/steel-scrap.jpg',NULL,1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35');
/*!40000 ALTER TABLE `scrap_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `long_description` longtext DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_slug_unique` (`slug`),
  KEY `services_is_active_sort_order_index` (`is_active`,`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'E-Waste Recycling','e-waste-recycling','End-to-end collection, segregation and environmentally safe recycling of electronic waste.','We provide complete e-waste recycling — from collection and segregation to environmentally safe processing — recovering valuable resources while ensuring zero dumping and full compliance with pollution control norms.','services/e-waste-recycling.jpg','Recycle',1,0,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(2,'IT & Mobility Asset Disposition','it-mobility-asset-disposition','Structured ITAD services for corporates, OEMs and enterprises retiring IT infrastructure.','Our IT Asset Disposition (ITAD) service helps organizations responsibly retire end-of-life IT and mobility assets while protecting sensitive data and recovering maximum residual value.','services/it-mobility-asset-disposition.jpg','Laptop',1,1,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(3,'Data Sanitization','data-sanitization','Certified data wiping, degaussing and hard disk shredding for complete data security.','We deliver certified data sanitization — software wiping, degaussing and physical hard-disk shredding — so sensitive data is destroyed beyond recovery with a complete, audit-ready trail.','services/data-sanitization.jpg','ShieldCheck',1,2,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(4,'Precious Metal Recovery','precious-metal-recovery','Recovery of gold, silver, copper, aluminium and other valuable materials from e-waste streams.','We scientifically recover precious and base metals — gold, silver, copper and aluminium — from e-waste streams through environmentally safe methods with a strict zero-dumping commitment.','services/precious-metal-recovery.jpg','Gem',1,3,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(5,'Reverse Logistics','reverse-logistics','DOA product management and reverse supply-chain solutions for e-commerce, OEMs and logistics.','Our reverse logistics solutions help e-commerce companies, OEMs and distributors efficiently manage returns, dead-on-arrival (DOA) products and damaged goods through a streamlined collection and processing network.','services/reverse-logistics.jpg','Truck',1,4,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(6,'EPR & CSR Services','epr-csr-services','Extended Producer Responsibility compliance and corporate sustainability programs.','We provide complete Extended Producer Responsibility (EPR) support and impactful CSR programs — from authorization and target fulfilment to community-focused sustainability initiatives.','services/epr-csr-services.jpg','ShieldCheck',1,5,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(7,'Training & Awareness','training-awareness','Awareness programs around responsible e-waste handling as per Government rules.','The Ministry of Environment, Forest and Climate Change has published E-Waste Management Rules. We conduct training and awareness programs to help organizations and communities comply and adopt responsible practices.','services/training-awareness.jpg','GraduationCap',1,6,NULL,NULL,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2ejMVU0XdCxYSPvb3HqEyGugPyAsCvP8SSZ7NxMC',NULL,'127.0.0.1','curl/8.7.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoibzdYRTIydmZOeEE4dFJLV2IxMVp4ZWhoZm9kc1NySUxDTWxaMms5VSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1782475589),('aJjicFqZYSCWqwPOvdAT5lxdyG6xyYcNytWIgFKz',NULL,'127.0.0.1','Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoia3FxNG1FUHQwRjJ6d3FoQ0hzYnpYQ21KZkxOQ2t2ZWg2M1FlRGZlMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1782482848),('JOkfAqQG02iQtp3u3bVf4G1clRMhYs9jAP8OZjPq',NULL,'127.0.0.1','curl/8.7.1','YTozOntzOjY6Il90b2tlbiI7czo0MDoiNXViSTlLUUNVTkZZRzR3a0xQck45bmV6aXhibTZkbmloY3g4Zkl5NSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1782473001);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `states_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Maharashtra','MH',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(2,'Delhi','DL',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(3,'Karnataka','KA',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(4,'Tamil Nadu','TN',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(5,'Gujarat','GJ',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(6,'West Bengal','WB',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(7,'Telangana','TS',1,'2026-06-23 04:29:57','2026-06-23 04:29:57'),(8,'Uttar Pradesh','UP',1,'2026-06-23 04:29:57','2026-06-23 04:29:57');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testimonials` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `rating` tinyint(3) unsigned NOT NULL DEFAULT 5,
  `review_text` text NOT NULL,
  `outcome_text` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `testimonials_is_active_sort_order_index` (`is_active`,`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'Rohit Sharma','IT Asset Manager','Infinite Systems Pvt. Ltd.',NULL,5,'We had years of old laptops and servers piling up. Abhyuthanam picked everything up, wiped the data securely and handed us proper certificates for our audit. Clean, simple and stress-free.','120+ devices cleared',1,0,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(2,'Priya Nair','Operations Head','ShopKart E-Commerce',NULL,5,'Their team helped us manage bulk returns and damaged goods without any hassle. Pickups are always on time and the paperwork is spot on. It has genuinely made our reverse logistics easier.','Faster returns handling',1,1,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(3,'Anil Verma','Plant Director','VoltEdge Electronics',NULL,5,'We visited their plant before signing up and were impressed. Nothing goes to landfill and everything is recovered properly. We now trust them with all our factory e-waste.','Zero-landfill disposal',1,2,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(4,'Sneha Kapoor','CSR & Compliance Lead','Meridian Finance',NULL,5,'They handled our EPR filings and recycling targets from start to finish. We met our compliance goals comfortably and the whole burden was taken off our small team.','EPR targets met',1,3,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(5,'Manish Gupta','Facilities Manager','Nexus Towers',NULL,5,'We cleared out two floors of old electronics and furniture scrap in a single day. The crew was polite, careful and quick. Highly recommend them for any office clean-up.','Office space cleared',1,4,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35'),(6,'Deepa Iyer','Sustainability Officer','GreenLeaf Industries',NULL,5,'What we value most is how transparent they are. We get clear reports on how much waste was recycled and recovered, which helps us show real progress on our sustainability goals.','Measurable impact reports',1,5,NULL,'2026-06-26 06:49:35','2026-06-26 06:49:35');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL DEFAULT 'en',
  `city_id` bigint(20) unsigned DEFAULT NULL,
  `warehouse_id` bigint(20) unsigned DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `vehicle_number` varchar(255) DEFAULT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `referral_code` varchar(6) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `otp_expires_at` timestamp NULL DEFAULT NULL,
  `wallet_balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `is_online` tinyint(1) NOT NULL DEFAULT 0,
  `is_manual_offline` tinyint(1) NOT NULL DEFAULT 0,
  `is_available` tinyint(1) NOT NULL DEFAULT 0,
  `daily_capacity` int(11) NOT NULL DEFAULT 4,
  `location_updated_at` timestamp NULL DEFAULT NULL,
  `last_active_at` timestamp NULL DEFAULT NULL,
  `profile_photo_path` varchar(2048) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `ifsc_code` varchar(255) DEFAULT NULL,
  `upi_id` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_unique` (`phone`),
  UNIQUE KEY `users_referral_code_unique` (`referral_code`),
  UNIQUE KEY `users_employee_id_unique` (`employee_id`),
  KEY `users_city_id_foreign` (`city_id`),
  KEY `users_warehouse_id_foreign` (`warehouse_id`),
  CONSTRAINT `users_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL,
  CONSTRAINT `users_warehouse_id_foreign` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin User','admin@ewaste.com','en',1,NULL,NULL,NULL,NULL,NULL,NULL,'1111111111',NULL,NULL,'$2y$12$NP/lUFe7rIxYVbmbxA12yuoCA5poUVdR34Q7b3Gr0csPCfYh5oDxO',NULL,NULL,'2026-06-23 04:29:58','2026-06-23 04:29:58',NULL,NULL,0.00,1,0,0,0,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waitlist`
--

DROP TABLE IF EXISTS `waitlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waitlist` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` enum('new','contacted','planned','launched','closed') NOT NULL DEFAULT 'new',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waitlist`
--

LOCK TABLES `waitlist` WRITE;
/*!40000 ALTER TABLE `waitlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `waitlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouses`
--

DROP TABLE IF EXISTS `warehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `city_id` bigint(20) unsigned DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `zone` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `capacity` decimal(15,2) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `service_radius_km` decimal(8,2) NOT NULL DEFAULT 10.00,
  `service_pincodes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`service_pincodes`)),
  `manager_id` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `accepts_corporate` tinyint(1) NOT NULL DEFAULT 1,
  `accepts_donation` tinyint(1) NOT NULL DEFAULT 1,
  `service_types` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`service_types`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `warehouses_code_unique` (`code`),
  KEY `warehouses_manager_id_foreign` (`manager_id`),
  KEY `warehouses_city_id_foreign` (`city_id`),
  CONSTRAINT `warehouses_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL,
  CONSTRAINT `warehouses_manager_id_foreign` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouses`
--

LOCK TABLES `warehouses` WRITE;
/*!40000 ALTER TABLE `warehouses` DISABLE KEYS */;
INSERT INTO `warehouses` VALUES (1,1,NULL,NULL,'Main Warehouse','MWH-01','123 Industrial Area',NULL,19.07600000,72.87770000,10.00,NULL,NULL,1,1,1,NULL,'2026-06-23 04:29:59','2026-06-23 04:29:59'),(2,6,NULL,NULL,'Delhi Warehouse','DLWH-01','456 Delhi Industrial Area',NULL,28.61390000,77.20900000,10.00,NULL,NULL,1,1,1,NULL,'2026-06-23 04:30:00','2026-06-23 04:30:00');
/*!40000 ALTER TABLE `warehouses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-26 19:38:19

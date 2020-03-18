-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: ams
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department_it`
--

DROP TABLE IF EXISTS `department_it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department_it` (
  `Teacher_ID` varchar(20) DEFAULT NULL,
  `Section` varchar(10) DEFAULT NULL,
  `Subject` varchar(40) DEFAULT NULL,
  `total_lectures` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_it`
--

LOCK TABLES `department_it` WRITE;
/*!40000 ALTER TABLE `department_it` DISABLE KEYS */;
INSERT INTO `department_it` VALUES ('1','S10','DS',2),('1','F10','WC',0),('1','S10 B','DS LAB',1),('1','S10 A','DS LAB',1),('3','T9','JAVA',0),('3','T9 A','JAVA LAB',0),('3','T10','JAVA',0),('3','T9 B','JAVA LAB',0),('3','T10 A','JAVA LAB',0),('3','T10 B','JAVA LAB',0);
/*!40000 ALTER TABLE `department_it` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_s10`
--

DROP TABLE IF EXISTS `section_s10`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section_s10` (
  `studentRollNo` varchar(12) NOT NULL,
  `studentName` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`studentRollNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_s10`
--

LOCK TABLES `section_s10` WRITE;
/*!40000 ALTER TABLE `section_s10` DISABLE KEYS */;
INSERT INTO `section_s10` VALUES ('a41015603117','BHAVYA MANOCHA'),('a41215603117','ABHISHEK DOBHAL'),('a41315603117','KUNAL CHANDEL'),('a41415603117','AYUSHI SINGH'),('a41515603117','SAANVI JAIN'),('a41615603117','RISHABH BANSAL'),('a41715603117','GIRISH'),('a41815603117','NAMAN KUMAR'),('a41915603117','KRITIKA BAKSHI'),('a42015603117','TARU JAIN'),('a42115603117','AVI GUPTA'),('a42215603117','URNIMA RAJ VARSHNEY'),('a42315603117','SHUBHAM BEERH'),('a42415603117','MOHIT JINDAL'),('a42515603117','VIPUL CHAUDHARY'),('a42615603117','GITANSH GERA'),('a42715603117','KARTIK GOEL'),('a42815603117','ADITYA SHARMA'),('a42915603117','HARSH MIGLANI'),('a43015603117','LAKSHYA SANGAR'),('a43115603117','HIMANSHU'),('a43315603117','SACHIN PARASHAR'),('a43415603117','ISHA JAIN'),('a43515603117','PAWAN KUMAR RAI'),('a43615603117','SHUBHAM JADON'),('a43715603117','SAHIL KHUNGER'),('a43815603117','DEVESH KHANDELWAL'),('a43915603117','HARSHIT'),('a44015603117','RITIK GUPTA'),('a44115603117','TANISHQA'),('a44215603117','SAGAR'),('a44315603117','RISHABH KAPOOR'),('a44415603117','KARTIK AGGARWAL'),('a44515603117','PRADEEP SHARMA'),('a44615603117','LAKSHAY SINGHAL'),('b00115607718','AASTHA GUPTA'),('b00215607718','BHANU PRATAP'),('b00315607718','MAYANK GUPTA'),('b00415607718','PRINCE'),('b00515607718','RAHUL GUPTA'),('b00615607718','RAHUL YADAV'),('b00715607718','SHUBHAM KUMAR'),('b00815607718','VISHAL JHA'),('b00915607718','YASH PAL SINGH'),('b01015607718','YATHARTH KHANSALI'),('b35115607718','RISHABH TYAGI'),('b40115607718','SIDDHARTH TOMAR'),('b44715603117','AKSHITA JAIN'),('b44915603117','KUSH AGGARWAL'),('b45015603117','DEEPAK KUMAR SAIN'),('b45115603117','NAMAN TYAGI'),('b45215603117','MOHIT SINGH'),('b45415603117','SUMIT JOON'),('b45515603117','VIKAS'),('b45615603117','PRATIK SHARMA'),('b45715603117','SATYAM TYAGI'),('b45815603117','RAHUL YADAV'),('b45915603117','AAKASH GUPTA'),('b46015603117','TANIA'),('b46115603117','SHUBHAM GOEL'),('b46215603117','PRIYAM ARORA'),('b46315603117','HIMANSHI JINDGAR'),('b46415603117','PRERNA JAIN'),('b46515603117','ANSHUL KUMAR HUDDA'),('b46615603117','NILESH N BHOI'),('b46715603117','PREM PRAKASH GUPTA'),('b46815603117','PRATEEK KUMAR SHARMA'),('b50115603117','IKSHIT BANSAL'),('b50215603117','SUNNY KUMAR'),('b75115603117','ZUBAIR AHMAD MALIK'),('b90115603118','AMAN SONI');
/*!40000 ALTER TABLE `section_s10` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_s10_attendance`
--

DROP TABLE IF EXISTS `section_s10_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section_s10_attendance` (
  `Sno` int(11) NOT NULL AUTO_INCREMENT,
  `lecture` varchar(40) NOT NULL,
  `grp` enum('A','B','Both') NOT NULL,
  `lecture_date` date NOT NULL,
  `lecture_no` int(11) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `a41015603117` varchar(10) DEFAULT NULL,
  `a41215603117` varchar(10) DEFAULT NULL,
  `a41315603117` varchar(10) DEFAULT NULL,
  `a41415603117` varchar(10) DEFAULT NULL,
  `a41515603117` varchar(10) DEFAULT NULL,
  `a41615603117` varchar(10) DEFAULT NULL,
  `a41715603117` varchar(10) DEFAULT NULL,
  `a41815603117` varchar(10) DEFAULT NULL,
  `a41915603117` varchar(10) DEFAULT NULL,
  `a42015603117` varchar(10) DEFAULT NULL,
  `a42115603117` varchar(10) DEFAULT NULL,
  `a42215603117` varchar(10) DEFAULT NULL,
  `a42315603117` varchar(10) DEFAULT NULL,
  `a42415603117` varchar(10) DEFAULT NULL,
  `a42515603117` varchar(10) DEFAULT NULL,
  `a42615603117` varchar(10) DEFAULT NULL,
  `a42715603117` varchar(10) DEFAULT NULL,
  `a42815603117` varchar(10) DEFAULT NULL,
  `a42915603117` varchar(10) DEFAULT NULL,
  `a43015603117` varchar(10) DEFAULT NULL,
  `a43115603117` varchar(10) DEFAULT NULL,
  `a43315603117` varchar(10) DEFAULT NULL,
  `a43415603117` varchar(10) DEFAULT NULL,
  `a43515603117` varchar(10) DEFAULT NULL,
  `a43615603117` varchar(10) DEFAULT NULL,
  `a43715603117` varchar(10) DEFAULT NULL,
  `a43815603117` varchar(10) DEFAULT NULL,
  `a43915603117` varchar(10) DEFAULT NULL,
  `a44015603117` varchar(10) DEFAULT NULL,
  `a44115603117` varchar(10) DEFAULT NULL,
  `a44215603117` varchar(10) DEFAULT NULL,
  `a44315603117` varchar(10) DEFAULT NULL,
  `a44415603117` varchar(10) DEFAULT NULL,
  `a44515603117` varchar(10) DEFAULT NULL,
  `a44615603117` varchar(10) DEFAULT NULL,
  `b00115607718` varchar(10) DEFAULT NULL,
  `b00215607718` varchar(10) DEFAULT NULL,
  `b00315607718` varchar(10) DEFAULT NULL,
  `b00415607718` varchar(10) DEFAULT NULL,
  `b00515607718` varchar(10) DEFAULT NULL,
  `b00615607718` varchar(10) DEFAULT NULL,
  `b00715607718` varchar(10) DEFAULT NULL,
  `b00815607718` varchar(10) DEFAULT NULL,
  `b00915607718` varchar(10) DEFAULT NULL,
  `b01015607718` varchar(10) DEFAULT NULL,
  `b35115607718` varchar(10) DEFAULT NULL,
  `b40115607718` varchar(10) DEFAULT NULL,
  `b44715603117` varchar(10) DEFAULT NULL,
  `b44915603117` varchar(10) DEFAULT NULL,
  `b45015603117` varchar(10) DEFAULT NULL,
  `b45115603117` varchar(10) DEFAULT NULL,
  `b45215603117` varchar(10) DEFAULT NULL,
  `b45415603117` varchar(10) DEFAULT NULL,
  `b45515603117` varchar(10) DEFAULT NULL,
  `b45615603117` varchar(10) DEFAULT NULL,
  `b45715603117` varchar(10) DEFAULT NULL,
  `b45815603117` varchar(10) DEFAULT NULL,
  `b45915603117` varchar(10) DEFAULT NULL,
  `b46015603117` varchar(10) DEFAULT NULL,
  `b46115603117` varchar(10) DEFAULT NULL,
  `b46215603117` varchar(10) DEFAULT NULL,
  `b46315603117` varchar(10) DEFAULT NULL,
  `b46415603117` varchar(10) DEFAULT NULL,
  `b46515603117` varchar(10) DEFAULT NULL,
  `b46615603117` varchar(10) DEFAULT NULL,
  `b46715603117` varchar(10) DEFAULT NULL,
  `b46815603117` varchar(10) DEFAULT NULL,
  `b50115603117` varchar(10) DEFAULT NULL,
  `b50215603117` varchar(10) DEFAULT NULL,
  `b75115603117` varchar(10) DEFAULT NULL,
  `b90115603118` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Sno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_s10_attendance`
--

LOCK TABLES `section_s10_attendance` WRITE;
/*!40000 ALTER TABLE `section_s10_attendance` DISABLE KEYS */;
INSERT INTO `section_s10_attendance` VALUES (1,'DS','Both','2020-02-18',3,'1','P','A','A','P','A','A','A','A','A','A','P','A','A','A','A','A','A','A','A','A','A','P','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','P','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A'),(2,'DS LAB','A','2020-02-20',5,'1','A','P','A','A','A','A','P','A','A','A','A','A','A','A','A','P','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'DS LAB','B','2020-02-20',7,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'P','A','A','A','A','A','A','A','A','A','A','A','A','P','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A','A'),(5,'DS','Both','2020-02-20',3,'1','P','P','A','A','A','A','A','A','A','A','A','A','A','A','A','A','P','P','P','A','A','A','A','A','A','A','P','P','A','A','A','A','A','A','A','A','A','A','A','P','A','A','A','A','A','A','A','A','A','A','A','A','A','P','A','A','A','A','A','A','A','A','A','A','A','A','A','P','A','A','A');
/*!40000 ALTER TABLE `section_s10_attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_t9`
--

DROP TABLE IF EXISTS `section_t9`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section_t9` (
  `studentRollNo` varchar(12) NOT NULL,
  `studentName` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`studentRollNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_t9`
--

LOCK TABLES `section_t9` WRITE;
/*!40000 ALTER TABLE `section_t9` DISABLE KEYS */;
INSERT INTO `section_t9` VALUES ('a00115603117','AARUSHI ATREY'),('a00215603117','ADARSH LUNTHI'),('a00315603117','AMAN MALHOTRA'),('a00415603117','AMAN SHARMA'),('a00515603117','AMIT KUMAR'),('a00715603117','ANKIT GARG'),('a00815603117','ANSH AGGARWAL'),('a01015603117','AYAAN KAMAAL RIZVI'),('a01115603117','CHAITANYA SAGAR'),('a01215603117','GAURAV KUMAR'),('a01315603117','HIMANSHU BHARDWAJ'),('a01415603117','HIMANSHU PANDEY'),('a01515603117','HITESH BHAT'),('a01615603117','ISHANI BHATIA'),('a01715603117','KARAN SINGH RAWAT'),('a01815603117','LAKSHYA RAWAT'),('a01915603117','LOKESH KUMAR'),('a02015603117','MAHIMA VERMA'),('a02115603117','MAYANK UPADHYAY'),('a02215603117','PRAKASH CHANDRA CHOUDHARY'),('a02315603117','RACHIT JAIN'),('a02515603117','RUSHALI KHANNA'),('a02615603117','SAKSHI BISHT'),('a02715603117','SARVESH GAKHAR'),('a02815603117','SAURABH PACHERWAL'),('a02915603117','SHAHRUKH HUSSAIN'),('a03015603117','SHRADHA'),('a03115603117','SHUBHAM KUMAR SINGH'),('a03315603117','SMRITI SINGH'),('a03415603117','SOUMYA CHOUDHARY'),('a03515603117','SUSHANT KUMAR'),('b03615603117','SWATI'),('b03715603117','TRISHITA PINGOLIA'),('b03815603117','UMANG SHARMA'),('b03915603117','VAIBHAV SHUKLA'),('b04015603117','VISHAL RAI'),('b20115603117','IBADULLA'),('b20215603117','ISHAN JUNEJA'),('b20315603117','NITESH CHAUDHARY'),('b20415603117','RISHABH JAIN'),('b20515603117','PURNIMA GUPTA'),('b20615603117','HARSH TYAGI'),('b35115603117','AAYUSH AGARWAL'),('b35215603117','AKASH GARG'),('b35315603117','ARPIT GUPTA'),('b35415603117','HARSHAL GOYAL'),('b35515603117','PRIYANKA GARG'),('b35615603117','ROHAN UPPAL'),('b35715603117','SAURABH MEHANTI'),('b35815603117','SHUBHAM'),('b35915603117','SIDHARTH DHAMIJA'),('b36015603117','SRESHTH KHANDELWAL'),('b36115603117','VATSAL KHANDELWAL'),('b36215603117','YATHARTH KHOSLA'),('b40115603117','LOVLESH BHATT'),('b40215603117','RIYA'),('b40315603117','NAMAN JINDAL'),('b40415603117','ASHISH SATTI'),('b40515603117','S ABHINAV ANAND'),('b40715603117','DURGA PURI'),('b40815603117','YOUGAL JOSHI'),('b40915603117','RAJAT GUPTA');
/*!40000 ALTER TABLE `section_t9` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_t9_attendance`
--

DROP TABLE IF EXISTS `section_t9_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section_t9_attendance` (
  `Sno` int(11) NOT NULL AUTO_INCREMENT,
  `lecture` varchar(40) NOT NULL,
  `lecture_date` date NOT NULL,
  `lecture_no` int(11) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `a00115603117` varchar(10) DEFAULT NULL,
  `a00215603117` varchar(10) DEFAULT NULL,
  `a00315603117` varchar(10) DEFAULT NULL,
  `a00415603117` varchar(10) DEFAULT NULL,
  `a00515603117` varchar(10) DEFAULT NULL,
  `a00715603117` varchar(10) DEFAULT NULL,
  `a00815603117` varchar(10) DEFAULT NULL,
  `a01015603117` varchar(10) DEFAULT NULL,
  `a01115603117` varchar(10) DEFAULT NULL,
  `a01215603117` varchar(10) DEFAULT NULL,
  `a01315603117` varchar(10) DEFAULT NULL,
  `a01415603117` varchar(10) DEFAULT NULL,
  `a01515603117` varchar(10) DEFAULT NULL,
  `a01615603117` varchar(10) DEFAULT NULL,
  `a01715603117` varchar(10) DEFAULT NULL,
  `a01815603117` varchar(10) DEFAULT NULL,
  `a01915603117` varchar(10) DEFAULT NULL,
  `a02015603117` varchar(10) DEFAULT NULL,
  `a02115603117` varchar(10) DEFAULT NULL,
  `a02215603117` varchar(10) DEFAULT NULL,
  `a02315603117` varchar(10) DEFAULT NULL,
  `a02515603117` varchar(10) DEFAULT NULL,
  `a02615603117` varchar(10) DEFAULT NULL,
  `a02715603117` varchar(10) DEFAULT NULL,
  `a02815603117` varchar(10) DEFAULT NULL,
  `a02915603117` varchar(10) DEFAULT NULL,
  `a03015603117` varchar(10) DEFAULT NULL,
  `a03115603117` varchar(10) DEFAULT NULL,
  `a03315603117` varchar(10) DEFAULT NULL,
  `a03415603117` varchar(10) DEFAULT NULL,
  `a03515603117` varchar(10) DEFAULT NULL,
  `b03615603117` varchar(10) DEFAULT NULL,
  `b03715603117` varchar(10) DEFAULT NULL,
  `b03815603117` varchar(10) DEFAULT NULL,
  `b03915603117` varchar(10) DEFAULT NULL,
  `b04015603117` varchar(10) DEFAULT NULL,
  `b20115603117` varchar(10) DEFAULT NULL,
  `b20215603117` varchar(10) DEFAULT NULL,
  `b20315603117` varchar(10) DEFAULT NULL,
  `b20415603117` varchar(10) DEFAULT NULL,
  `b20515603117` varchar(10) DEFAULT NULL,
  `b20615603117` varchar(10) DEFAULT NULL,
  `b35115603117` varchar(10) DEFAULT NULL,
  `b35215603117` varchar(10) DEFAULT NULL,
  `b35315603117` varchar(10) DEFAULT NULL,
  `b35415603117` varchar(10) DEFAULT NULL,
  `b35515603117` varchar(10) DEFAULT NULL,
  `b35615603117` varchar(10) DEFAULT NULL,
  `b35715603117` varchar(10) DEFAULT NULL,
  `b35815603117` varchar(10) DEFAULT NULL,
  `b35915603117` varchar(10) DEFAULT NULL,
  `b36015603117` varchar(10) DEFAULT NULL,
  `b36115603117` varchar(10) DEFAULT NULL,
  `b36215603117` varchar(10) DEFAULT NULL,
  `b40115603117` varchar(10) DEFAULT NULL,
  `b40215603117` varchar(10) DEFAULT NULL,
  `b40315603117` varchar(10) DEFAULT NULL,
  `b40415603117` varchar(10) DEFAULT NULL,
  `b40515603117` varchar(10) DEFAULT NULL,
  `b40715603117` varchar(10) DEFAULT NULL,
  `b40815603117` varchar(10) DEFAULT NULL,
  `b40915603117` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Sno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_t9_attendance`
--

LOCK TABLES `section_t9_attendance` WRITE;
/*!40000 ALTER TABLE `section_t9_attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `section_t9_attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_temp`
--

DROP TABLE IF EXISTS `section_temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section_temp` (
  `studentRollNo` varchar(12) DEFAULT NULL,
  `studentName` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_temp`
--

LOCK TABLES `section_temp` WRITE;
/*!40000 ALTER TABLE `section_temp` DISABLE KEYS */;
INSERT INTO `section_temp` VALUES ('a1','shinchan'),('a2','ben'),('b3','doraemon'),('b4','thanos'),('b5','pikachu');
/*!40000 ALTER TABLE `section_temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_temp_attendance`
--

DROP TABLE IF EXISTS `section_temp_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section_temp_attendance` (
  `Sno` int(11) NOT NULL AUTO_INCREMENT,
  `lecture` varchar(40) NOT NULL,
  `grp` enum('A','B','Both') DEFAULT NULL,
  `lecture_date` date NOT NULL,
  `lecture_no` int(11) NOT NULL,
  `userId` varchar(20) NOT NULL,
  `a1` varchar(10) DEFAULT NULL,
  `a2` varchar(10) DEFAULT NULL,
  `b3` varchar(10) DEFAULT NULL,
  `b4` varchar(10) DEFAULT NULL,
  `b5` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Sno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_temp_attendance`
--

LOCK TABLES `section_temp_attendance` WRITE;
/*!40000 ALTER TABLE `section_temp_attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `section_temp_attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_1`
--

DROP TABLE IF EXISTS `teacher_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_1` (
  `day_no` int(11) NOT NULL AUTO_INCREMENT,
  `day` varchar(10) NOT NULL,
  `lec1` varchar(20) DEFAULT NULL,
  `lec2` varchar(20) DEFAULT NULL,
  `lec3` varchar(20) DEFAULT NULL,
  `lec4` varchar(20) DEFAULT NULL,
  `lec5` varchar(20) DEFAULT NULL,
  `lec6` varchar(20) DEFAULT NULL,
  `lec7` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`day_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_1`
--

LOCK TABLES `teacher_1` WRITE;
/*!40000 ALTER TABLE `teacher_1` DISABLE KEYS */;
INSERT INTO `teacher_1` VALUES (1,'Monday','-','-','DS S10','-','WC F10','-','-'),(2,'Tuesday','DS S10','-','-','-','WC F10','-','-'),(3,'Wednesday','-','-','-','-','-','DS S10 B LAB 1','DS S10 B LAB 1'),(4,'Thursday','-','DS S10','WC F10','DS S10 A LAB 1','DS S10 A LAB 1','-','-'),(5,'Friday','-','-','WC F10','-','DS S10','-','-');
/*!40000 ALTER TABLE `teacher_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_3`
--

DROP TABLE IF EXISTS `teacher_3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_3` (
  `day_no` int(11) NOT NULL AUTO_INCREMENT,
  `lec1` varchar(20) DEFAULT NULL,
  `lec2` varchar(20) DEFAULT NULL,
  `lec3` varchar(20) DEFAULT NULL,
  `lec4` varchar(20) DEFAULT NULL,
  `lec5` varchar(20) DEFAULT NULL,
  `lec6` varchar(20) DEFAULT NULL,
  `lec7` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`day_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_3`
--

LOCK TABLES `teacher_3` WRITE;
/*!40000 ALTER TABLE `teacher_3` DISABLE KEYS */;
INSERT INTO `teacher_3` VALUES (1,'-','-','JAVA T9','-','-','JAVA T9 A LAB 1','JAVA T9 A LAB 1'),(2,'-','JAVA T10','-','-','-','-','-'),(3,'-','JAVA T9 B LAB 1','JAVA T9 B LAB 1','JAVA T10 A LAB 1','JAVA T10 A LAB 1','-','JAVA T10'),(4,'JAVA T10','-','JAVA T9','JAVA T10 B LAB 1','JAVA T10 B LAB 1','-','-'),(5,'-','-','-','-','-','-','-');
/*!40000 ALTER TABLE `teacher_3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` varchar(20) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `password` varchar(30) DEFAULT NULL,
  `userType` varchar(10) DEFAULT NULL,
  `department` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0','ADMIN','admin@123','admin','it'),('1','Dr. Prashant','123','Teacher','it'),('2','DBMS mam','456','Teacher','it'),('3','Mrs Gunjan','xyz','teacher','IT');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-17 12:58:57

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2022 at 05:55 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aishading`
--

-- --------------------------------------------------------

--
-- Table structure for table `blinds`
--

CREATE TABLE `blinds` (
  `unitID` double DEFAULT NULL,
  `tuyaID` double DEFAULT NULL,
  `userID` double DEFAULT NULL,
  `houseID` double DEFAULT NULL,
  `scheduleID` double DEFAULT NULL,
  `groupName` varchar(30) DEFAULT NULL,
  `windowHeight` double DEFAULT NULL,
  `orientation` varchar(9) DEFAULT NULL,
  `obstructionLevel` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `groupID` double DEFAULT NULL,
  `scheduleID` double DEFAULT NULL,
  `groupName` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE `houses` (
  `houseID` double DEFAULT NULL,
  `houseName` varchar(30) DEFAULT NULL,
  `location` varchar(85) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `userID` double DEFAULT NULL,
  `desiredInternalTemp` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `scheduleID` double DEFAULT NULL,
  `scheduleName` varchar(30) DEFAULT NULL,
  `time0000` decimal(3,2) DEFAULT NULL,
  `time0015` decimal(3,2) DEFAULT NULL,
  `time0030` decimal(3,2) DEFAULT NULL,
  `time0045` decimal(3,2) DEFAULT NULL,
  `time0100` decimal(3,2) DEFAULT NULL,
  `time0115` decimal(3,2) DEFAULT NULL,
  `time0130` decimal(3,2) DEFAULT NULL,
  `time0145` decimal(3,2) DEFAULT NULL,
  `time0200` decimal(3,2) DEFAULT NULL,
  `time0215` decimal(3,2) DEFAULT NULL,
  `time0230` decimal(3,2) DEFAULT NULL,
  `time0245` decimal(3,2) DEFAULT NULL,
  `time0300` decimal(3,2) DEFAULT NULL,
  `time0315` decimal(3,2) DEFAULT NULL,
  `time0330` decimal(3,2) DEFAULT NULL,
  `time0345` decimal(3,2) DEFAULT NULL,
  `time0400` decimal(3,2) DEFAULT NULL,
  `time0415` decimal(3,2) DEFAULT NULL,
  `time0430` decimal(3,2) DEFAULT NULL,
  `time0445` decimal(3,2) DEFAULT NULL,
  `time0500` decimal(3,2) DEFAULT NULL,
  `time0515` decimal(3,2) DEFAULT NULL,
  `time0530` decimal(3,2) DEFAULT NULL,
  `time0545` decimal(3,2) DEFAULT NULL,
  `time0600` decimal(3,2) DEFAULT NULL,
  `time0615` decimal(3,2) DEFAULT NULL,
  `time0630` decimal(3,2) DEFAULT NULL,
  `time0645` decimal(3,2) DEFAULT NULL,
  `time0700` decimal(3,2) DEFAULT NULL,
  `time0715` decimal(3,2) DEFAULT NULL,
  `time0730` decimal(3,2) DEFAULT NULL,
  `time0745` decimal(3,2) DEFAULT NULL,
  `time0800` decimal(3,2) DEFAULT NULL,
  `time0815` decimal(3,2) DEFAULT NULL,
  `time0830` decimal(3,2) DEFAULT NULL,
  `time0845` decimal(3,2) DEFAULT NULL,
  `time0900` decimal(3,2) DEFAULT NULL,
  `time0915` decimal(3,2) DEFAULT NULL,
  `time0930` decimal(3,2) DEFAULT NULL,
  `time0945` decimal(3,2) DEFAULT NULL,
  `time1000` decimal(3,2) DEFAULT NULL,
  `time1015` decimal(3,2) DEFAULT NULL,
  `time1030` decimal(3,2) DEFAULT NULL,
  `time1045` decimal(3,2) DEFAULT NULL,
  `time1100` decimal(3,2) DEFAULT NULL,
  `time1115` decimal(3,2) DEFAULT NULL,
  `time1130` decimal(3,2) DEFAULT NULL,
  `time1145` decimal(3,2) DEFAULT NULL,
  `time1200` decimal(3,2) DEFAULT NULL,
  `time1215` decimal(3,2) DEFAULT NULL,
  `time1230` decimal(3,2) DEFAULT NULL,
  `time1245` decimal(3,2) DEFAULT NULL,
  `time1300` decimal(3,2) DEFAULT NULL,
  `time1315` decimal(3,2) DEFAULT NULL,
  `time1330` decimal(3,2) DEFAULT NULL,
  `time1345` decimal(3,2) DEFAULT NULL,
  `time1400` decimal(3,2) DEFAULT NULL,
  `time1415` decimal(3,2) DEFAULT NULL,
  `time1430` decimal(3,2) DEFAULT NULL,
  `time1445` decimal(3,2) DEFAULT NULL,
  `time1500` decimal(3,2) DEFAULT NULL,
  `time1515` decimal(3,2) DEFAULT NULL,
  `time1530` decimal(3,2) DEFAULT NULL,
  `time1545` decimal(3,2) DEFAULT NULL,
  `time1600` decimal(3,2) DEFAULT NULL,
  `time1615` decimal(3,2) DEFAULT NULL,
  `time1630` decimal(3,2) DEFAULT NULL,
  `time1645` decimal(3,2) DEFAULT NULL,
  `time1700` decimal(3,2) DEFAULT NULL,
  `time1715` decimal(3,2) DEFAULT NULL,
  `time1730` decimal(3,2) DEFAULT NULL,
  `time1745` decimal(3,2) DEFAULT NULL,
  `time1800` decimal(3,2) DEFAULT NULL,
  `time1815` decimal(3,2) DEFAULT NULL,
  `time1830` decimal(3,2) DEFAULT NULL,
  `time1845` decimal(3,2) DEFAULT NULL,
  `time1900` decimal(3,2) DEFAULT NULL,
  `time1915` decimal(3,2) DEFAULT NULL,
  `time1930` decimal(3,2) DEFAULT NULL,
  `time1945` decimal(3,2) DEFAULT NULL,
  `time2000` decimal(3,2) DEFAULT NULL,
  `time2015` decimal(3,2) DEFAULT NULL,
  `time2030` decimal(3,2) DEFAULT NULL,
  `time2045` decimal(3,2) DEFAULT NULL,
  `time2100` decimal(3,2) DEFAULT NULL,
  `time2115` decimal(3,2) DEFAULT NULL,
  `time2130` decimal(3,2) DEFAULT NULL,
  `time2145` decimal(3,2) DEFAULT NULL,
  `time2200` decimal(3,2) DEFAULT NULL,
  `time2215` decimal(3,2) DEFAULT NULL,
  `time2230` decimal(3,2) DEFAULT NULL,
  `time2245` decimal(3,2) DEFAULT NULL,
  `time2300` decimal(3,2) DEFAULT NULL,
  `time2315` decimal(3,2) DEFAULT NULL,
  `time2330` decimal(3,2) DEFAULT NULL,
  `time2345` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` double DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

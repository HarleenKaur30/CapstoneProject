-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2022 at 05:04 AM
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
CREATE DATABASE aishading;
USE aishading;

-- --------------------------------------------------------

--
-- Table structure for table `blinds`
--

CREATE TABLE `blinds` (
  `unitID` double NOT NULL,
  `tuyaID` varchar(60) DEFAULT NULL,
  `userID` double DEFAULT NULL,
  `houseID` double DEFAULT NULL,
  `scheduleID` double DEFAULT NULL,
  `groupName` varchar(30) DEFAULT 'None',
  `windowHeight` double DEFAULT NULL,
  `orientation` varchar(9) DEFAULT NULL,
  `obstructionLevel` double DEFAULT NULL,
  `battery` double DEFAULT 50,
  `openPercentage` double DEFAULT 50,
  `blindsName` varchar(30) NOT NULL,
  `storey` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blinds`
--

INSERT INTO `blinds` (`unitID`, `tuyaID`, `userID`, `houseID`, `scheduleID`, `groupName`, `windowHeight`, `orientation`, `obstructionLevel`, `battery`, `openPercentage`, `blindsName`, `storey`) VALUES
(25, 'TuyaIDIDIDI', 1, 1, NULL, 'None', 0, '', 0.5, 68, 65, 'Name', 0),
(27, 'TuyaTestAgain', 1, 2, NULL, 'None', 0, '', 0.5, 14, 36, 'Test', 0),
(30, '52369', 33, 14, 1, 'Group Name', 0, '', 0, 100, 45, 'Blinds Name', 0),
(37, 'Working?', 1, 3, NULL, '', 0, '', 0.5, 50, 50, 'Working', 0),
(39, 'Extra Blind', 1, 2, NULL, 'Test', 78, '', 0.15, 50, 50, 'Extra Blind', 3),
(40, 'Blinds Test 1', 28, 15, 18, 'Test', 35, 'North', 0.75, 50, 58, 'Blinds Test 1', 2);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `groupID` double NOT NULL,
  `scheduleID` double DEFAULT NULL,
  `groupName` varchar(30) DEFAULT NULL,
  `userID` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE `houses` (
  `houseID` double NOT NULL,
  `houseName` varchar(30) DEFAULT NULL,
  `location` varchar(85) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `userID` double DEFAULT NULL,
  `desiredInternalTemp` double DEFAULT NULL,
  `numBlinds` int(11) NOT NULL DEFAULT 0,
  `UsualTemp` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`houseID`, `houseName`, `location`, `latitude`, `longitude`, `userID`, `desiredInternalTemp`, `numBlinds`, `UsualTemp`) VALUES
(1, 'Test House', 'Edmonton', NULL, NULL, 1, 23, 1, 0),
(2, 'Second Test', 'Edmonton', NULL, NULL, 1, 27, 2, 0),
(3, 'Third Test', 'Edmonton', NULL, NULL, 1, 21, 1, 0),
(14, 'Nickname', 'Mountain View', 37.4217147, -122.0841649, 33, 23, 1, 17),
(15, 'Test House 1', 'Toronto', 37.4219927, -122.0840133, 28, 21, 1, 13);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `scheduleID` double NOT NULL,
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
  `time2345` decimal(3,2) DEFAULT NULL,
  `userID` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`scheduleID`, `scheduleName`, `time0000`, `time0015`, `time0030`, `time0045`, `time0100`, `time0115`, `time0130`, `time0145`, `time0200`, `time0215`, `time0230`, `time0245`, `time0300`, `time0315`, `time0330`, `time0345`, `time0400`, `time0415`, `time0430`, `time0445`, `time0500`, `time0515`, `time0530`, `time0545`, `time0600`, `time0615`, `time0630`, `time0645`, `time0700`, `time0715`, `time0730`, `time0745`, `time0800`, `time0815`, `time0830`, `time0845`, `time0900`, `time0915`, `time0930`, `time0945`, `time1000`, `time1015`, `time1030`, `time1045`, `time1100`, `time1115`, `time1130`, `time1145`, `time1200`, `time1215`, `time1230`, `time1245`, `time1300`, `time1315`, `time1330`, `time1345`, `time1400`, `time1415`, `time1430`, `time1445`, `time1500`, `time1515`, `time1530`, `time1545`, `time1600`, `time1615`, `time1630`, `time1645`, `time1700`, `time1715`, `time1730`, `time1745`, `time1800`, `time1815`, `time1830`, `time1845`, `time1900`, `time1915`, `time1930`, `time1945`, `time2000`, `time2015`, `time2030`, `time2045`, `time2100`, `time2115`, `time2130`, `time2145`, `time2200`, `time2215`, `time2230`, `time2245`, `time2300`, `time2315`, `time2330`, `time2345`, `userID`) VALUES
(1, 'Schedule Test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Optimized Schedule', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'PostmanTest', '0.30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(5, 'Postman Test2', NULL, NULL, '0.50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(7, 'To Be Added', NULL, NULL, NULL, NULL, '0.47', '0.67', NULL, '0.00', NULL, '0.79', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.45', NULL, NULL, '0.18', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.62', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.48', NULL, NULL, NULL, NULL, 1),
(8, 'To Be Added', '0.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.17', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.16', NULL, NULL, '0.02', NULL, '0.28', NULL, NULL, '0.47', NULL, NULL, NULL, NULL, NULL, NULL, '0.31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.33', NULL, NULL, NULL, '0.53', NULL, '0.13', 28),
(9, 'Schedule Name', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(11, 'Test Other Addition', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(12, 'Test Addition Automation', NULL, '0.36', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 28),
(13, 'Test Addition Schedule', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 28),
(14, 'Demo Harleen', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(17, 'Tested', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 28),
(18, 'Check', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0.16', NULL, NULL, NULL, 28);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` double NOT NULL,
  `email` varchar(254) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `email`, `password`, `username`) VALUES
(1, 'test@gmail.com', 'test', NULL),
(28, 'test@test.com', 'test', NULL),
(29, 'BOB@GMAIL.COM', 'HELLOBOB', NULL),
(30, 'test2@test.com', 'testtest', NULL),
(31, 'demonstrate@gmail.com', 'test', NULL),
(32, 'chloe@gmail.com', 'test', NULL),
(33, 'demo@test.com', 'test', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blinds`
--
ALTER TABLE `blinds`
  ADD PRIMARY KEY (`unitID`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groupID`);

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`houseID`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`scheduleID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blinds`
--
ALTER TABLE `blinds`
  MODIFY `unitID` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `groupID` double NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `houseID` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleID` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

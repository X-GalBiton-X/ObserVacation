-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2022 at 11:20 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `observacation`
--
CREATE DATABASE IF NOT EXISTS `observacation` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `observacation`;

DELIMITER $$
--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `BIN_TO_UUID` (`b` BINARY(16), `f` BOOLEAN) RETURNS CHAR(36) CHARSET utf8mb4 DETERMINISTIC BEGIN
   DECLARE hexStr CHAR(32);
   SET hexStr = HEX(b);
   RETURN LOWER(CONCAT(
        IF(f,SUBSTR(hexStr, 9, 8),SUBSTR(hexStr, 1, 8)), '-',
        IF(f,SUBSTR(hexStr, 5, 4),SUBSTR(hexStr, 9, 4)), '-',
        IF(f,SUBSTR(hexStr, 1, 4),SUBSTR(hexStr, 13, 4)), '-',
        SUBSTR(hexStr, 17, 4), '-',
        SUBSTR(hexStr, 21)
    ));
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `UUID_TO_BIN` (`uuid` CHAR(36), `f` BOOLEAN) RETURNS BINARY(16) DETERMINISTIC BEGIN
  RETURN UNHEX(CONCAT(
  IF(f,SUBSTRING(uuid, 15, 4),SUBSTRING(uuid, 1, 8)),
  SUBSTRING(uuid, 10, 4),
  IF(f,SUBSTRING(uuid, 1, 8),SUBSTRING(uuid, 15, 4)),
  SUBSTRING(uuid, 20, 4),
  SUBSTRING(uuid, 25))
  );
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` binary(16) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `role` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `role`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` binary(16) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `roleId`) VALUES
(0x034fcfa5ebda410ab50f92d253abc6a1, 'Gal', 'Biton', 'kofifim10', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0x0b8c37a656d844cc879021416eaf28d1, 'Gal', 'Biton', 'kofifim3', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0x1f905fa111224caca45e3cb31d4fff7e, 'Gal', 'Biton', 'kofifim1', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0x249ee6eaf31043c9b87167731db8e5e0, 'Gal', 'Biton', 'kofifim6', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0x264afef1ddbb4d3bb3eb10e99ef496a7, 'Gal', 'Biton', 'kofifim7', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0x3f05e79bbd47495d9d3a51f1e5229168, 'Gal', 'Biton', 'kofifim8', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0x67862ba580724fa3b5d4ac4d8815332a, 'Gal', 'Biton', 'kofifim9', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0x8c6c14b9ae134ded9d35d84e2523da8e, 'Gal', 'Biton', 'kofifim5', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0x8e55c9f51de14b169cad32972bc30891, 'Gal', 'Biton', 'kofifim2', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0xa9fc5f95d8e848b1af0f0d844e7befc6, 'Gal', 'Biton', 'kofifim4', '632d1c3d1e8b36d503ab2cf28d76785895c870dfc1748a5485d03260ddaebc8095438ebec43015c34a422197b7b453c7dce192eb745c6e12976ea1b0864fb8ff', 2),
(0xf4a915bb72b347f9baf5527e538508e4, 'Gal', 'Biton', 'kofifim', 'b32e9b473b386ce563fdcd5b88add14ca792e8fbc947078785c9664270e5efe0161e4eb059ffdc375108349e3d4cd8d93868bd3ad07b5740a05a3af6c25c8717', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1500) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `fromDate` date NOT NULL,
  `untilDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `imageName`, `fromDate`, `untilDate`, `price`) VALUES
(1, 'Holland, Amsterdam', 'The beautiful capital of Holland!', 'f9761e9d-4d98-11ed-b5b7-f0def15bcf95.jpg', '2022-10-17', '2022-10-28', '1269.00'),
(2, 'France, Paris', 'Great food and wonderful sights', 'f97631e5-4d98-11ed-b5b7-f0def15bcf95.jpg', '2022-10-20', '2022-10-25', '1100.00'),
(3, 'England, London', 'The queen is always in our hearts..', 'f97633b7-4d98-11ed-b5b7-f0def15bcf95.jpg', '2022-10-18', '2022-10-31', '1158.00'),
(4, 'Italy, Rome', 'The most romantic place on earth!!!', 'f976349a-4d98-11ed-b5b7-f0def15bcf95.jpg', '2022-11-03', '2022-11-07', '1520.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

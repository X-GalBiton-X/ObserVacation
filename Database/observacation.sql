-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2022 at 08:36 AM
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

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(0x034fcfa5ebda410ab50f92d253abc6a1, 28),
(0x0b8c37a656d844cc879021416eaf28d1, 14),
(0x0b8c37a656d844cc879021416eaf28d1, 27),
(0x0b8c37a656d844cc879021416eaf28d1, 28),
(0x1f905fa111224caca45e3cb31d4fff7e, 14),
(0x1f905fa111224caca45e3cb31d4fff7e, 24),
(0x1f905fa111224caca45e3cb31d4fff7e, 25),
(0x1f905fa111224caca45e3cb31d4fff7e, 27),
(0x1f905fa111224caca45e3cb31d4fff7e, 28),
(0x1f905fa111224caca45e3cb31d4fff7e, 29),
(0x1f905fa111224caca45e3cb31d4fff7e, 31),
(0x1f905fa111224caca45e3cb31d4fff7e, 32),
(0x1f905fa111224caca45e3cb31d4fff7e, 33),
(0x249ee6eaf31043c9b87167731db8e5e0, 28),
(0x264afef1ddbb4d3bb3eb10e99ef496a7, 28),
(0x3f05e79bbd47495d9d3a51f1e5229168, 28),
(0x67862ba580724fa3b5d4ac4d8815332a, 28),
(0x8c6c14b9ae134ded9d35d84e2523da8e, 28),
(0x8c6c14b9ae134ded9d35d84e2523da8e, 31),
(0x8c6c14b9ae134ded9d35d84e2523da8e, 33),
(0x8e55c9f51de14b169cad32972bc30891, 14),
(0x8e55c9f51de14b169cad32972bc30891, 24),
(0x8e55c9f51de14b169cad32972bc30891, 28),
(0x8e55c9f51de14b169cad32972bc30891, 32);

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
(14, 'Amsterdam', 'Iconic canals, centuries-old townhomes, cobblestone lanes and flower-adorned bridges. Amsterdam is as pretty as a postcard with charm in spades. It\'s also one of the rare places that attracts history buffs, luxury-minded travelers, couples seeking romance and backpackers alike.  Besides its cultural attractions, such as the Anne Frank House and The Concertgebouw, the Dutch capital has leafy parks, hip shops and an enduring sense of the past that thankfully never fades.', 'c9d71065-9edc-4ec4-9ab3-205f60834a5f.jpg', '2022-11-09', '2022-11-14', '1430.00'),
(24, 'Paris', 'The City of Lights dazzles in every way. Nowhere else on earth makes the heart swoon like the mention of Paris. The city lures with its magnificent art, architecture, culture, and cuisine, but there’s also a quieter magic waiting to be explored: the quaint cobbled lanes, the sweet patisseries around the corner, and the cozy little bistros that beckon with a glass of Beaujolais. Get ready to make Paris your own.', '88df820c-47ee-4856-95b7-0824e6e69e8a.jpg', '2022-11-19', '2022-11-22', '1700.00'),
(25, 'Rome', 'With its unparalleled history, Rome is the third most visited city in Europe and the fourteenth worldwide. It attracts visitors from all over the world who are impatient to discover the city’s impressive monuments and archaeological sites; not to mention its renowned cuisine and its lively atmosphere.', 'fc9849f6-8a9d-40f6-a75a-ef87d19b0c64.jpg', '2022-12-09', '2022-12-15', '2000.00'),
(26, 'Barcelona', 'Perfect beaches, world-famous tapas, and Gaudí—the Catalan capital is a Mediterranean dream', '911ffb36-4d69-4ba8-b31e-6b82935cf547.jpg', '2022-11-08', '2022-11-12', '1990.00'),
(27, 'Jerusalem', 'This ancient city will charm you with its enchanting old town, limestone architecture, and some very friendly cats.', '15e363c6-9e3c-447e-b025-2aeb3daed8a4.jpg', '2022-11-26', '2022-11-30', '5999.99'),
(28, 'Dimona', 'A city in Southern District, Israel. It has many popular attractions, including Negev Camel Ranch, Mamshit, making it well worth a visit.', 'f9f9abba-5932-4092-ae4d-5b1c8bb3b78c.jpg', '2022-12-12', '2022-12-16', '950.00'),
(29, 'Rhodes', 'Take a trip back to ancient times as you explore beaches, palaces, and everything in-between on this island.', '57298bf0-2554-4478-b29f-616f41e9f70d.jpg', '2022-11-27', '2022-12-10', '3250.50'),
(30, 'Belgium', 'Situated between France and The Netherlands, the Kingdom of Belgium is often called the Essence of Europe. Stunning architecture decorates quaint cobblestone squares.', '5f3afbfa-a2bf-49b7-9bd1-54e2a15ada95.jpg', '2022-11-11', '2022-12-12', '5555.00'),
(31, 'Ayia Napa', 'Ayia Napa\'s magnificent long stretches of beach, with exotic turquoise waters and white sand, the various dining options ranging from traditional cuisine to international, the many luxury hotels, budget accommodation and of course its hidden beauty spots, makes it an ideal destination for families, couples and singles.', '957e4b13-c916-4bf1-a538-936f44479a84.jpg', '2022-11-14', '2022-11-19', '900.00'),
(32, 'Las Vegas', 'Experience Sin City’s unique allure and grandeur, then let nearby landscapes take your breath away.', '5f793d06-1071-470f-bcee-b0df7bf98b58.jpg', '2022-12-03', '2022-12-08', '3898.57'),
(33, 'New York', 'If you’re looking for a city that has it all, look no further than New York City. There’s something for everyone in this amazing metropolis – from world-renowned museums and theaters to trendy restaurants and nightlife.', '48ea2975-d873-4096-86de-08c7df3b9bfd.jpeg', '2022-11-15', '2022-11-25', '9999.99');

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
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

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

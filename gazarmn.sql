-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2022 at 04:49 PM
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
-- Database: `gazarmn`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `cityname` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`id`, `cityname`) VALUES
(1, 'Улаанбаатар'),
(2, 'Орхон'),
(3, 'Дархан-Уул');

-- --------------------------------------------------------

--
-- Table structure for table `coord`
--

CREATE TABLE `coord` (
  `id` int(11) NOT NULL,
  `lat` varchar(20) NOT NULL,
  `lng` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `id` int(11) NOT NULL,
  `district` varchar(50) NOT NULL,
  `cityId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`id`, `district`, `cityId`) VALUES
(1, 'Хан-Уул', 1),
(2, 'Чингэлтэй', 1),
(3, 'Сонгинохайрхан', 1),
(4, 'Баянгол', 1),
(5, 'Баянзүрх', 1),
(6, 'Сүхбаатар', 1),
(7, 'Багануур', 1),
(8, 'Баганхангай', 1),
(9, 'Налайх', 1),
(10, 'Дархан', 3),
(11, 'Эрдэнэт', 2),
(12, 'Хонгор', 3),
(13, 'Жаргалант', 2);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(190) NOT NULL,
  `image` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `formuse`
--

CREATE TABLE `formuse` (
  `id` int(11) NOT NULL,
  `usename` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `formuse`
--

INSERT INTO `formuse` (`id`, `usename`) VALUES
(1, 'Эзэмших'),
(2, 'Өмчлөх');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `imagename` varchar(50) NOT NULL,
  `imgCode` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `intent`
--

CREATE TABLE `intent` (
  `id` int(11) NOT NULL,
  `intent` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `intent`
--

INSERT INTO `intent` (`id`, `intent`) VALUES
(1, 'Гэр бүлийн хэрэгцээний'),
(2, 'Үйлдвэрийн зориулалттай'),
(3, 'Үйлчилгээний зориулалттай'),
(4, 'Орон сууцны зориулалттай'),
(5, 'Аялал жуулчлал');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `image` varchar(50) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(190) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `image`, `name`, `phone`, `email`, `password`) VALUES
(1, 'default.png', 'Оогий', '90990918', 'badarch.ogino@gmail.com', 'a9892e8c24fb80e26a4dd020e5f968f3d17043ae023f9cb3c55b08dacba18d95');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `payment_id` varchar(50) NOT NULL,
  `amount` double NOT NULL,
  `paid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `special` int(11) NOT NULL,
  `image` varchar(30) NOT NULL,
  `video` varchar(100) NOT NULL,
  `coord` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `district` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `propertyId` varchar(30) NOT NULL,
  `types` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `formUse` int(11) NOT NULL,
  `member` int(11) NOT NULL,
  `approved` tinyint(1) NOT NULL,
  `approvedEmp` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `intent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `size` varchar(20) NOT NULL,
  `sizeTitle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `size`, `sizeTitle`) VALUES
(1, '500 мкв хүртэл', '0.05 га хүртэл'),
(2, '500-1.000 мкв хүртэл', '0.1 га хүртэл'),
(3, '1.001-5.000 мкв хүрт', '0.5 га хүртэл'),
(4, '5.001-20.000 мкв хүр', '2 га хүртэл'),
(5, '20.001-100.000 мкв х', '10 га хүртэл'),
(6, '100.001 мкв-с дээш', '10 га-с дээш');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `typename` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `typename`) VALUES
(1, 'Үл хөдлөх хөрөнгөтэй газар'),
(2, 'Үл хөдлөх хөрөнгөгүй газар');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coord`
--
ALTER TABLE `coord`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formuse`
--
ALTER TABLE `formuse`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `intent`
--
ALTER TABLE `intent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coord`
--
ALTER TABLE `coord`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `formuse`
--
ALTER TABLE `formuse`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `intent`
--
ALTER TABLE `intent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

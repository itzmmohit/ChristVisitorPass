-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2023 at 09:19 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs-login`
--

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`id`, `name`, `email`, `password`) VALUES
(1, 'Teacher', 't@g.com', '$2a$08$G4uUVMX4JsnOYm4GTbchvu/PFx13TlUI1KnYKiNchcfrjVFwk7rLC'),
(2, 'Dawn', 'd@g.com', '$2a$08$2Qv/G9EUnoiLn0zq..AWTuqJNjRIWGw.Fu83kmyibzsyjuPmfjhLa'),
(3, 'Teacher', 'Teacher@g.com', '$2a$08$LO0XYqYs0BLyDFGMr2/Vsukrq9AXZrw8.FAVLvPkO1RwmXhcz4RY.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(3, 'aa', 'aa', '$2a$08$yJzQKgdg/KS9JCGFjbmUlucVyOz1ME9B623rrEYTpw4/mK.H.MndS'),
(4, 'aaron', 'aaron@gmail.com', '$2a$08$3D0GShO5JznCAD5FanKybu4xDOvcllQDA7mKQ69XUXFkGKbecgp2.'),
(5, 'ron', 'hello@g.com', '$2a$08$PMXdD.ey6zyid0bAEBn4eetIFL4F35Es2LgPCDpopV8S7ihnJsyvW'),
(6, '1233', '1212@1323.com', '$2a$08$yfdSNn/WveREXxkBUlGS3uq2DIYCBq9x.slTBCdmLvegwdjllHe.m'),
(8, 'aa', 'a@g.com', '$2a$08$h6J3Z2UHvOz/lshNOdh8ROqlPWIiOQNgYibLFPVTowkrbRF.iy81W'),
(10, 'Mohit', 'm@gmail.com', '$2a$08$7F6/BcTMWAB1NwK3wlv/E.MknO59..bjBlG2Rta4LCG4Z0P5hCP.i'),
(11, 'ma@gmail.com', 'ma@gmail.com', '$2a$08$VkNBR.v2BB0xvPcGmQg.Y.fyTMagiMQCoxIq92cy2yFWlFSKHquEa'),
(12, 'aaaa@g.com', 'aaaa@g.com', '$2a$08$3690QAgGecj2VpGjQU5IjuxRpnUtcTp3LMubJKXfXu9s39Fsa1X76'),
(13, 'dfv', 'sd@f.com', '$2a$08$GO1KlDbjHc1xmOzBN2E8ceVlx8s0PcZVMl4.hcsny47rLLhEi1H3G'),
(14, 'fb', 'sdgv@g.com', '$2a$08$5zTKN9hZ5VAHmFJQwcxi3.QDboSMHSZIiocrm/V4CJxUpnJKzOJjS'),
(16, 'Alen', 'alen@g.com', '$2a$08$Rztia2YzZP4u7V4i7dv5muFV5fbfeK58j9mqud7RIsuGmcLJToQ0K'),
(17, 'Jay', 'j@g.com', '$2a$08$tDoaVkLOLoFoSikymK3PvuzS1KbbOYOg7d9gVRX1gX/hRMC2Vr9Di'),
(18, 'am', 'am@g.com', '$2a$08$Rrzn06OXswIMn72hQWeMu.jft.8FqCGnVMn.KogBXkGBIHwKRd86m'),
(19, 'Boy', 'bb@gmail.com', '$2a$08$uSYuZn7O8wOoXRKcXl.dkOlzohLMTFMDFPb8HVBVxxFZ03bdLg/5m'),
(20, 'CHRIST', 'c@g.com', '$2a$08$UWu/ObSr7OL07MpOxcRd7em/HbXWmJpUu5t23adceg8bsdo5xggg.'),
(21, 'Hans', 'h@gmail.com', '$2a$08$M02fofH1hvRjDOuctE7VTumGIduWDat8U4DX73MyPZH0cqFL5fOVS'),
(22, 'David', 'd@gmail.com', '$2a$08$cnuoNj6ZRPela1KtFalLaOAxxlZ1uUWDlECv8NG/LjFzXgWgsbrpq'),
(23, 'jOS', 'jos@g.com', '$2a$08$vpJ0WCu2fA4Yx/CQywJBYerRe3Y86RnS9FE5g9Num.ycb4BSGNCBu');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `visit_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `purpose` varchar(20) NOT NULL,
  `checkIn` timestamp NOT NULL DEFAULT current_timestamp(),
  `checkOut` timestamp NULL DEFAULT NULL,
  `location` varchar(50) NOT NULL,
  `peopleCount` int(11) NOT NULL,
  `licenseNo` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pending',
  `profile_image` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'Vehicle'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`visit_id`, `name`, `phone`, `email`, `purpose`, `checkIn`, `checkOut`, `location`, `peopleCount`, `licenseNo`, `status`, `profile_image`, `type`) VALUES
(1, 'ef', '12121', '1212@rg.com', 'Guest', '2023-04-12 04:54:26', '2023-04-13 07:07:57', 'Block II', 3, '0', 'Approved', 'pic1.png', 'Vehicle'),
(2, 'fef', '12121', '1212@rg.com', 'Guest', '2023-04-12 05:00:18', NULL, 'Block II', 3, 'lmwgewg', 'Rejected', 'pic1.png', 'Vehicle'),
(3, 'qwfewg', '12121', '1212@rg.com', 'Guest', '2023-04-12 05:00:45', NULL, 'Block II', 3, '0', 'Approved', 'pic1.png', 'Vehicle'),
(4, 'wef', '12121', '1212@rg.com', 'Guest', '2023-04-12 05:01:53', NULL, 'Block II', 3, 'KM23131313', 'Pending', 'pic1.png', 'Vehicle'),
(5, 'wef', '12121', '1212@rg.com', 'Guest', '2023-04-12 05:01:53', NULL, 'Block II', 3, 'KM23131313', 'Approved', 'pic1.png', 'Vehicle'),
(6, 'sfgv', '2323', 'efg@gmail.com', 'Fest', '2023-04-12 05:16:25', NULL, 'Bank', 2, '1fv123', 'Approved', 'pic1.png', 'Vehicle');

-- --------------------------------------------------------

--
-- Table structure for table `visit`
--

CREATE TABLE `visit` (
  `visit_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `purpose` varchar(20) NOT NULL,
  `checkIn` timestamp NOT NULL DEFAULT current_timestamp(),
  `checkOut` timestamp NULL DEFAULT NULL,
  `location` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pending',
  `profile_image` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'Person'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `visit`
--

INSERT INTO `visit` (`visit_id`, `name`, `phone`, `email`, `purpose`, `checkIn`, `checkOut`, `location`, `status`, `profile_image`, `type`) VALUES
(1034, 'Roy', '7012395607', 'a@g.com', 'Bank', '2023-03-17 06:55:53', NULL, 'Block I', 'Approved', 'passport_photo.jpg', 'Person'),
(1039, 'Aaron Matt', '7012395207', 'fg@gmail.com', 'Fest', '2023-03-24 05:54:01', NULL, 'Block I', 'Rejected', '', 'Person'),
(1040, 'Alen', '3245325512', 'gaga@gmail.com', 'Fest', '2023-03-24 08:47:16', NULL, 'Bank', 'Approved', '', 'Person'),
(1041, 'Mohit', '23235151', 'med@gmail.com', 'Bank', '2023-03-24 08:49:37', NULL, 'Bank', 'Approved', '', 'Person'),
(1042, 'Acsah Shaji', '7012395207', 'aaronmshaji@gmail.com', 'Fest', '2023-03-26 08:12:06', NULL, 'Bank', 'Approved', 'the_numbers.png', 'Person'),
(1059, 'Aa', '788', 'nsjs@ff.com', 'Admission', '2023-03-26 12:11:55', NULL, 'Bank', 'Approved', '16798318108073842064731332893868.jpg', 'Person'),
(1060, 'Aadujs', '788', 'nsjs@ff.com', 'Admission', '2023-03-26 12:13:15', NULL, 'Bank', 'Approved', '16798327790873718971608979119992.jpg', 'Person'),
(1061, 'Fms', '788778', 'nsjs@ff.com', 'Fest', '2023-03-26 12:22:18', NULL, 'Bank', 'Pending', '16798333185122986514021320564656.jpg', 'Person'),
(1062, 'Fms', '788778', 'nsjs@ff.com', 'Fest', '2023-03-26 12:23:11', NULL, 'Bank', 'Rejected', '16798333185122986514021320564656.jpg', 'Person'),
(1063, 'Fms', '07012395207', 'nsjs@ff.com', 'Guest', '2023-03-26 12:27:09', NULL, 'Bank', 'Rejected', '16798336198831433544808713728177.jpg', 'Person'),
(1064, 'Fms', '07012395207', 'nsjs@ff.com', 'Guest', '2023-03-26 12:27:35', NULL, 'Bank', 'Approved', '16798336198831433544808713728177.jpg', 'Person'),
(1065, 'Am', 'Jdjs', 'nsjs@ff.com', 'Fest', '2023-03-26 12:32:50', NULL, 'Bank', 'Rejected', '16798339619712808272012451889335.jpg', 'Person'),
(1066, 'Am', 'Jdjs', 'nsjs@ff.com', 'Fest', '2023-03-26 13:08:10', NULL, 'Bank', 'Approved', '16798339619712808272012451889335.jpg', 'Person'),
(1067, 'Fms', '07012395207', 'sdj@djdj.com', 'Bank', '2023-03-28 09:07:48', NULL, 'Bank', 'Approved', '16799944586564885192000283898581.jpg', 'Person'),
(1070, 'Someoewnf', '1323131', 'sfe@fwegf.com', 'Bank', '2023-03-31 06:18:48', '2023-04-13 07:07:42', 'Bank', 'Rejected', 'bgfile.jpg', 'Person'),
(1071, 'Alen K', '231243124', 'g@fsg.com', 'Bank', '2023-03-31 10:45:07', NULL, 'Block I', 'Approved', '', 'Person'),
(1072, 'Aa', '13131', 'wet3w@erkgm.com', 'Fest', '2023-03-31 10:50:03', NULL, 'Bank', 'Approved', 'E (4).png', 'Person'),
(1073, 'Matt', '24515125', 'wef@dhb.com', 'Admission', '2023-03-31 15:18:43', NULL, 'Block I', 'Approved', '', 'Person'),
(1074, 'ewfwef', '12412414', 'wfw@sgsg.com', 'Bank', '2023-03-31 15:19:03', NULL, 'Bank', 'Approved', '', 'Person'),
(1075, 'Honai', '7483932', 'hdjs@ejisi.com', 'Guest', '2023-03-31 15:21:35', NULL, 'Block III', 'Approved', '16802760703204117833168303146915.jpg', 'Person'),
(1076, 'Saiyan', '7483932', 'hdjs@ejisi.com', 'Guest', '2023-03-31 15:26:17', NULL, 'Block III', 'Rejected', '16802760703204117833168303146915.jpg', 'Person'),
(1077, 'Hanma', '23523552', 'sdgv@dfhd.com', 'Bank', '2023-03-31 15:30:31', NULL, 'Bank', 'Pending', '', 'Person'),
(1078, 'Sawyer', '3828829', 'jsjsk@sjwiwo.com', 'Admission', '2023-03-31 15:32:20', NULL, 'Block III', 'Rejected', '16802767245894337024180167579581.jpg', 'Person'),
(1079, 'Goku', '2352352', 'ergerg@rge.com', 'Admission', '2023-03-31 15:33:44', '2023-04-13 06:50:04', 'Block I', 'Approved', '', 'Person'),
(1080, 'Gohan', '3252326', 'aerges@srg.com', 'Guest', '2023-03-31 15:35:55', NULL, 'Block I', 'Rejected', '', 'Person'),
(1081, 'Bulma', '343253253', 'grr@ergr.com', 'Bank', '2023-03-31 15:36:32', NULL, 'Bank', 'Rejected', '', 'Person'),
(1082, 'Apoorva ', '235266', 'df@gr.com', 'Fest', '2023-04-01 03:59:54', NULL, 'Block I', 'Approved', '', 'Person'),
(1083, 'Mohit M', '38393', 'jdjs@dkek.com', 'Guest', '2023-04-01 04:02:49', NULL, 'Block III', 'Approved', '16803217545314180807356113525498.jpg', 'Person'),
(1085, 'Prajwal', '27388484', 'sjiw@djsi.com', 'Fest', '2023-04-01 04:22:03', NULL, 'Block III', 'Approved', '16803229060675842480198655055026.jpg', 'Person'),
(1086, 'Hshs', '67788', 'nsjs@ff.com', 'Fest', '2023-04-01 05:55:30', NULL, 'Block II', 'Pending', '16803284779342567686189697538162.jpg', 'Person'),
(1087, 'Hdjsj', '383883', 'dje@djej.com', 'Admission', '2023-04-01 05:55:53', NULL, 'Block I', 'Approved', '16803285396038603803864178833691.jpg', 'Person'),
(1088, 'Sai', '38382', 'jsjsk@sjwiwo.com', 'Admission', '2023-04-01 06:23:37', NULL, 'Bank', 'Rejected', '16803301973263294790186738372669.jpg', 'Person'),
(1089, 'ewg', '131331', 'dfb@dfg.com', 'Bank', '2023-04-01 06:24:36', NULL, 'Bank', 'Approved', '', 'Person'),
(1090, 'Parth', '382882', 'aaa@gmail.com', 'Fest', '2023-04-01 06:53:01', NULL, 'Block II', 'Approved', '16803319674293802706072441346182.jpg', 'Person'),
(1091, 'Son', '382882', 'aaa@gmail.com', 'Fest', '2023-04-01 06:54:58', NULL, 'Block II', 'Rejected', '16803320787571719016314902071308.jpg', 'Person'),
(1093, 'Joseph Georg ', '070123952033', 'ds@dekk.xom', 'Admission', '2023-04-09 08:26:50', NULL, 'Block II', 'Approved', '16810287995284308237985985449583.jpg', 'Person'),
(1094, 'Mohit Mehta', '9999999999', 'm@gmail.com', 'Bank', '2023-04-13 07:18:45', '2023-04-13 07:19:08', 'Bank', 'Approved', 'BF-MX1000 Piano.jpg', 'Person');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`visit_id`);

--
-- Indexes for table `visit`
--
ALTER TABLE `visit`
  ADD PRIMARY KEY (`visit_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `visit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `visit`
--
ALTER TABLE `visit`
  MODIFY `visit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1095;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

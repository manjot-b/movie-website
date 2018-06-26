-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql3.freesqldatabase.com
-- Generation Time: Jun 26, 2018 at 04:07 AM
-- Server version: 5.5.54-0ubuntu0.12.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql3243810`
--

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `likes` int(225) DEFAULT NULL,
  `dislikes` int(225) DEFAULT NULL,
  `date_created` date NOT NULL,
  `review_username` varchar(20) NOT NULL,
  `review_media_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `review_text` varchar(100) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`likes`, `dislikes`, `date_created`, `review_username`, `review_media_id`, `id`, `review_text`, `rating`) VALUES
(NULL, NULL, '2018-06-22', 'manjotbal', 1, 1, 'Really great movie. I liked the action!', 9),
(NULL, NULL, '2018-06-26', 'micotran', 1, 9, 'i like this', 3),
(NULL, NULL, '2018-06-26', 'micotran', 3, 10, 'coolest movie ever', 8),
(NULL, NULL, '2018-06-26', 'manjotbal', 2, 11, 'What about how I met your father?', 2),
(NULL, NULL, '2018-06-26', 'manjotbal', 4, 12, 'spider man!!!!', 10),
(NULL, NULL, '2018-06-26', 'micotran', 5, 13, 'my fav', 7),
(NULL, NULL, '2018-06-26', 'blah1', 1, 14, 'what\'re you sayin brooo? perfect SCORE!', 10),
(NULL, NULL, '2018-06-26', 'blah1', 7, 15, 'I loved it, watched it 20 times.', 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_ibfk_1` (`review_username`),
  ADD KEY `review_ibfk_2` (`review_media_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`review_username`) REFERENCES `users` (`users_username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`review_media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

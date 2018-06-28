-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql3.freesqldatabase.com
-- Generation Time: Jun 28, 2018 at 07:19 PM
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
-- Database: `sql3245104`
--
CREATE DATABASE IF NOT EXISTS `sql3245104` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sql3245104`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_username`) VALUES
('jonamik_'),
('user_one');

-- --------------------------------------------------------

--
-- Table structure for table `cast`
--

DROP TABLE IF EXISTS `cast`;
CREATE TABLE `cast` (
  `id` int(225) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cast`
--

INSERT INTO `cast` (`id`, `name`) VALUES
(1, 'Robert Downey Jr.'),
(2, 'Chadwick Boseman'),
(3, 'Josh Radnor'),
(4, 'Jennifer Aniston'),
(5, 'Tom Holland'),
(6, 'Chris Hemsworth'),
(7, 'Mark Ruffalo'),
(8, 'Michael B. Jordan'),
(9, 'Lupita Nyong\'o '),
(10, 'Jason Segel'),
(11, 'Cobie Smulders '),
(12, 'Courteney Cox'),
(13, 'Lisa Kudrow'),
(14, 'Michael Keaton'),
(15, 'Tom Hanks'),
(16, 'Robin Wright'),
(17, 'Gary Sinise'),
(18, 'Rachel McAdams'),
(19, 'Ryan Gosling'),
(20, 'Gina Rodriguez'),
(21, 'Andrea Navedo'),
(22, 'Yael Grobglas ');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `date_created` date NOT NULL,
  `comment_text` varchar(500) NOT NULL,
  `review_id` int(11) NOT NULL,
  `username_comment` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`date_created`, `comment_text`, `review_id`, `username_comment`) VALUES
('2018-06-28', 'i know right?', 1, 'micotran'),
('2018-06-28', 'maybe', 4, 'manjotbal'),
('2018-06-28', 'r u comedian?', 4, 'micotran'),
('2018-06-28', 'it was pretty ok...', 6, 'manjotbal');

-- --------------------------------------------------------

--
-- Table structure for table `contains`
--

DROP TABLE IF EXISTS `contains`;
CREATE TABLE `contains` (
  `list_media_id` int(11) NOT NULL,
  `list_name` varchar(40) NOT NULL,
  `list_username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contains`
--

INSERT INTO `contains` (`list_media_id`, `list_name`, `list_username`) VALUES
(2, 'Stuff to Watch', 'manjotbal'),
(3, 'favs', 'manjotbal'),
(3, 'Stuff to Watch', 'manjotbal'),
(4, 'favs', 'manjotbal'),
(4, 'Already Watched', 'micotran'),
(5, 'Already Watched', 'micotran');

-- --------------------------------------------------------

--
-- Table structure for table `friends_with`
--

DROP TABLE IF EXISTS `friends_with`;
CREATE TABLE `friends_with` (
  `user1_username` varchar(20) NOT NULL,
  `user2_username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends_with`
--

INSERT INTO `friends_with` (`user1_username`, `user2_username`) VALUES
('blah1', 'manjotbal'),
('manjotbal', 'micotran');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`id`, `name`) VALUES
(1, 'Action'),
(2, 'Comedy'),
(3, 'Drama'),
(4, 'Thriller'),
(5, 'Horror');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` int(15) NOT NULL,
  `name` varchar(40) NOT NULL,
  `year` int(4) NOT NULL,
  `description` varchar(500) NOT NULL,
  `avg_rating` float DEFAULT NULL,
  `admin_un_added` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `name`, `year`, `description`, `avg_rating`, `admin_un_added`) VALUES
(1, 'Avengers: Infinity War', 2018, ' The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe. ', 7.4, 'jonamik_'),
(2, 'How I Met Your Mother', 2005, ' A father recounts to his children, through a series of flashbacks, the journey he and his four best friends took leading up to him meeting their mother. ', 4, 'jonamik_'),
(3, 'Black Panther', 2018, 'T\'Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation, but his claim is challenged by a vengeful outsider who was a childhood victim of T\'Challa\'s father\'s mistake. ', NULL, 'jonamik_'),
(4, 'Spider-Man: Homecoming', 2017, 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City. ', 10, 'jonamik_'),
(5, 'Friends', 1994, 'Follows the personal and professional lives of six 20 to 30-something-year-old friends living in Manhattan. ', 8, 'jonamik_'),
(6, 'Forrest Gump', 1994, 'The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75. ', NULL, 'jonamik_'),
(7, 'The Notebook', 2004, 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. ', 7, 'jonamik_'),
(8, 'Jane the Virgin', 2014, 'A young, devout Catholic woman discovers that she was accidentally artificially inseminated. ', NULL, 'user_one');

-- --------------------------------------------------------

--
-- Table structure for table `media_cast`
--

DROP TABLE IF EXISTS `media_cast`;
CREATE TABLE `media_cast` (
  `media_id` int(11) NOT NULL,
  `cast_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `media_cast`
--

INSERT INTO `media_cast` (`media_id`, `cast_id`) VALUES
(1, 1),
(4, 1),
(3, 2),
(2, 3),
(5, 4),
(4, 5),
(1, 6),
(1, 7),
(3, 8),
(3, 9),
(2, 10),
(2, 11),
(5, 12),
(5, 13),
(4, 14),
(6, 15),
(6, 16),
(6, 17),
(7, 18),
(7, 19),
(8, 20),
(8, 21),
(8, 22);

-- --------------------------------------------------------

--
-- Table structure for table `media_genre`
--

DROP TABLE IF EXISTS `media_genre`;
CREATE TABLE `media_genre` (
  `media_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `media_genre`
--

INSERT INTO `media_genre` (`media_id`, `genre_id`) VALUES
(1, 1),
(3, 1),
(4, 1),
(2, 2),
(4, 2),
(5, 2),
(8, 2),
(6, 3),
(7, 3),
(8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `media_list`
--

DROP TABLE IF EXISTS `media_list`;
CREATE TABLE `media_list` (
  `name` varchar(40) NOT NULL,
  `user_username` varchar(20) NOT NULL,
  `date_last_updated` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `media_list`
--

INSERT INTO `media_list` (`name`, `user_username`, `date_last_updated`) VALUES
('Already Watched', 'micotran', '2018-06-20'),
('Stuff to Watch', 'manjotbal', '2018-06-13');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `director` varchar(50) NOT NULL,
  `movie_media_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`director`, `movie_media_id`) VALUES
('Anthony Russo', 1),
('Ryan Coogler', 3),
('Jon Watts', 4),
(' David Crane', 5),
(' Robert Zemeckis ', 6),
('Nick Cassavetes', 7);

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
CREATE TABLE `people` (
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`username`, `email`, `password`, `first_name`, `last_name`) VALUES
('blah1', 'blah@email.com', 'sads', 'blah', 'blahh'),
('jonamik_', 'jmag211@hotmai.ca', 'password', 'jona', 'grageda'),
('manjotbal', 'manjot.bal@ucalgary.ca', 'password2', 'manjot', 'bal'),
('micotran', 'micopaul.tran@ucalgary.ca', 'password1', 'mico', 'tran'),
('user_one', 'user.one@gmail.com', 'userpassword', 'One', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `date_created` date NOT NULL,
  `review_username` varchar(20) NOT NULL,
  `review_media_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `review_text` varchar(500) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`date_created`, `review_username`, `review_media_id`, `id`, `review_text`, `rating`) VALUES
('2018-06-28', 'manjotbal', 1, 1, 'cool movie!', 9),
('2018-06-28', 'manjotbal', 7, 2, 'Was this even a movie?', 7),
('2018-06-28', 'manjotbal', 4, 3, 'Spider MAN!!!!', 10),
('2018-06-28', 'manjotbal', 2, 4, 'What about how I met your father?', 4),
('2018-06-28', 'micotran', 1, 5, 'jam packed with action!', 7),
('2018-06-28', 'micotran', 5, 6, 'I love this show!!!!', 8);

-- --------------------------------------------------------

--
-- Table structure for table `tv_show`
--

DROP TABLE IF EXISTS `tv_show`;
CREATE TABLE `tv_show` (
  `creator` varchar(40) NOT NULL,
  `show_media_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tv_show`
--

INSERT INTO `tv_show` (`creator`, `show_media_id`) VALUES
('Carter Bays', 2),
(' David Crane', 5),
('Jennie Snyder Urman', 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `users_username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_username`) VALUES
('blah1'),
('manjotbal'),
('micotran');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_username`);

--
-- Indexes for table `cast`
--
ALTER TABLE `cast`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`review_id`,`username_comment`),
  ADD KEY `comment_ibfk_2` (`username_comment`);

--
-- Indexes for table `contains`
--
ALTER TABLE `contains`
  ADD PRIMARY KEY (`list_media_id`,`list_name`,`list_username`),
  ADD KEY `list_name` (`list_name`),
  ADD KEY `list_username` (`list_username`);

--
-- Indexes for table `friends_with`
--
ALTER TABLE `friends_with`
  ADD PRIMARY KEY (`user1_username`,`user2_username`),
  ADD KEY `friends_with_ibfk_2` (`user2_username`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_exists` (`admin_un_added`);

--
-- Indexes for table `media_cast`
--
ALTER TABLE `media_cast`
  ADD PRIMARY KEY (`media_id`,`cast_id`),
  ADD KEY `cast_id` (`cast_id`);

--
-- Indexes for table `media_genre`
--
ALTER TABLE `media_genre`
  ADD PRIMARY KEY (`media_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_media_id`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_media_id` (`review_media_id`),
  ADD KEY `review_ibfk_1` (`review_username`);

--
-- Indexes for table `tv_show`
--
ALTER TABLE `tv_show`
  ADD PRIMARY KEY (`show_media_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cast`
--
ALTER TABLE `cast`
  MODIFY `id` int(225) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`admin_username`) REFERENCES `people` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`username_comment`) REFERENCES `users` (`users_username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contains`
--
ALTER TABLE `contains`
  ADD CONSTRAINT `contains_ibfk_1` FOREIGN KEY (`list_media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `friends_with`
--
ALTER TABLE `friends_with`
  ADD CONSTRAINT `friends_with_ibfk_1` FOREIGN KEY (`user1_username`) REFERENCES `users` (`users_username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `friends_with_ibfk_2` FOREIGN KEY (`user2_username`) REFERENCES `users` (`users_username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `admin_exists` FOREIGN KEY (`admin_un_added`) REFERENCES `admin` (`admin_username`) ON UPDATE CASCADE;

--
-- Constraints for table `media_cast`
--
ALTER TABLE `media_cast`
  ADD CONSTRAINT `media_cast_ibfk_2` FOREIGN KEY (`cast_id`) REFERENCES `cast` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `media_cast_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `media_genre`
--
ALTER TABLE `media_genre`
  ADD CONSTRAINT `media_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `media_genre_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`movie_media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`review_media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`review_username`) REFERENCES `users` (`users_username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tv_show`
--
ALTER TABLE `tv_show`
  ADD CONSTRAINT `tv_show_ibfk_1` FOREIGN KEY (`show_media_id`) REFERENCES `media` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`users_username`) REFERENCES `people` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

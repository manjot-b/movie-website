-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: Sql3.freesqldatabase.com
-- Generation Time: Jun 21, 2018 at 01:35 AM
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
-- Table structure for table `admin`
--

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

CREATE TABLE `comment` (
  `date_created` date NOT NULL,
  `comment_text` varchar(500) NOT NULL,
  `review_id` int(11) NOT NULL,
  `username_comment` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `contains`
--

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
(3, 'Stuff to Watch', 'manjotbal'),
(4, 'Already Watched', 'micotran'),
(5, 'Already Watched', 'micotran');

-- --------------------------------------------------------

--
-- Table structure for table `episode`
--

CREATE TABLE `episode` (
  `episode_no` int(200) NOT NULL,
  `season_no` int(20) NOT NULL,
  `episode_show_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `episode`
--

INSERT INTO `episode` (`episode_no`, `season_no`, `episode_show_id`) VALUES
(1, 1, 2),
(1, 1, 5),
(17, 10, 5),
(18, 10, 5),
(1, 1, 8),
(4, 17, 8);

-- --------------------------------------------------------

--
-- Table structure for table `friends_with`
--

CREATE TABLE `friends_with` (
  `user1_username` varchar(20) NOT NULL,
  `user2_username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friends_with`
--

INSERT INTO `friends_with` (`user1_username`, `user2_username`) VALUES
('manjotbal', 'micotran');

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

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
(1, 'Avengers: Infinity War', 2018, ' The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe. ', NULL, 'jonamik_'),
(2, 'How I Met Your Mother', 2005, ' A father recounts to his children, through a series of flashbacks, the journey he and his four best friends took leading up to him meeting their mother. ', NULL, 'jonamik_'),
(3, 'Black Panther', 2018, 'T\'Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation, but his claim is challenged by a vengeful outsider who was a childhood victim of T\'Challa\'s father\'s mistake. ', NULL, 'jonamik_'),
(4, 'Spider-Man: Homecoming', 2017, 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City. ', NULL, 'jonamik_'),
(5, 'Friends', 1994, 'Follows the personal and professional lives of six 20 to 30-something-year-old friends living in Manhattan. ', NULL, 'jonamik_'),
(6, 'Forrest Gump', 1994, 'The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75. ', NULL, 'jonamik_'),
(7, 'The Notebook', 2004, 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences. ', NULL, 'jonamik_'),
(8, 'Jane the Virgin', 2014, 'A young, devout Catholic woman discovers that she was accidentally artificially inseminated. ', NULL, 'user_one');

-- --------------------------------------------------------

--
-- Table structure for table `media_cast`
--

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

CREATE TABLE `media_list` (
  `name` varchar(40) NOT NULL,
  `user_username` varchar(20) NOT NULL,
  `date_last_updated` date NOT NULL
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

CREATE TABLE `people` (
  `username` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`username`, `name`, `email`, `password`) VALUES
('jonamik_', 'jona', 'jmag211@hotmai.ca', 'password'),
('manjotbal', 'manjot', 'manjot.bal@ucalgary.ca', 'password2'),
('micotran', 'mico', 'micopaul.tran@ucalgary.ca', 'password1'),
('user_one', 'One', 'user.one@gmail.com', 'userpassword');

-- --------------------------------------------------------

--
-- Table structure for table `rate`
--

CREATE TABLE `rate` (
  `rate_username` varchar(40) NOT NULL,
  `rate_media_id` int(11) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tv_show`
--

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

CREATE TABLE `users` (
  `users_username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_username`) VALUES
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
-- Indexes for table `episode`
--
ALTER TABLE `episode`
  ADD PRIMARY KEY (`episode_no`,`season_no`,`episode_show_id`),
  ADD KEY `episode_show_id` (`episode_show_id`);

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
-- Indexes for table `media_list`
--
ALTER TABLE `media_list`
  ADD PRIMARY KEY (`name`,`user_username`),
  ADD KEY `media_list_ibfk_1` (`user_username`);

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
-- Indexes for table `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`rate_username`,`rate_media_id`),
  ADD KEY `rate_media_id` (`rate_media_id`);

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
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`admin_username`) REFERENCES `people` (`username`) ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`username_comment`) REFERENCES `users` (`users_username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `contains`
--
ALTER TABLE `contains`
  ADD CONSTRAINT `contains_ibfk_1` FOREIGN KEY (`list_media_id`) REFERENCES `media` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `contains_ibfk_2` FOREIGN KEY (`list_name`) REFERENCES `media_list` (`name`) ON UPDATE CASCADE,
  ADD CONSTRAINT `contains_ibfk_3` FOREIGN KEY (`list_username`) REFERENCES `media_list` (`user_username`) ON UPDATE CASCADE;

--
-- Constraints for table `episode`
--
ALTER TABLE `episode`
  ADD CONSTRAINT `episode_ibfk_1` FOREIGN KEY (`episode_show_id`) REFERENCES `tv_show` (`show_media_id`) ON UPDATE CASCADE;

--
-- Constraints for table `friends_with`
--
ALTER TABLE `friends_with`
  ADD CONSTRAINT `friends_with_ibfk_2` FOREIGN KEY (`user2_username`) REFERENCES `users` (`users_username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `friends_with_ibfk_1` FOREIGN KEY (`user1_username`) REFERENCES `users` (`users_username`) ON UPDATE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `admin_exists` FOREIGN KEY (`admin_un_added`) REFERENCES `admin` (`admin_username`) ON UPDATE CASCADE;

--
-- Constraints for table `media_cast`
--
ALTER TABLE `media_cast`
  ADD CONSTRAINT `media_cast_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `media_cast_ibfk_2` FOREIGN KEY (`cast_id`) REFERENCES `cast` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `media_genre`
--
ALTER TABLE `media_genre`
  ADD CONSTRAINT `media_genre_ibfk_1` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `media_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `media_list`
--
ALTER TABLE `media_list`
  ADD CONSTRAINT `media_list_ibfk_1` FOREIGN KEY (`user_username`) REFERENCES `users` (`users_username`);

--
-- Constraints for table `movie`
--
ALTER TABLE `movie`
  ADD CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`movie_media_id`) REFERENCES `media` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `rate`
--
ALTER TABLE `rate`
  ADD CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`rate_username`) REFERENCES `users` (`users_username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`rate_media_id`) REFERENCES `media` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`review_username`) REFERENCES `users` (`users_username`) ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`review_media_id`) REFERENCES `media` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `tv_show`
--
ALTER TABLE `tv_show`
  ADD CONSTRAINT `tv_show_ibfk_1` FOREIGN KEY (`show_media_id`) REFERENCES `media` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`users_username`) REFERENCES `people` (`username`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

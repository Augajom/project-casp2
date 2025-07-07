-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2025 at 03:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `casp2`
--

-- --------------------------------------------------------

--
-- Table structure for table `affiliations`
--

CREATE TABLE `affiliations` (
  `affiliation_ID` int(255) NOT NULL,
  `affiliation_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `affiliations`
--

INSERT INTO `affiliations` (`affiliation_ID`, `affiliation_name`) VALUES
(1, 'สำนักวิชาศิลปศาสตร์'),
(2, 'สำนักวิชาวิทยาศาสตร์'),
(3, 'สำนักวิชาการจัดการ'),
(4, 'สำนักวิชาเทคโนโลยีดิจิทัลประยุกต์'),
(5, 'สำนักวิชาอุตสาหกรรมเกษตร'),
(6, 'สำนักวิชานิติศาสตร์'),
(7, 'สำนักวิชาวิทยาศาสตร์เครื่องสำอาง'),
(8, 'สำนักวิชาวิทยาศาสตร์สุขภาพ'),
(9, 'สำนักวิชาพยาบาลศาสตร์'),
(10, 'สำนักวิชาเวชศาสตร์ชะลอวัยและฟื้นฟูสุขภาพ'),
(11, 'สำนักวิชาแพทยศาสตร์'),
(12, 'สำนักวิชาทันตแพทยศาสตร์'),
(13, 'สำนักวิชานวัตกรรมสังคม'),
(14, 'สำนักวิชาจีนวิทยา'),
(15, 'สำนักวิชาการแพทย์บูรณาการ'),
(16, 'ศูนย์เครื่องมือวิทยาศาสตร์และเทคโนโลยี'),
(17, 'ศูนย์บรรณสารและสื่อการศึกษา (ห้องสมุด)'),
(18, 'ศูนย์บริการเทคโนโลยีสารสนเทศ'),
(19, 'ศูนย์บริการวิชาการ'),
(20, 'สถาบันอนุรักษ์ พัฒนาทรัพยากรธรรมชาติและสื่งแวดล้อม เพื่อความยั่งยืน'),
(21, 'โรงพยาบาลศูนย์การแพทย์มหาวิทยาลัยแม่ฟ้าหลวง'),
(22, 'สถาบันวิจัยและนวัตกรรม มหาวิทยาลัยแม่ฟ้าหลวง'),
(23, 'ส่วนบริหารงานวิจัย'),
(24, 'ส่วนจัดการทรัพย์สินทางปัญญาและนวัตกรรม'),
(25, 'สถาบันศิลปวัฒนธรรมและอารยธรรมลุ่มน้ำโขง'),
(26, 'สถาบันนวัตกรรมการเรียนรู้มหาวิทยาลัยแม่ฟ้าหลวง'),
(27, 'ส่วนทะเบียนและประมวลผล'),
(28, 'ฝ่ายรับนักศึกษา'),
(29, 'ส่วนพัฒนานักศึกษา'),
(30, 'ส่วนพัฒนาความสัมพันธ์ระหว่างประเทศ'),
(31, 'หน่วยงานส่งเสริมการบริการนักศึกษาเบ็ดเสร็จ (M for U Centre)'),
(32, 'ส่วนประกันคุณภาพการศึกษาและพัฒนาหลักสูตร'),
(33, 'สำนักบัณฑิตศึกษา'),
(34, 'ส่วนจัดหางานและฝึกงานของนักศึกษา'),
(35, 'โรงพยาบาลมหาวิทยาลัยแม่ฟ้าหลวง กรุงเทพมหานคร'),
(36, 'ศูนย์กีฬามหาวิทยาลัยแม่ฟ้าหลวง'),
(37, 'ศูนย์นวัตกรรมสมุนไพรครบวงจร มหาวิทยาลัยแม่ฟ้าหลวง'),
(38, 'วนาศรม'),
(39, 'สถาบันชาและกาแฟ แห่งมหาวิทยาลัยแม่ฟ้าหลวง'),
(40, 'สำนักงานให้คำปรึกษาและช่วยเหลือนักศึกษา'),
(41, 'ส่วนสารบรรณและอํานวยการ'),
(42, 'ส่วนการเจ้าหน้าที่'),
(43, 'ส่วนนโยบายและแผน'),
(44, 'ส่วนการเงินและบัญชี'),
(45, 'ส่วนพัสดุ'),
(46, 'ส่วนประชาสัมพันธ์'),
(47, 'ส่วนอาคารสถานที่'),
(48, 'หน่วยประสานงานมหาวิทยาลัยแม่ฟ้าหลวง กรุงเทพฯ'),
(49, 'ส่วนนิติการ'),
(50, 'สำนักงานสภามหาวิทยาลัย'),
(51, 'หน่วยตรวจสอบภายใน'),
(52, 'สำนักงานจัดการทรัพย์สินและรายได้'),
(53, 'M-Store (ศูนย์หนังสือมหาวิทยาลัยแม่ฟ้าหลวง)'),
(54, 'ผลิตภัณฑ์จากผลงานการวิจัยมหาวิทยาลัยแม่ฟ้าหลวง'),
(55, 'ศูนย์บริการที่พักวนาเวศน์'),
(56, 'ศูนย์บริการอาหารเรือนริมนํ้า'),
(57, 'ศูนย์บริการสุขภาพแบบครบวงจรแห่งภาคเหนือ และอนุภูมิภาคลุ่มแม่น้ำโขง'),
(58, 'ศูนย์ภาษาและวัฒนธรรมจีนสิรินธร'),
(59, 'ศูนย์ความเป็นเลิศทางด้านการวิจัยเชื้อรา'),
(60, 'ศูนย์ความเป็นเลิศด้านนวัตกรรมผลิตภัณฑ์ธรรมชาติ'),
(61, 'ศูนย์ศึกษา วิจัย และปฏิบัติการเพื่อลดปัญหาการเกิดไฟป่า หมอกควันในประเทศและในภูมิภาค'),
(62, 'โครงการจัดตั้งหน่วยความร่วมมือทางวิชาการฝรั่งเศส-อนุภูมิภาคลุ่มแม่นํ้าโขง'),
(63, 'หน่วยจัดการสารสนเทศ');

-- --------------------------------------------------------

--
-- Table structure for table `controls`
--

CREATE TABLE `controls` (
  `control_id` int(255) NOT NULL,
  `control_name` varchar(100) NOT NULL,
  `control_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `controls`
--

INSERT INTO `controls` (`control_id`, `control_name`, `control_status`) VALUES
(1, 'is_open_proposal', 0);

-- --------------------------------------------------------

--
-- Table structure for table `fiscal_years`
--

CREATE TABLE `fiscal_years` (
  `id` int(11) NOT NULL,
  `fiscal_year` varchar(9) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('active','inactive') DEFAULT 'inactive',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(255) NOT NULL,
  `permission_name` varchar(255) NOT NULL,
  `permission_eng_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `permission_name`, `permission_eng_name`) VALUES
(1, 'หัวหน้าคณะบริหารโครงการ (Project Leader)', 'Project Leader'),
(2, 'หัวหน้าหน่วยงาน (Dean/Director/Head)', 'Dean/Director/Head'),
(3, 'คณะกรรมการบริหารฯ  (Academic Services Board of Commitee)', 'Academic Services Board of Commitee'),
(4, 'ผู้ดูแลระบบ (Admin)', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(255) NOT NULL,
  `project_type` int(50) NOT NULL,
  `project_data_ref` int(255) DEFAULT NULL,
  `project_user` int(100) NOT NULL,
  `project_affiliation` int(100) NOT NULL,
  `project_status` int(10) DEFAULT 1,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `send_at` timestamp NULL DEFAULT NULL,
  `fiscal_year` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_committee_comments`
--

CREATE TABLE `project_committee_comments` (
  `pcc_id` int(11) NOT NULL,
  `pcc_project_id` int(11) NOT NULL,
  `pcc_commitee_id` int(11) NOT NULL,
  `pcc_comment` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_data`
--

CREATE TABLE `project_data` (
  `project_data_id` int(255) NOT NULL,
  `project_id` int(100) NOT NULL,
  `project_data_p_1` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`project_data_p_1`)),
  `project_data_p_2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `project_data_p_3` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `project_data_p_4` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `project_data_p_5` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `project_data_p_6` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `project_data_p_7` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_status`
--

CREATE TABLE `project_status` (
  `project_status_id` int(10) NOT NULL,
  `project_status_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `project_status`
--

INSERT INTO `project_status` (`project_status_id`, `project_status_name`) VALUES
(1, 'อยู่ระหว่างจัดทำข้อเสนอโครงการ'),
(2, 'เสนอให้หัวหน้าหน่วยงานพิจารณา'),
(3, 'ตีกลับจากหัวหน้าหน่วยงาน'),
(4, 'เห็นชอบโดยหัวหน้าหน่วยงาน'),
(5, 'ตีกลับจากศูนย์บริการวิชาการ'),
(6, 'เสนอคณะกรรมการบริหารงานบริการวิชาการ'),
(7, 'ไม่อนุมัติ'),
(8, 'อนุมัติ'),
(9, 'อนุมัติเเบบมีเงื่อนไข'),
(10, 'เห็นชอบในหลักการ Major Revision'),
(11, 'เห็นชอบในหลักการ ให้ใช้งบประมาณจากแหล่งอื่น'),
(12, 'เห็นชอบในหลักการ ให้ประชาสัมพันธ์'),
(13, 'เห็นชอบในหลักการ ให้สำรวจกลุ่มเป้าหมาย');

-- --------------------------------------------------------

--
-- Table structure for table `project_timelines`
--

CREATE TABLE `project_timelines` (
  `project_timeline_id` int(255) NOT NULL,
  `project_timeline_projectId` int(255) NOT NULL,
  `project_timeline_status_id` int(255) NOT NULL,
  `project_timeline_comment` varchar(255) DEFAULT NULL,
  `specified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_types`
--

CREATE TABLE `project_types` (
  `project_type_id` int(10) NOT NULL,
  `project_type_name` varchar(20) NOT NULL,
  `project_type_thai_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `project_types`
--

INSERT INTO `project_types` (`project_type_id`, `project_type_name`, `project_type_thai_name`) VALUES
(1, 'Academic_No_Income', 'โครงการบริการวิชาการที่ไม่มีรายได้\n\n'),
(2, 'Academic_With_Income', 'โครงการบริการวิชาการ\nที่มีรายได้จากค่าบริการวิชาการ'),
(3, 'Short_Term_Courses', 'หลักสูตรระยะสั้น\n(ประเภทเทียบเคียงหลักสูตร\nการศึกษา)\n'),
(4, 'Teacher_Student_Dev', 'โครงการบริการวิชาการ\nที่ไม่มีรายได้\nสำหรับพัฒนาครูและนักเรียน\n');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_employeeID` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_roleID` int(255) DEFAULT NULL,
  `user_affiliation` int(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `user_employeeID`, `user_name`, `user_roleID`, `user_affiliation`, `created_at`) VALUES
(1, '6531501120@lamduan.mfu.ac.th', '6531501120', 'Suphamethee Intharalib', 4, 4, '2025-06-18 12:08:05'),
(2, '6531501076@lamduan.mfu.ac.th', '6531501076', 'Paramest Suetrong', NULL, 4, '2025-06-18 12:11:35'),
(3, '6531501068@lamduan.mfu.ac.th', '6531501068', 'Nareerak', NULL, 4, '2025-06-18 12:12:30'),
(41, 'ashiraya.sri@mfu.ac.th', '57364179', 'Ashiraya Utpin', NULL, 19, '2025-06-18 12:53:28'),
(42, 'tapanee.pua@mfu.ac.th', '44340025', 'Tapanee Puapunpattana', NULL, 19, '2025-06-18 12:53:28'),
(43, 'wilawan.cha@mfu.ac.th', '46210125', 'Wilawan Champakaew', NULL, 1, '2025-06-18 12:53:28'),
(44, 'narumon.cha@mfu.ac.th', '50364064', 'Narumon Chantonganun', NULL, 19, '2025-06-18 12:53:28'),
(45, 'patcharin.sri@mfu.ac.th', '55364112', 'Patcharin Srijai', NULL, 19, '2025-06-18 12:53:28'),
(46, 'pinich.mun@mfu.ac.th', '49364109', 'Pinich Mungmek', NULL, 19, '2025-06-18 12:53:28'),
(47, 'weerayut@mfu.ac.th', '51364123', 'Weerayut Wongsupa', NULL, 19, '2025-06-18 12:53:28'),
(48, 'rawiwan.suk@mfu.ac.th', '48364104', 'Rawiwan Sukphol', NULL, 19, '2025-06-18 12:53:28'),
(49, 'piyada.tha@mfu.ac.th', '51364087', 'piyada thananchai', NULL, 19, '2025-06-18 12:53:28'),
(50, 'rattana.moo@mfu.ac.th', '59364202', 'rattana moontree', NULL, 19, '2025-06-18 12:53:28'),
(51, 'kamolchanok.kho@mfu.ac.th', '48364070', 'kamolchanok Khomkaew', NULL, 19, '2025-06-18 12:53:28'),
(52, 'darunan@mfu.ac.th', '52364025', 'Darunan Nanta', NULL, 19, '2025-06-18 12:53:28'),
(53, 'khaunnapa.kae@mfu.ac.th', '58364006', 'Khaunnapa Kaewart', NULL, 19, '2025-06-18 12:53:28'),
(54, 'tanyarat.sri@mfu.ac.th', '67364041', 'Tanyarat Srikhong', NULL, 19, '2025-06-18 12:53:28'),
(55, 'pattita.thu@mfu.ac.th', '48364028', 'Pattita Thungkaew', NULL, 19, '2025-06-18 12:53:28'),
(56, 'kwansuda@mfu.ac.th', '51364025', 'Kwansuda Vongleasagoon', NULL, 19, '2025-06-18 12:53:28'),
(57, 'onnicha.jam@mfu.ac.th', '67364058', 'Onnicha Jampakaew', NULL, 19, '2025-06-18 12:53:28'),
(58, 'noppakan@mfu.ac.th', '8888888', 'นายนพกานต์ พินิจ', NULL, 19, '2025-06-18 12:53:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_access`
--

CREATE TABLE `user_access` (
  `access_id` int(255) NOT NULL,
  `access_user` int(255) NOT NULL,
  `access_permission` int(255) DEFAULT NULL,
  `access_isActive` tinyint(1) NOT NULL DEFAULT 1,
  `update_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_access`
--

INSERT INTO `user_access` (`access_id`, `access_user`, `access_permission`, `access_isActive`, `update_at`) VALUES
(1, 1, 4, 1, '2025-06-18 12:10:42.000000'),
(2, 1, 1, 1, '2025-06-18 12:11:16.073321'),
(3, 1, 2, 1, '2025-06-18 12:11:17.462222'),
(4, 1, 3, 1, '2025-06-18 12:11:19.013212'),
(5, 2, 1, 1, '2025-06-18 12:59:59.177841'),
(6, 2, 2, 1, '2025-06-18 12:11:41.733161'),
(7, 2, 3, 1, '2025-06-18 12:11:42.794526'),
(8, 2, 4, 1, '2025-06-18 12:11:45.200473'),
(9, 3, 1, 1, '2025-06-18 12:12:30.380527'),
(10, 3, 2, 1, '2025-06-18 12:12:37.051174'),
(11, 3, 3, 1, '2025-06-18 12:12:38.113696'),
(12, 3, 4, 1, '2025-06-18 12:12:39.295076'),
(87, 41, 1, 1, '2025-06-18 12:53:28.606599'),
(88, 41, 4, 1, '2025-06-18 12:53:28.609153'),
(89, 42, 1, 1, '2025-06-18 12:53:28.613096'),
(90, 42, 3, 1, '2025-06-18 12:53:28.614953'),
(91, 43, 2, 1, '2025-06-18 12:53:28.618230'),
(92, 43, 3, 1, '2025-06-18 12:53:28.619844'),
(93, 44, 1, 1, '2025-06-18 12:53:28.623096'),
(94, 44, 4, 1, '2025-06-18 12:53:28.624482'),
(95, 45, 1, 1, '2025-06-18 12:53:28.627661'),
(96, 45, 4, 1, '2025-06-18 12:53:28.629005'),
(97, 46, 1, 1, '2025-06-18 12:53:28.631819'),
(98, 46, 3, 1, '2025-06-18 12:53:28.633018'),
(99, 47, 1, 1, '2025-06-18 12:53:28.636108'),
(100, 48, 2, 1, '2025-06-18 12:53:28.638927'),
(101, 48, 3, 1, '2025-06-18 12:53:28.640561'),
(102, 49, 1, 1, '2025-06-18 12:53:28.644560'),
(103, 50, 1, 1, '2025-06-18 12:53:28.647579'),
(104, 51, 1, 1, '2025-06-18 12:53:28.650081'),
(105, 51, 4, 1, '2025-06-18 12:53:28.651340'),
(106, 52, 2, 1, '2025-06-18 12:53:28.654052'),
(107, 52, 3, 1, '2025-06-18 12:53:28.655490'),
(108, 53, 1, 1, '2025-06-18 12:53:28.658229'),
(109, 53, 4, 1, '2025-06-18 12:53:28.659473'),
(110, 54, 1, 1, '2025-06-18 12:53:28.662740'),
(111, 54, 3, 1, '2025-06-18 12:53:28.664406'),
(112, 55, 1, 1, '2025-06-18 12:53:28.667198'),
(113, 55, 4, 1, '2025-06-18 12:53:28.668476'),
(114, 56, 2, 1, '2025-06-18 12:53:28.671293'),
(115, 56, 3, 1, '2025-06-18 12:53:28.673216'),
(116, 57, 1, 1, '2025-06-18 12:53:28.677250'),
(117, 57, 4, 1, '2025-06-18 12:53:28.678626'),
(118, 58, 1, 1, '2025-06-18 12:53:28.681383'),
(119, 58, 2, 1, '2025-06-18 12:53:28.682714'),
(120, 58, 3, 1, '2025-06-18 12:53:28.684061'),
(121, 58, 4, 1, '2025-06-18 12:53:28.685535');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `affiliations`
--
ALTER TABLE `affiliations`
  ADD PRIMARY KEY (`affiliation_ID`);

--
-- Indexes for table `controls`
--
ALTER TABLE `controls`
  ADD PRIMARY KEY (`control_id`);

--
-- Indexes for table `fiscal_years`
--
ALTER TABLE `fiscal_years`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `fk_project_type` (`project_type`),
  ADD KEY `fk_project_ref` (`project_data_ref`),
  ADD KEY `fk_project_user` (`project_user`),
  ADD KEY `fk_project_affiliation` (`project_affiliation`),
  ADD KEY `fk_project_status` (`project_status`);

--
-- Indexes for table `project_committee_comments`
--
ALTER TABLE `project_committee_comments`
  ADD PRIMARY KEY (`pcc_id`),
  ADD KEY `pk_project_id` (`pcc_project_id`),
  ADD KEY `fk_committee_id` (`pcc_commitee_id`);

--
-- Indexes for table `project_data`
--
ALTER TABLE `project_data`
  ADD PRIMARY KEY (`project_data_id`),
  ADD KEY `fk_project_id` (`project_id`);

--
-- Indexes for table `project_status`
--
ALTER TABLE `project_status`
  ADD PRIMARY KEY (`project_status_id`);

--
-- Indexes for table `project_timelines`
--
ALTER TABLE `project_timelines`
  ADD PRIMARY KEY (`project_timeline_id`),
  ADD KEY `fk_status_id` (`project_timeline_status_id`),
  ADD KEY `fk_project_id` (`project_timeline_projectId`);

--
-- Indexes for table `project_types`
--
ALTER TABLE `project_types`
  ADD PRIMARY KEY (`project_type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_user_affiliation` (`user_affiliation`);

--
-- Indexes for table `user_access`
--
ALTER TABLE `user_access`
  ADD PRIMARY KEY (`access_id`),
  ADD KEY `fk_access_permission` (`access_permission`),
  ADD KEY `fk_access_user` (`access_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `affiliations`
--
ALTER TABLE `affiliations`
  MODIFY `affiliation_ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `controls`
--
ALTER TABLE `controls`
  MODIFY `control_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fiscal_years`
--
ALTER TABLE `fiscal_years`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_committee_comments`
--
ALTER TABLE `project_committee_comments`
  MODIFY `pcc_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_data`
--
ALTER TABLE `project_data`
  MODIFY `project_data_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_status`
--
ALTER TABLE `project_status`
  MODIFY `project_status_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `project_timelines`
--
ALTER TABLE `project_timelines`
  MODIFY `project_timeline_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_types`
--
ALTER TABLE `project_types`
  MODIFY `project_type_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `user_access`
--
ALTER TABLE `user_access`
  MODIFY `access_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `fk_project_affiliation` FOREIGN KEY (`project_affiliation`) REFERENCES `affiliations` (`affiliation_ID`),
  ADD CONSTRAINT `fk_project_ref` FOREIGN KEY (`project_data_ref`) REFERENCES `project_data` (`project_data_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_project_status` FOREIGN KEY (`project_status`) REFERENCES `project_status` (`project_status_id`),
  ADD CONSTRAINT `fk_project_type` FOREIGN KEY (`project_type`) REFERENCES `project_types` (`project_type_id`),
  ADD CONSTRAINT `fk_project_user` FOREIGN KEY (`project_user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `project_committee_comments`
--
ALTER TABLE `project_committee_comments`
  ADD CONSTRAINT `fk_committee_id` FOREIGN KEY (`pcc_commitee_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pk_project_id` FOREIGN KEY (`pcc_project_id`) REFERENCES `projects` (`project_id`);

--
-- Constraints for table `project_timelines`
--
ALTER TABLE `project_timelines`
  ADD CONSTRAINT `fk_project_id` FOREIGN KEY (`project_timeline_projectId`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_status_id` FOREIGN KEY (`project_timeline_status_id`) REFERENCES `project_status` (`project_status_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_affiliation` FOREIGN KEY (`user_affiliation`) REFERENCES `affiliations` (`affiliation_ID`);

--
-- Constraints for table `user_access`
--
ALTER TABLE `user_access`
  ADD CONSTRAINT `fk_access_permission` FOREIGN KEY (`access_permission`) REFERENCES `permissions` (`permission_id`),
  ADD CONSTRAINT `fk_access_user` FOREIGN KEY (`access_user`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

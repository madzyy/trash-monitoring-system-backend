-- Database: waste_management

CREATE DATABASE IF NOT EXISTS waste_management;
USE waste_management;

-- Table structure for `users`
CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

-- Dumping data for table `users`
INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`) VALUES
(1, 'tapiwa', '$2a$10$oOPy/A7SX6gmK2G4v.RV4.52jyFxXKlyZuJAM1S5TPPrebg8TQP36', NULL, '2024-11-30 03:53:57');

-- Table structure for `trucks`
CREATE TABLE `trucks` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `vehicle_number` VARCHAR(255) NOT NULL,
    `driver_name` VARCHAR(255) NOT NULL,
    `latitude` FLOAT NOT NULL,
    `longitude` FLOAT NOT NULL,
    `description` TEXT,
    PRIMARY KEY (`id`)
);

-- Dumping data for table `trucks`
INSERT INTO `trucks` (`id`, `vehicle_number`, `driver_name`, `latitude`, `longitude`, `description`) VALUES
(1, 'TR123', 'John Doe', -17.824, 31.029, 'Truck near downtown'),
(2, 'TR124', 'Jane Smith', -17.825, 31.035, 'Truck in uptown'),
(3, 'TR86', 'Madz', 45, 56, 'shdbaskd'),
(4, 'TR85', 'Asher', 58, 12, 'Near town');

-- Table structure for `bins`
CREATE TABLE `bins` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `latitude` FLOAT NOT NULL,
    `longitude` FLOAT NOT NULL,
    `level` INT NOT NULL,
    `description` TEXT,
    PRIMARY KEY (`id`)
);

-- Dumping data for table `bins`
INSERT INTO `bins` (`id`, `latitude`, `longitude`, `level`, `description`) VALUES
(1, -17.824, 31.029, 80, 'Bin near market'),
(2, -17.827, 31.035, 60, 'Bin near bus stop');

-- Table structure for `garbage_collectors`
CREATE TABLE `garbage_collectors` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `truck_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`truck_id`) REFERENCES `trucks`(`id`)
);

-- Dumping data for table `garbage_collectors`
INSERT INTO `garbage_collectors` (`id`, `name`, `truck_id`) VALUES
(1, 'Alex Williams', 1),
(2, 'Sarah Johnson', 2),
(3, 'Tinei Masawi', 2),
(4, 'Will Smith', 1),
(5, 'Tinei Masawi', 1),
(6, 'Tinei Masawi', 1),
(7, 'Tinei Masawi', 1),
(8, 'Will Smith', 1),
(9, 'Tinei Masawi', 1),
(10, 'Tinei', 5);

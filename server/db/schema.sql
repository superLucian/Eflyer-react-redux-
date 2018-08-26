CREATE TABLE `flyers` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `member_contact_id` INT(11),
    `contact_name` VARCHAR(100) NOT NULL,
    `contact_email` VARCHAR(100) NOT NULL,
    `contact_phone` VARCHAR(16) NOT NULL,
    `theme` VARCHAR(100),
    `front_cover` VARCHAR(255),
    `inside_cover` VARCHAR(255),
    `company_name` VARCHAR(100),
    `company_address_street` VARCHAR(100),
    `company_address_city` VARCHAR(100),
    `company_address_state` VARCHAR(100),
    `company_address_country` VARCHAR(100),
    `company_address_zip` VARCHAR(100),
    `company_phone` VARCHAR(16),
    `company_website` VARCHAR(100),
    `company_description` TEXT,
    `company_logo` VARCHAR(255),
    `flyer_name` VARCHAR(200),
    `flyer_name_color_rgb` VARCHAR(30),
    `flyer_name_font_size` VARCHAR(30),
    `flyer_name_font_family` VARCHAR(50),
    `flyer_name_font_style` VARCHAR(30),
    `flyer_name_font_weight` VARCHAR(30),
    `status` ENUM('draft', 'pending', 'approved') DEFAULT 'draft',
    `autosaved_at` DATETIME DEFAULT NULL,
    `submitted_at` DATETIME DEFAULT NULL,
    `approved_at` DATETIME DEFAULT NULL,
    `created_at` DATETIME DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `flyers_member_contact_id` (`member_contact_id`)
) DEFAULT CHARSET=utf8;


CREATE TABLE `flyer_products` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `flyer_id` INT(11) NOT NULL,
    `partnum` VARCHAR(100) NOT NULL,
    `image` VARCHAR(255),
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` VARCHAR(100) NOT NULL,
    `featured` TINYINT(1) NOT NULL DEFAULT '0',
    `special_note` TEXT,
    `position` SMALLINT,
    `created_at` DATETIME DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `flyer_products_flyer_id` (`flyer_id`),
    KEY `flyer_products_partnum` (`partnum`)
) DEFAULT CHARSET=utf8;


CREATE `company_info_update` (
    `flyer_id` INT(11) NOT NULL,
    `member_contact_id` INT(11),
    `status` ENUM('pending', 'approved') DEFAULT 'pending',
    `created_at` DATETIME DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    UNIQUE KEY `company_info_update_flyer_id_unique` (`flyer_id`),
    KEY `company_info_update_member_contact_id` (`member_contact_id`)
) DEFAULT CHARSET=utf8;

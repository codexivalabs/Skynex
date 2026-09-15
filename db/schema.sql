-- =====================================================================
-- SKYNEX Mobile Repair Workshop & Institute — Database Schema
-- MySQL 8.0+
-- =====================================================================

CREATE DATABASE IF NOT EXISTS skynex CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE skynex;

-- ---------------------------------------------------------------------
-- Admins (JWT-authenticated back office users)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- Site-wide settings (singleton row, id = 1)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  site_name VARCHAR(150) NOT NULL DEFAULT 'SKYNEX',
  logo_url VARCHAR(255) NOT NULL DEFAULT '/logo.png',
  tagline VARCHAR(255) DEFAULT NULL,
  footer_about TEXT,
  phone VARCHAR(50),
  email VARCHAR(150),
  address VARCHAR(255),
  copyright_text VARCHAR(255) DEFAULT 'SKYNEX. All rights reserved.',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_settings_singleton CHECK (id = 1)
);

-- ---------------------------------------------------------------------
-- Hero section (singleton row, id = 1)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_content (
  id INT PRIMARY KEY DEFAULT 1,
  badge_text VARCHAR(150),
  heading_main VARCHAR(255),
  heading_highlight VARCHAR(100),
  subtitle TEXT,
  cta_primary_text VARCHAR(100),
  cta_primary_link VARCHAR(255),
  cta_secondary_text VARCHAR(100),
  cta_secondary_link VARCHAR(255),
  highlight_1 VARCHAR(150),
  highlight_2 VARCHAR(150),
  highlight_3 VARCHAR(150),
  trust_text VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_hero_singleton CHECK (id = 1)
);

-- ---------------------------------------------------------------------
-- Homepage "Services" grid
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon_name VARCHAR(50) NOT NULL DEFAULT 'Smartphone',
  title VARCHAR(150) NOT NULL,
  description TEXT,
  tag VARCHAR(50),
  color_from VARCHAR(30) DEFAULT 'blue-500',
  color_to VARCHAR(30) DEFAULT 'indigo-600',
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- Homepage "Why Choose Us" features grid
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  icon_name VARCHAR(50) NOT NULL DEFAULT 'ShieldCheck',
  title VARCHAR(150) NOT NULL,
  description TEXT,
  badge VARCHAR(50),
  color_from VARCHAR(30) DEFAULT 'blue-500',
  color_to VARCHAR(30) DEFAULT 'indigo-600',
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- Location / workshop info (singleton row, id = 1)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS location_info (
  id INT PRIMARY KEY DEFAULT 1,
  name VARCHAR(255),
  address VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(150),
  map_embed_url TEXT,
  direct_map_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_location_singleton CHECK (id = 1)
);

-- Working hours rows shown in the Location section
CREATE TABLE IF NOT EXISTS business_hours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  days VARCHAR(100) NOT NULL,
  time_range VARCHAR(100) NOT NULL,
  order_index INT NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------------------
-- Navigation + footer link columns
-- group_name: 'nav' | 'footer_quick' | 'footer_services'
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_name ENUM('nav', 'footer_quick', 'footer_services') NOT NULL,
  name VARCHAR(150) NOT NULL,
  href VARCHAR(255) NOT NULL,
  badge VARCHAR(30) DEFAULT NULL,
  order_index INT NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------------------
-- Social links (footer icons)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform ENUM('facebook', 'instagram', 'youtube', 'twitter') NOT NULL,
  url VARCHAR(255) NOT NULL DEFAULT '#',
  order_index INT NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------------------
-- Sub-pages linked from the navbar:
-- online-courses, onsite, ai-plus, downloads, parts-tools, sourcing
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  nav_label VARCHAR(100) NOT NULL,
  badge_text VARCHAR(150),
  title VARCHAR(255) NOT NULL,
  title_highlight VARCHAR(100),
  subtitle TEXT,
  icon_name VARCHAR(50) NOT NULL DEFAULT 'Sparkles',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cards / items listed on each sub-page (courses, products, downloads, etc.)
CREATE TABLE IF NOT EXISTS page_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_id INT NOT NULL,
  icon_name VARCHAR(50) NOT NULL DEFAULT 'Star',
  title VARCHAR(200) NOT NULL,
  description TEXT,
  meta_label VARCHAR(100),
  tag VARCHAR(50),
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- Newsletter subscribers (footer subscribe form)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

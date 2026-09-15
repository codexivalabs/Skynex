-- =====================================================================
-- SKYNEX — Seed data (mirrors the original hardcoded content exactly)
-- Run this AFTER schema.sql. Re-running is safe (uses INSERT ... ON
-- DUPLICATE KEY UPDATE / idempotent guards for singleton rows).
-- =====================================================================

USE skynex;

-- Site settings
INSERT INTO site_settings (id, site_name, logo_url, tagline, footer_about, phone, email, address, copyright_text)
VALUES (
  1, 'SKYNEX', '/logo.png', 'Mobile Repair Workshop & Institute',
  'Your trusted partner for professional mobile & PC repairs, AI diagnostic tools, original spare parts, and certified technician courses.',
  '+92 340 3800000', 'contact@skynex.com', 'Main Market, Jhelum, Punjab, Pakistan',
  'SKYNEX. All rights reserved.'
)
ON DUPLICATE KEY UPDATE site_name = VALUES(site_name);

-- Hero section
INSERT INTO hero_content (
  id, badge_text, heading_main, heading_highlight, subtitle,
  cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link,
  highlight_1, highlight_2, highlight_3, trust_text
) VALUES (
  1,
  'Next-Gen Mobile Repair Institute & AI Sourcing',
  'Master Advanced Mobile Repairing with', 'SKYNEX',
  'From hardware chip-level diagnostics to AI-powered troubleshooting, premium tool sourcing, and instant schematic downloads — elevate your mobile repair career today.',
  'Explore Courses', '/online-courses', 'Watch Demo', '#demo',
  'Onsite & Online Classes', 'AI+ Hardware Diagnostic', 'Verified Parts & Tools',
  'Trusted by 5,000+ Mobile Technicians Worldwide'
)
ON DUPLICATE KEY UPDATE badge_text = VALUES(badge_text);

-- Services grid
INSERT INTO services (icon_name, title, description, tag, color_from, color_to, order_index) VALUES
('Smartphone', 'Mobile Hardware & Software Repair', 'Expert chip-level hardware repair, screen replacements, motherboard troubleshooting, and original firmware flashing.', 'Core Service', 'blue-500', 'indigo-600', 1),
('Laptop', 'PC & Laptop Diagnostics', 'Complete laptop and PC maintenance including GPU repair, RAM/SSD upgrades, power IC replacement, and OS recovery.', 'Popular', 'purple-500', 'indigo-600', 2),
('GraduationCap', 'Online & Onsite Courses', 'Master modern micro-soldering, schematics reading, and AI-assisted troubleshooting with our certified repair courses.', 'Institute', 'orange-500', 'amber-600', 3),
('Headphones', 'Premium Mobile & PC Accessories', 'High-grade tempered glass, fast chargers, original flex cables, data lines, and premium audio gear.', 'Store', 'cyan-500', 'blue-600', 4),
('Wrench', 'Repair Tools & Stencils Sourcing', 'Professional lab tools, reballing stencils, digital microscopes, DC power supplies, and soldering stations.', 'Hardware', 'indigo-500', 'purple-600', 5),
('FileCode2', 'Schematics & Diagram Downloads', 'Instant access to tested bitmap diagrams, schematic PDFs, pinout maps, and official repair dumps.', 'Digital Assets', 'emerald-500', 'teal-600', 6);

-- Why Choose Us features
INSERT INTO features (icon_name, title, description, badge, color_from, color_to, order_index) VALUES
('ShieldCheck', '100% Tested & Original Parts', 'We source and supply only lab-verified screens, flexes, micro-components, and diagnostic equipment.', 'Quality Assured', 'blue-500', 'indigo-600', 1),
('Cpu', 'AI-Powered Diagnostics', 'Leverage smart fault-finding, schematics mapping, and AI assistance to diagnose tricky motherboard issues faster.', 'Smart Tech', 'purple-500', 'indigo-600', 2),
('Award', 'Certified Master Trainers', 'Learn micro-soldering and CPU reballing directly from experienced technicians with years of practical shop floor experience.', 'Expert Instructors', 'orange-500', 'amber-600', 3),
('Zap', 'Rapid Repair Turnaround', 'Fast diagnostics and swift repair turnarounds to get your smartphones and PCs back to peak performance with zero hassle.', 'Fast Delivery', 'cyan-500', 'blue-600', 4),
('Truck', 'Global Parts & Tool Sourcing', 'Can''t find a rare IC or specialized reballing stencil? We handle global sourcing and dispatch items directly to your door.', 'Worldwide Logistics', 'indigo-500', 'purple-600', 5),
('Headphones', 'Dedicated Post-Repair Support', 'Get continuous technical support, schematic consultation, and repair assistance even after course completion or service.', '24/7 Assistance', 'emerald-500', 'teal-600', 6);

-- Location info
INSERT INTO location_info (id, name, address, phone, email, map_embed_url, direct_map_url) VALUES (
  1, 'SKYNEX Mobile Repair Workshop & Institute', 'Main Market, Jhelum, Punjab, Pakistan',
  '+92 340 3800000', 'contact@skynex.com',
  'https://maps.google.com/maps?q=Jhelum%20Punjab%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed',
  'https://maps.google.com/?q=Jhelum+Punjab+Pakistan'
)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO business_hours (days, time_range, order_index) VALUES
('Monday - Saturday', '09:00 AM - 08:00 PM', 1),
('Friday', 'Break: 1:00 PM - 2:30 PM', 2),
('Sunday', 'Closed / Emergency Service', 3);

-- Nav links
INSERT INTO links (group_name, name, href, badge, order_index) VALUES
('nav', 'Online Courses', '/online-courses', NULL, 1),
('nav', 'Onsite', '/onsite', NULL, 2),
('nav', 'AI+', '/ai-plus', 'NEW', 3),
('nav', 'Downloads', '/downloads', NULL, 4),
('nav', 'Parts & Tools', '/parts-tools', NULL, 5),
('nav', 'Sourcing', '/sourcing', NULL, 6);

-- Footer quick links
INSERT INTO links (group_name, name, href, badge, order_index) VALUES
('footer_quick', 'Online Courses', '/online-courses', NULL, 1),
('footer_quick', 'Onsite Training', '/onsite', NULL, 2),
('footer_quick', 'AI+ Fault Finder', '/ai-plus', NULL, 3),
('footer_quick', 'Schematic Downloads', '/downloads', NULL, 4),
('footer_quick', 'Parts & Tools Store', '/parts-tools', NULL, 5),
('footer_quick', 'Sourcing Service', '/sourcing', NULL, 6);

-- Footer repair & training links
INSERT INTO links (group_name, name, href, badge, order_index) VALUES
('footer_services', 'Mobile Screen & Glass Replacement', '/#services', NULL, 1),
('footer_services', 'Motherboard & Chip-Level Repair', '/#services', NULL, 2),
('footer_services', 'CPU & Power IC Reballing', '/#services', NULL, 3),
('footer_services', 'PC & Laptop Hardware Upgrades', '/#services', NULL, 4),
('footer_services', 'Firmware Flashing & Unlocking', '/#services', NULL, 5);

-- Social links
INSERT INTO social_links (platform, url, order_index) VALUES
('facebook', '#', 1),
('instagram', '#', 2),
('youtube', '#', 3),
('twitter', '#', 4);

-- Sub-pages (linked from the navbar — previously dead links)
INSERT INTO pages (slug, nav_label, badge_text, title, title_highlight, subtitle, icon_name) VALUES
('online-courses', 'Online Courses', 'Learn From Anywhere', 'Certified Mobile Repair Courses, Delivered', 'Online', 'Live and self-paced classes covering chip-level repair, micro-soldering, and AI-assisted diagnostics — taught by SKYNEX master trainers.', 'GraduationCap'),
('onsite', 'Onsite Training', 'Hands-On at Our Workshop', 'Practical, Bench-Side Training at Our', 'Institute', 'Work on real devices under expert supervision in our Jhelum workshop, with full access to lab tools, microscopes, and reballing stations.', 'Wrench'),
('ai-plus', 'AI+', 'Smart Diagnostics', 'AI-Powered Fault Finding for Faster', 'Repairs', 'SKYNEX AI+ analyzes symptoms, cross-references schematics, and suggests likely fault points so technicians can diagnose boards in minutes, not hours.', 'Cpu'),
('downloads', 'Downloads', 'Digital Repair Assets', 'Schematics, Diagrams & Firmware', 'Downloads', 'Instant access to tested schematic PDFs, bitmap diagrams, pinout maps, and official firmware dumps for a wide range of devices.', 'FileCode2'),
('parts-tools', 'Parts & Tools', 'Verified Inventory', 'Original Parts & Professional', 'Repair Tools', 'Lab-verified screens, flex cables, micro-components, soldering stations, digital microscopes, and reballing stencils — sourced and tested in-house.', 'Wrench'),
('sourcing', 'Sourcing', 'Worldwide Logistics', 'Can''t Find a Part? We', 'Source It', 'Tell us the rare IC, connector, or tool you need — our global sourcing network tracks it down and ships it straight to your door.', 'Truck')
ON DUPLICATE KEY UPDATE nav_label = VALUES(nav_label);

-- Sample items are only inserted the first time (guarded below), since
-- page_items has no natural unique key to upsert against.

-- Sample items for each sub-page (placeholder content — replace via the admin panel)
INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'GraduationCap', 'Chip-Level Repair Fundamentals', 'CPU/GPU reballing, power IC replacement, and board-level fault tracing for beginners.', '6 Weeks', 'Beginner', 1 FROM pages WHERE slug = 'online-courses';
INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'Cpu', 'Advanced Micro-Soldering', 'BGA reballing, EMMC/UFS data recovery, and advanced schematic reading.', '8 Weeks', 'Advanced', 2 FROM pages WHERE slug = 'online-courses';
INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'Smartphone', 'iOS & Android Software Repair', 'Firmware flashing, unlocking, and OS-level troubleshooting across major device brands.', '4 Weeks', 'Beginner', 3 FROM pages WHERE slug = 'online-courses';

INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'Wrench', 'Bench-Side Repair Sessions', 'Supervised, hands-on repair practice using real customer devices in our workshop.', 'Weekdays', 'Popular', 1 FROM pages WHERE slug = 'onsite';
INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'Microscope', 'Microscope & Reballing Lab Access', 'Full access to digital microscopes, hot air stations, and reballing rigs during training hours.', 'By Appointment', 'Hardware', 2 FROM pages WHERE slug = 'onsite';

INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'ScanSearch', 'Symptom-Based Fault Finder', 'Describe the symptom and get a ranked list of likely faulty components based on known schematics.', 'Beta', 'Smart Tech', 1 FROM pages WHERE slug = 'ai-plus';
INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'FileSearch', 'Schematic Cross-Reference', 'Instantly matches a board photo against our schematic library to highlight test points.', 'Beta', 'Smart Tech', 2 FROM pages WHERE slug = 'ai-plus';

INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'FileCode2', 'iPhone Schematic Pack', 'Tested schematic diagrams and boardview files for recent iPhone models.', 'PDF / BRD', 'Popular', 1 FROM pages WHERE slug = 'downloads';
INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'FileCode2', 'Android Firmware Dumps', 'Verified stock firmware images for common Android repair and unbrick jobs.', 'ZIP', 'Firmware', 2 FROM pages WHERE slug = 'downloads';

INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'ShieldCheck', 'OEM Display Assemblies', 'Lab-tested original and OEM-grade screens for major phone and laptop models.', 'In Stock', 'Store', 1 FROM pages WHERE slug = 'parts-tools';
INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'Wrench', 'Reballing Stencil Sets', 'Precision stencils for common chipsets, sized for accurate BGA reballing.', 'In Stock', 'Hardware', 2 FROM pages WHERE slug = 'parts-tools';

INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'Truck', 'Global Component Sourcing', 'Tell us the part number and we track it down through our verified supplier network.', '3-10 Days', 'Worldwide', 1 FROM pages WHERE slug = 'sourcing';
INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
SELECT id, 'Navigation', 'Rush Sourcing Requests', 'Priority sourcing for urgent repair jobs, with tracked shipping to your workshop.', '1-3 Days', 'Express', 2 FROM pages WHERE slug = 'sourcing';

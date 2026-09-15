import { query } from "@/lib/db";

// =====================================================================
// Data access layer. Every function here is a thin, explicit wrapper
// around a SQL statement — used by both the public API routes (read
// only) and the /api/admin/* route handlers (read + write), so the
// query shape only lives in one place.
// =====================================================================

// ---------------------------------------------------------------- Hero
export async function getHero() {
  const rows = await query("SELECT * FROM hero_content WHERE id = 1");
  return rows[0] || null;
}

export async function updateHero(data) {
  const fields = [
    "badge_text", "heading_main", "heading_highlight", "subtitle",
    "cta_primary_text", "cta_primary_link", "cta_secondary_text", "cta_secondary_link",
    "highlight_1", "highlight_2", "highlight_3", "trust_text",
  ];
  const setClause = fields.map((f) => `${f} = ?`).join(", ");
  const values = fields.map((f) => data[f] ?? null);
  await query(
    `INSERT INTO hero_content (id, ${fields.join(", ")}) VALUES (1, ${fields.map(() => "?").join(", ")})
     ON DUPLICATE KEY UPDATE ${setClause}`,
    [...values, ...values]
  );
  return getHero();
}

// ------------------------------------------------------------ Services
export async function getServices() {
  return query("SELECT * FROM services ORDER BY order_index ASC, id ASC");
}

export async function createService(data) {
  const result = await query(
    `INSERT INTO services (icon_name, title, description, tag, color_from, color_to, order_index)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.icon_name, data.title, data.description, data.tag, data.color_from, data.color_to, data.order_index ?? 0]
  );
  return { id: result.insertId, ...data };
}

export async function updateService(id, data) {
  await query(
    `UPDATE services SET icon_name=?, title=?, description=?, tag=?, color_from=?, color_to=?, order_index=? WHERE id=?`,
    [data.icon_name, data.title, data.description, data.tag, data.color_from, data.color_to, data.order_index ?? 0, id]
  );
  const rows = await query("SELECT * FROM services WHERE id = ?", [id]);
  return rows[0];
}

export async function deleteService(id) {
  await query("DELETE FROM services WHERE id = ?", [id]);
}

// ------------------------------------------------------------ Features
export async function getFeatures() {
  return query("SELECT * FROM features ORDER BY order_index ASC, id ASC");
}

export async function createFeature(data) {
  const result = await query(
    `INSERT INTO features (icon_name, title, description, badge, color_from, color_to, order_index)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.icon_name, data.title, data.description, data.badge, data.color_from, data.color_to, data.order_index ?? 0]
  );
  return { id: result.insertId, ...data };
}

export async function updateFeature(id, data) {
  await query(
    `UPDATE features SET icon_name=?, title=?, description=?, badge=?, color_from=?, color_to=?, order_index=? WHERE id=?`,
    [data.icon_name, data.title, data.description, data.badge, data.color_from, data.color_to, data.order_index ?? 0, id]
  );
  const rows = await query("SELECT * FROM features WHERE id = ?", [id]);
  return rows[0];
}

export async function deleteFeature(id) {
  await query("DELETE FROM features WHERE id = ?", [id]);
}

// ------------------------------------------------------------ Location
export async function getLocation() {
  const rows = await query("SELECT * FROM location_info WHERE id = 1");
  return rows[0] || null;
}

export async function updateLocation(data) {
  const fields = ["name", "address", "phone", "email", "map_embed_url", "direct_map_url"];
  const setClause = fields.map((f) => `${f} = ?`).join(", ");
  const values = fields.map((f) => data[f] ?? null);
  await query(
    `INSERT INTO location_info (id, ${fields.join(", ")}) VALUES (1, ${fields.map(() => "?").join(", ")})
     ON DUPLICATE KEY UPDATE ${setClause}`,
    [...values, ...values]
  );
  return getLocation();
}

export async function getBusinessHours() {
  return query("SELECT * FROM business_hours ORDER BY order_index ASC, id ASC");
}

export async function createBusinessHour(data) {
  const result = await query(
    "INSERT INTO business_hours (days, time_range, order_index) VALUES (?, ?, ?)",
    [data.days, data.time_range, data.order_index ?? 0]
  );
  return { id: result.insertId, ...data };
}

export async function updateBusinessHour(id, data) {
  await query("UPDATE business_hours SET days=?, time_range=?, order_index=? WHERE id=?", [
    data.days, data.time_range, data.order_index ?? 0, id,
  ]);
  const rows = await query("SELECT * FROM business_hours WHERE id = ?", [id]);
  return rows[0];
}

export async function deleteBusinessHour(id) {
  await query("DELETE FROM business_hours WHERE id = ?", [id]);
}

// --------------------------------------------------------------- Links
export async function getLinks(groupName) {
  if (groupName) {
    return query("SELECT * FROM links WHERE group_name = ? ORDER BY order_index ASC, id ASC", [groupName]);
  }
  return query("SELECT * FROM links ORDER BY group_name ASC, order_index ASC, id ASC");
}

export async function createLink(data) {
  const result = await query(
    "INSERT INTO links (group_name, name, href, badge, order_index) VALUES (?, ?, ?, ?, ?)",
    [data.group_name, data.name, data.href, data.badge || null, data.order_index ?? 0]
  );
  return { id: result.insertId, ...data };
}

export async function updateLink(id, data) {
  await query("UPDATE links SET group_name=?, name=?, href=?, badge=?, order_index=? WHERE id=?", [
    data.group_name, data.name, data.href, data.badge || null, data.order_index ?? 0, id,
  ]);
  const rows = await query("SELECT * FROM links WHERE id = ?", [id]);
  return rows[0];
}

export async function deleteLink(id) {
  await query("DELETE FROM links WHERE id = ?", [id]);
}

// ------------------------------------------------------------- Social
export async function getSocialLinks() {
  return query("SELECT * FROM social_links ORDER BY order_index ASC, id ASC");
}

export async function updateSocialLink(id, data) {
  await query("UPDATE social_links SET platform=?, url=?, order_index=? WHERE id=?", [
    data.platform, data.url, data.order_index ?? 0, id,
  ]);
  const rows = await query("SELECT * FROM social_links WHERE id = ?", [id]);
  return rows[0];
}

// ------------------------------------------------------------- Settings
export async function getSettings() {
  const rows = await query("SELECT * FROM site_settings WHERE id = 1");
  return rows[0] || null;
}

export async function updateSettings(data) {
  const fields = ["site_name", "logo_url", "tagline", "footer_about", "phone", "email", "address", "copyright_text"];
  const setClause = fields.map((f) => `${f} = ?`).join(", ");
  const values = fields.map((f) => data[f] ?? null);
  await query(
    `INSERT INTO site_settings (id, ${fields.join(", ")}) VALUES (1, ${fields.map(() => "?").join(", ")})
     ON DUPLICATE KEY UPDATE ${setClause}`,
    [...values, ...values]
  );
  return getSettings();
}

// --------------------------------------------------------------- Pages
const VALID_SLUGS = ["online-courses", "onsite", "ai-plus", "downloads", "parts-tools", "sourcing"];
export { VALID_SLUGS };

export async function getPages() {
  return query("SELECT * FROM pages ORDER BY id ASC");
}

export async function getPageBySlug(slug) {
  const rows = await query("SELECT * FROM pages WHERE slug = ?", [slug]);
  return rows[0] || null;
}

export async function updatePage(slug, data) {
  await query(
    `UPDATE pages SET nav_label=?, badge_text=?, title=?, title_highlight=?, subtitle=?, icon_name=? WHERE slug=?`,
    [data.nav_label, data.badge_text, data.title, data.title_highlight, data.subtitle, data.icon_name, slug]
  );
  return getPageBySlug(slug);
}

export async function getPageItems(pageId) {
  return query("SELECT * FROM page_items WHERE page_id = ? ORDER BY order_index ASC, id ASC", [pageId]);
}

export async function createPageItem(pageId, data) {
  const result = await query(
    `INSERT INTO page_items (page_id, icon_name, title, description, meta_label, tag, order_index)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [pageId, data.icon_name, data.title, data.description, data.meta_label, data.tag, data.order_index ?? 0]
  );
  return { id: result.insertId, page_id: pageId, ...data };
}

export async function updatePageItem(id, data) {
  await query(
    `UPDATE page_items SET icon_name=?, title=?, description=?, meta_label=?, tag=?, order_index=? WHERE id=?`,
    [data.icon_name, data.title, data.description, data.meta_label, data.tag, data.order_index ?? 0, id]
  );
  const rows = await query("SELECT * FROM page_items WHERE id = ?", [id]);
  return rows[0];
}

export async function deletePageItem(id) {
  await query("DELETE FROM page_items WHERE id = ?", [id]);
}

// ----------------------------------------------------------- Newsletter
export async function subscribeNewsletter(email) {
  await query(
    "INSERT INTO newsletter_subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE email = email",
    [email]
  );
}

export async function getSubscribers() {
  return query("SELECT * FROM newsletter_subscribers ORDER BY created_at DESC");
}

export async function deleteSubscriber(id) {
  await query("DELETE FROM newsletter_subscribers WHERE id = ?", [id]);
}

// -------------------------------------------------------------- Admins
export async function getAdminByUsername(username) {
  const rows = await query("SELECT * FROM admins WHERE username = ? OR email = ?", [username, username]);
  return rows[0] || null;
}

export async function getAdminById(id) {
  const rows = await query("SELECT id, username, email, created_at FROM admins WHERE id = ?", [id]);
  return rows[0] || null;
}

export async function updateAdminPassword(id, passwordHash) {
  await query("UPDATE admins SET password_hash = ? WHERE id = ?", [passwordHash, id]);
}

// ----------------------------------------------------- Combined fetches
export async function getHomeContent() {
  const [hero, services, features, location, hours, settings, navLinks, footerQuick, footerServices, social] =
    await Promise.all([
      getHero(),
      getServices(),
      getFeatures(),
      getLocation(),
      getBusinessHours(),
      getSettings(),
      getLinks("nav"),
      getLinks("footer_quick"),
      getLinks("footer_services"),
      getSocialLinks(),
    ]);
  return { hero, services, features, location, hours, settings, navLinks, footerQuick, footerServices, social };
}

export async function getPageWithItems(slug) {
  const page = await getPageBySlug(slug);
  if (!page) return null;
  const items = await getPageItems(page.id);
  return { page, items };
}

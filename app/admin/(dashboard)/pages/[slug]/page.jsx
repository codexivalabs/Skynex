import { notFound } from "next/navigation";
import { getPageBySlug, VALID_SLUGS } from "@/lib/content";
import PageEditorClient from "./PageEditorClient";

export const dynamic = "force-dynamic";

export default async function PageEditorPage({ params }) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();

  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return <PageEditorClient slug={slug} initialPage={page} />;
}

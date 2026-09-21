import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bloqe — Compra en grupo, paga menos" },
      {
        name: "description",
        content: "Júntate con más personas, compra en grupo y paga menos con Bloqe.",
      },
      { property: "og:title", content: "Bloqe — Compra en grupo, paga menos" },
      {
        property: "og:description",
        content: "Júntate con más personas, compra en grupo y paga menos con Bloqe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/bloqeweb.html"
      title="Bloqe — Compra en grupo, paga menos"
      className="block h-screen w-full border-0"
    />
  );
}

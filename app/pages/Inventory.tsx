import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cryo Lab Inventory" },
    { name: "description", content: "Cryo Lab Inventory" },
  ];
}

export default function Inventory() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      
    </main>
  );
}

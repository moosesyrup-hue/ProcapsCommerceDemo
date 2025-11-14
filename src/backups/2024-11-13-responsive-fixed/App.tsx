import { useState, useEffect } from "react";
import { CollectionPage } from "./components/CollectionPage";
import { Homepage } from "./components/Homepage";
import { GlobalHeader } from "./components/GlobalHeader";
import { GlobalFooter } from "./components/GlobalFooter";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "collection">("home");

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1">
        {currentPage === "home" ? (
          <Homepage />
        ) : (
          <CollectionPage />
        )}
      </main>
      <GlobalFooter />
    </div>
  );
}

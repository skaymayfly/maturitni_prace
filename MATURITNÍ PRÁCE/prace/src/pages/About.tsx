import React from 'react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">O nás</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 mb-4">
          Fair Estate je platforma vytvořená s cílem usnadnit studentům hledání ideálního bydlení během jejich studia. 
          Spojujeme studenty s pronajímateli a vytváříme komunitu, kde si studenti mohou najít nejen bydlení, 
          ale i nové přátele se společnými zájmy.
        </p>
        <p className="text-gray-700 mb-4">
          Naše služba je dostupná ve třech největších univerzitních městech České republiky - Praze, Brně a Ostravě. 
          Nabízíme jak celé byty, tak jednotlivé pokoje, abychom vyhověli různým preferencím a rozpočtům.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Proč Fair Estate?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Ověření pronajímatelé a kvalitní nabídky</li>
            <li>Možnost najít spolubydlící se stejnými zájmy</li>
            <li>Přehledné filtrování nabídek</li>
            <li>Bezpečná komunikace mezi studenty a pronajímateli</li>
            <li>Pravidelně aktualizovaná databáze nabídek</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
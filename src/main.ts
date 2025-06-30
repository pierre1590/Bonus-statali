// main.ts
import { Cittadino, Incentivo, Startup, Settore, ServizioAggiuntivo } from './classes'; // Importa le classi e gli enum

// --- Esempio di Utilizzo del Sistema Bonny ---

console.log("--- Inizializzazione della Piattaforma Bonny ---");

// Creazione di un'istanza della startup Bonny con associazioni convenzionate
const bonnyStartup = new Startup(
    "Bonny Platform",
    "intermediazione bonus statali e promozione sport",
    "La piattaforma che facilita l'accesso ai bonus fiscali e incentiva l'attività sportiva.",
    ["Verifica Idoneità Bonus", "Richiesta ISEE/730", "Lista Associazioni Sportive Convenzionate"],
    ["Associazione Calcistica Roma", "Centro Nuoto Acquatica", "Palestra Fitness Life"] // Associazioni convenzionate
);

console.log(`\nStartup "${bonnyStartup.nome}" creata.`);
console.log(`Settore di Focus: ${bonnyStartup.settoreDiFocus}`);
console.log(`Servizi Offerti: ${bonnyStartup.prodottiServiziOfferti.join(", ")}`);
console.log(`Associazioni Convenzionate: ${bonnyStartup.associazioniSportiveConvenzionate.join(", ")}`);

// Creazione di un incentivo di esempio per le startup
const fondoInnovazioneSport = new Incentivo(
    "FINN-001",
    "Fondo per l'Innovazione Sportiva",
    "Incentivo per startup che sviluppano tecnologie innovative nel settore sportivo.",
    "Ministero dell'Innovazione",
    ["Sede legale in Italia", "Fatturato inferiore a 2M€"],
    new Date('2025-01-01'),
    new Date('2025-12-31'),
    Settore.SPORT, // Usa l'enum Settore
    150000
);

console.log("\n--- Assegnazione Incentivo alla Startup ---");
if (fondoInnovazioneSport.assegnaAStartup(bonnyStartup)) {
    console.log(`Incentivo "${fondoInnovazioneSport.nome}" assegnato con successo a "${bonnyStartup.nome}".`);
} else {
    console.log(`Assegnazione dell'incentivo "${fondoInnovazioneSport.nome}" a "${bonnyStartup.nome}" fallita o già avvenuta.`);
}

// Creazione e interazione con i cittadini
console.log("\n--- Interazione con i Cittadini ---");

const cittadinoMarco = new Cittadino(
    "Marco",
    "Rossi",
    40,
    ["Ciclismo", "Nuoto"],
    "MRCRSS80A01H501K", // Codice Fiscale
    25000 // Reddito Annuale (non eleggibile per molti bonus in questo esempio)
);

const cittadinoGiulia = new Cittadino(
    "Giulia",
    "Verdi",
    20,
    ["Yoga", "Danza"],
    "GLIVRD05A41F205P", // Codice Fiscale
    12000 // Reddito Annuale (potenzialmente eleggibile per più bonus)
);

console.log(`\nCittadini creati: ${cittadinoMarco.nome} ${cittadinoMarco.cognome}, ${cittadinoGiulia.nome} ${cittadinoGiulia.cognome}.`);

// 1. Cittadino compila il questionario (qui aggiorna solo le proprietà interne)
cittadinoMarco.compilaQuestionarioFiscale({ codiceFiscale: "MRCRSS80A01H501K", redditoAnnuale: 25000 });
console.log(`${cittadinoMarco.nome} ${cittadinoMarco.cognome} ha compilato il questionario fiscale.`);

cittadinoGiulia.compilaQuestionarioFiscale({ codiceFiscale: "GLIVRD05A41F205P", redditoAnnuale: 12000 });
console.log(`${cittadinoGiulia.nome} ${cittadinoGiulia.cognome} ha compilato il questionario fiscale.`);

// 2. Startup verifica l'idoneità ai bonus fiscali e aggiorna il cittadino
console.log(`\n${bonnyStartup.nome} verifica l'idoneità ai bonus per i cittadini.`);
const bonusMarco = bonnyStartup.verificaIdoneitaBonusFiscale(cittadinoMarco);
console.log(`Idoneità bonus per ${cittadinoMarco.nome} ${cittadinoMarco.cognome}:`, bonusMarco);
console.log(`Risparmio bonus accumulato per ${cittadinoMarco.nome}: ${cittadinoMarco.risparmioBonusAccumulato}€`);

const bonusGiulia = bonnyStartup.verificaIdoneitaBonusFiscale(cittadinoGiulia);
console.log(`Idoneità bonus per ${cittadinoGiulia.nome} ${cittadinoGiulia.cognome}:`, bonusGiulia);
console.log(`Risparmio bonus accumulato per ${cittadinoGiulia.nome}: ${cittadinoGiulia.risparmioBonusAccumulato}€`);

// 3. Cittadino richiede servizi aggiuntivi
console.log(`\n${cittadinoMarco.nome} richiede il servizio 730.`);
if (cittadinoMarco.richiediServizioAggiuntivo(ServizioAggiuntivo.SETTE_TRE_ZERO)) {
    if (bonnyStartup.gestisciRichiestaServizioAggiuntivo(cittadinoMarco, ServizioAggiuntivo.SETTE_TRE_ZERO)) {
        console.log(`Richiesta 730 per ${cittadinoMarco.nome} gestita da ${bonnyStartup.nome}.`);
    }
}

console.log(`${cittadinoGiulia.nome} richiede il servizio ISEE.`);
if (cittadinoGiulia.richiediServizioAggiuntivo(ServizioAggiuntivo.ISEE)) {
    if (bonnyStartup.gestisciRichiestaServizioAggiuntivo(cittadinoGiulia, ServizioAggiuntivo.ISEE)) {
        console.log(`Richiesta ISEE per ${cittadinoGiulia.nome} gestita da ${bonnyStartup.nome}. ISEE calcolato: ${cittadinoGiulia.ISEEValue}€.`);
    }
}

// 4. Cittadino partecipa alle attività della startup (simula l'iscrizione ai servizi della startup)
console.log(`\nI cittadini si iscrivono ai servizi di ${bonnyStartup.nome}.`);
if (cittadinoMarco.partecipaAttivita(bonnyStartup)) {
    console.log(`${cittadinoMarco.nome} ${cittadinoMarco.cognome} si è iscritto ai servizi di "${bonnyStartup.nome}".`);
}
if (cittadinoGiulia.partecipaAttivita(bonnyStartup)) {
    console.log(`${cittadinoGiulia.nome} ${cittadinoGiulia.cognome} si è iscritto ai servizi di "${bonnyStartup.nome}".`);
}

// 5. Cittadino investe il risparmio in associazioni convenzionate
console.log("\n--- Investimento Risparmio in Associazioni Sportive ---");

// Test caso 1: Importo valido e associazione convenzionata
const importoGiulia = 50;
if (cittadinoGiulia.investiRisparmioInAssociazione("Centro Nuoto Acquatica", importoGiulia)) {
    console.log(`${cittadinoGiulia.nome} ${cittadinoGiulia.cognome} ha investito ${importoGiulia}€ nel Centro Nuoto Acquatica. Risparmio rimanente: ${cittadinoGiulia.risparmioBonusAccumulato}€`);
    bonnyStartup.registraInvestimentoInAssociazione(cittadinoGiulia, "Centro Nuoto Acquatica", importoGiulia);
} else {
    console.log(`Investimento di ${importoGiulia}€ da parte di ${cittadinoGiulia.nome} nel Centro Nuoto Acquatica fallito (risparmio insufficiente o importo non valido).`);
}


// Test caso 2: Importo negativo
const importoNegativo = -10;
if (cittadinoMarco.investiRisparmioInAssociazione("Associazione Calcistica Roma", importoNegativo)) {
     console.log(`${cittadinoMarco.nome} ${cittadinoMarco.cognome} ha investito ${importoNegativo}€ nell'Associazione Calcistica Roma. Risparmio rimanente: ${cittadinoMarco.risparmioBonusAccumulato}€`);
    bonnyStartup.registraInvestimentoInAssociazione(cittadinoMarco, "Associazione Calcistica Roma", importoNegativo);
} else {
    console.log(`Investimento di ${importoNegativo}€ da parte di ${cittadinoMarco.nome} nell'Associazione Calcistica Roma fallito (risparmio insufficiente o importo non valido).`);
}

// Test caso 3: Associazione non convenzionata (la verifica di convenzione è della startup)
const importoPerNonConvenzionata = 30;
// Il metodo del cittadino non controlla la convenzione, lo farà la startup al momento della registrazione
if (cittadinoGiulia.investiRisparmioInAssociazione("Associazione Basket non convenzionata", importoPerNonConvenzionata)) {
    console.log(`${cittadinoGiulia.nome} ${cittadinoGiulia.cognome} ha investito ${importoPerNonConvenzionata}€ nell'Associazione Basket non convenzionata.`);
    bonnyStartup.registraInvestimentoInAssociazione(cittadinoGiulia, "Associazione Basket non convenzionata", importoPerNonConvenzionata);
} else {
    console.log(`Investimento di ${importoPerNonConvenzionata}€ da parte di ${cittadinoGiulia.nome} nell'Associazione Basket non convenzionata fallito (risparmio insufficiente o importo non valido).`);
}

console.log("\n--- Riepilogo Finale del Sistema Bonny ---");
console.log(`Incentivi ricevuti da ${bonnyStartup.nome}:`, bonnyStartup.incentiviRicevuti.map(i => i.nome));
console.log(`Cittadini partecipanti a ${bonnyStartup.nome}:`, bonnyStartup.cittadiniPartecipanti.map(c => `${c.nome} ${c.cognome} (CF: ${c.codiceFiscale})`));
console.log(`Associazioni sportive convenzionate con ${bonnyStartup.nome}:`, bonnyStartup.associazioniSportiveConvenzionate.join(", "));

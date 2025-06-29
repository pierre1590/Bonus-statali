// main.ts
import { Cittadino, Incentivo, Startup } from './classes'; // Importa le classi

// --- Esempio di Utilizzo ---

console.log("--- Inizializzazione ---");

// Creazione di un'istanza di una startup con associazioni convenzionate
const bonnyStartup = new Startup(
    "Bonny Platform",
    "intermediazione bonus statali e promozione sport",
    "La piattaforma che facilita l'accesso ai bonus fiscali e incentiva l'attività sportiva.",
    ["Verifica Idoneità Bonus", "Richiesta ISEE/730", "Lista Associazioni Sportive Convenzionate"],
    ["Associazione Calcistica Roma", "Centro Nuoto Acquatica", "Palestra Fitness Life"] // Associazioni convenzionate
);

console.log(`Startup creata: ${bonnyStartup.nome}`);
console.log(`Settore di Focus: ${bonnyStartup.settoreDiFocus}`);
console.log(`Servizi Offerti: ${bonnyStartup.prodottiServiziOfferti.join(", ")}`);
console.log(`Associazioni Convenzionate: ${bonnyStartup.associazioniSportiveConvenzionate.join(", ")}`);

// Creazione di un incentivo di esempio
const fondoInnovazioneSport = new Incentivo(
    "FINN-001",
    "Fondo per l'Innovazione Sportiva",
    "Incentivo per startup che sviluppano tecnologie innovative nel settore sportivo.",
    "Ministero dell'Innovazione",
    ["Sede legale in Italia", "Fatturato inferiore a 2M€"],
    new Date('2025-01-01'),
    new Date('2025-12-31'),
    'sport',
    150000
);

console.log("\n--- Assegnazione Incentivo alla Startup ---");
fondoInnovazioneSport.assegnaAStartup(bonnyStartup);

// Creazione e interazione con i cittadini
console.log("\n--- Interazione Cittadini ---");

const cittadinoMarco = new Cittadino(
    "Marco",
    "Rossi",
    40,
    ["Ciclismo", "Nuoto"],
    "MRCRSS80A01H501K", // Codice Fiscale
    25000 // Reddito Annuale
);

const cittadinoGiulia = new Cittadino(
    "Giulia",
    "Verdi",
    20,
    ["Yoga", "Danza"],
    "GLIVRD05A41F205P", // Codice Fiscale
    12000 // Reddito Annuale
);

// 1. Cittadino compila il questionario
cittadinoMarco.compilaQuestionarioFiscale({ codiceFiscale: "MRCRSS80A01H501K", redditoAnnuale: 25000 });
cittadinoGiulia.compilaQuestionarioFiscale({ codiceFiscale: "GLIVRD05A41F205P", redditoAnnuale: 12000 });

// 2. Startup verifica l'idoneità ai bonus fiscali
bonnyStartup.verificaIdoneitaBonusFiscale(cittadinoMarco);
bonnyStartup.verificaIdoneitaBonusFiscale(cittadinoGiulia);

console.log("\n--- Stato dei bonus fiscali dei cittadini ---");
console.log(`${cittadinoMarco.nome} ${cittadinoMarco.cognome}:`, cittadinoMarco.bonusFiscaliIdonei, `Risparmio: ${cittadinoMarco.risparmioBonusAccumulato}€`);
console.log(`${cittadinoGiulia.nome} ${cittadinoGiulia.cognome}:`, cittadinoGiulia.bonusFiscaliIdonei, `Risparmio: ${cittadinoGiulia.risparmioBonusAccumulato}€`);

// 3. Cittadino richiede servizi aggiuntivi
cittadinoMarco.richiediServizioAggiuntivo('730');
bonnyStartup.gestisciRichiestaServizioAggiuntivo(cittadinoMarco, '730');

cittadinoGiulia.richiediServizioAggiuntivo('ISEE');
bonnyStartup.gestisciRichiestaServizioAggiuntivo(cittadinoGiulia, 'ISEE');

// 4. Cittadino partecipa alle attività della startup (già presente, ma per completezza)
cittadinoMarco.partecipaAttivita(bonnyStartup);
cittadinoGiulia.partecipaAttivita(bonnyStartup);

// 5. Cittadino investe il risparmio in associazioni convenzionate
console.log("\n--- Investimento Risparmio in Associazioni ---");
cittadinoGiulia.investiRisparmioInAssociazione("Centro Nuoto Acquatica", 50); // Giulia ha un risparmio di 250€ se idonea a tutti i bonus
bonnyStartup.registraInvestimentoInAssociazione(cittadinoGiulia, "Centro Nuoto Acquatica", 50);

cittadinoMarco.investiRisparmioInAssociazione("Associazione Calcistica Roma", 100); // Marco ha un risparmio di 100€ se idoneo solo a ISEE
bonnyStartup.registraInvestimentoInAssociazione(cittadinoMarco, "Associazione Calcistica Roma", 100);

cittadinoGiulia.investiRisparmioInAssociazione("Associazione Basket non convenzionata", 30); // Test associazione non convenzionata
bonnyStartup.registraInvestimentoInAssociazione(cittadinoGiulia, "Associazione Basket non convenzionata", 30);

console.log("\n--- Riepilogo Finale ---");
console.log(`Incentivi ricevuti da ${bonnyStartup.nome}:`, bonnyStartup.incentiviRicevuti.map(i => i.nome));
console.log(`Cittadini partecipanti a ${bonnyStartup.nome}:`, bonnyStartup.cittadiniPartecipanti.map(c => `${c.nome} ${c.cognome}`));
console.log(`Associazioni sportive convenzionate con ${bonnyStartup.nome}:`, bonnyStartup.associazioniSportiveConvenzionate.join(", "));

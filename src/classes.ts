// classes.ts
import { ICittadino, IIncentivo, IStartup } from './interfaces'; // Importa le interfacce

/**
 * Implementazione concreta della classe Cittadino.
 * Rappresenta i cittadini interessati a migliorare o mantenere uno stile di vita attivo,
 * facilitando la loro partecipazione alle iniziative sportive.
 */
export class Cittadino implements ICittadino {
    public codiceFiscale: string;
    public redditoAnnuale: number;
    public ISEEValue?: number;
    public bonusFiscaliIdonei: { isee?: boolean; gas?: boolean; elettrico?: boolean; idrico?: boolean; } = {};
    public risparmioBonusAccumulato: number = 0;

    constructor(
        public nome: string,
        public cognome: string,
        public eta: number,
        public interessiSportivi: string[],
        codiceFiscale: string, // Inizializzato nel costruttore
        redditoAnnuale: number // Inizializzato nel costruttore
    ) {
        this.codiceFiscale = codiceFiscale;
        this.redditoAnnuale = redditoAnnuale;
    }

    /**
     * Permette al cittadino di partecipare alle attività o utilizzare i prodotti/servizi
     * offerti da una startup. Questa è la logica di collegamento per la partecipazione.
     * @param startup La startup alle cui attività/servizi il cittadino partecipa.
     */
    partecipaAttivita(startup: IStartup): void {
        console.log(`Cittadino ${this.nome} ${this.cognome} tenta di partecipare alle attività di "${startup.nome}".`);
        // La logica per la partecipazione effettiva (es. verifica idoneità, iscrizione)
        // sarebbe qui. Per questo esempio, la startup registra la partecipazione.
        startup.registraPartecipazioneCittadino(this);
    }

    /**
     * Compila un questionario con i dati fiscali per la verifica dei bonus.
     * Questo metodo simula l'inserimento dei dati da parte del cittadino.
     * @param datiFisicali Oggetto contenente i dati fiscali del cittadino.
     */
    compilaQuestionarioFiscale(datiFisicali: { codiceFiscale: string; redditoAnnuale: number; }): void {
        this.codiceFiscale = datiFisicali.codiceFiscale;
        this.redditoAnnuale = datiFisicali.redditoAnnuale;
        console.log(`Cittadino ${this.nome} ${this.cognome} ha compilato il questionario fiscale.`);
    }

    /**
     * Richiede un servizio aggiuntivo (es. calcolo ISEE, compilazione 730).
     * @param servizio Il tipo di servizio aggiuntivo richiesto.
     */
    richiediServizioAggiuntivo(servizio: 'ISEE' | '730'): void {
        console.log(`Cittadino ${this.nome} ${this.cognome} ha richiesto il servizio aggiuntivo: ${servizio}.`);
        // In un'applicazione reale, questa richiesta verrebbe gestita dalla Startup
        // o da un servizio esterno.
    }

    /**
     * Investe una parte del risparmio accumulato in un'associazione sportiva convenzionata.
     * @param associazione Nome dell'associazione sportiva.
     * @param importo Importo da investire.
     */
    investiRisparmioInAssociazione(associazione: string, importo: number): void {
        if (this.risparmioBonusAccumulato >= importo) {
            this.risparmioBonusAccumulato -= importo;
            console.log(`Cittadino ${this.nome} ${this.cognome} ha investito ${importo}€ nell'associazione ${associazione}. Risparmio rimanente: ${this.risparmioBonusAccumulato}€`);
        } else {
            console.warn(`Cittadino ${this.nome} ${this.cognome} non ha sufficiente risparmio (${this.risparmioBonusAccumulato}€) per investire ${importo}€ in ${associazione}.`);
        }
    }
}

/**
 * Implementazione concreta della classe Incentivo.
 * Gestisce le informazioni sui vari incentivi statali, compresi i dettagli
 * e la logistica di assegnazione alle startup.
 */
export class Incentivo implements IIncentivo {
    constructor(
        public codiceIdentificativo: string,
        public nome: string,
        public descrizione: string,
        public enteErogatore: string,
        public criteriEleggibilita: string[],
        public dataInizioValidita: Date,
        public dataFineValidita: Date,
        public settore: 'sport' | 'cultura' | 'ambiente' | 'energia' | 'salute' | 'altro',
        public valoreIncentivo?: number
    ) {}

    /**
     * Assegna l'incentivo a una startup qualificata. Questa è la logica di collegamento per l'assegnazione.
     * @param startup La startup a cui assegnare l'incentivo.
     */
    assegnaAStartup(startup: IStartup): void {
        console.log(`Tentativo di assegnare l'incentivo "${this.nome}" alla startup "${startup.nome}".`);
        // In un'applicazione reale, qui ci sarebbe una logica di verifica
        // per assicurarsi che la startup sia qualificata per ricevere l'incentivo.
        // Per questo esempio, chiamiamo il metodo `riceviIncentivo` della startup.
        startup.riceviIncentivo(this);
    }
}

/**
 * Implementazione concreta della classe Startup.
 * Gestisce le informazioni di ciascuna startup, inclusi i dettagli sui prodotti/servizi offerti
 * e la ricezione di incentivi statali, oltre ai nuovi servizi fiscali e sportivi.
 */
export class Startup implements IStartup {
    incentiviRicevuti: IIncentivo[] = [];
    cittadiniPartecipanti: ICittadino[] = [];
    associazioniSportiveConvenzionate: string[] = []; // Nuova proprietà

    constructor(
        public nome: string,
        public settoreDiFocus: string,
        public descrizione: string,
        public prodottiServiziOfferti: string[],
        associazioniSportiveConvenzionate: string[] = [] // Inizializzato nel costruttore
    ) {
        this.associazioniSportiveConvenzionate = associazioniSportiveConvenzionate;
    }

    /**
     * Permette alla startup di ricevere un incentivo statale specifico.
     * Questa è la logica di collegamento per la ricezione degli incentivi.
     * @param incentivo L'incentivo statale ricevuto.
     */
    riceviIncentivo(incentivo: IIncentivo): void {
        const incentivoEsistente = this.incentiviRicevuti.find(i => i.codiceIdentificativo === incentivo.codiceIdentificativo);
        if (incentivoEsistente) {
            console.warn(`La startup ha già ricevuto l'incentivo con codice identificativo ${incentivo.codiceIdentificativo}.`);
            return;
        }
        this.incentiviRicevuti.push(incentivo);
        console.log(`La startup "${this.nome}" ha ricevuto con successo l'incentivo: "${incentivo.nome}".`);
    }

    /**
     * Registra la partecipazione di un cittadino alle attività/servizi della startup.
     * Questo metodo è chiamato dal metodo `partecipaAttivita` del cittadino.
     * @param cittadino Il cittadino che partecipa.
     */
    registraPartecipazioneCittadino(cittadino: ICittadino): void {
        const partecipanteEsistente = this.cittadiniPartecipanti.find(c => c.codiceFiscale === cittadino.codiceFiscale); // Usa codice fiscale per unicità
        if (partecipanteEsistente) {
            console.warn(`Il cittadino ${cittadino.nome} ${cittadino.cognome} sta già partecipando alle attività di "${this.nome}".`);
            return;
        }
        this.cittadiniPartecipanti.push(cittadino);
        console.log(`La startup "${this.nome}" ha registrato la partecipazione di ${cittadino.nome} ${cittadino.cognome}.`);
    }

    /**
     * Verifica l'idoneità di un cittadino per i bonus fiscali e aggiorna il suo stato.
     * Logica semplificata: basata sul reddito e sull'età.
     * @param cittadino Il cittadino da verificare.
     */
    verificaIdoneitaBonusFiscale(cittadino: ICittadino): void {
        console.log(`Verifica idoneità bonus fiscali per ${cittadino.nome} ${cittadino.cognome} (CF: ${cittadino.codiceFiscale})...`);
        // Logica semplificata per esempio
        cittadino.bonusFiscaliIdonei.isee = cittadino.redditoAnnuale <= 20000 && cittadino.eta < 65;
        cittadino.bonusFiscaliIdonei.gas = cittadino.redditoAnnuale <= 15000;
        cittadino.bonusFiscaliIdonei.elettrico = cittadino.redditoAnnuale <= 18000;
        cittadino.bonusFiscaliIdonei.idrico = cittadino.redditoAnnuale <= 16000;

        // Simula un guadagno dal bonus
        if (cittadino.bonusFiscaliIdonei.isee) cittadino.risparmioBonusAccumulato += 100;
        if (cittadino.bonusFiscaliIdonei.gas) cittadino.risparmioBonusAccumulato += 50;
        if (cittadino.bonusFiscaliIdonei.elettrico) cittadino.risparmioBonusAccumulato += 70;
        if (cittadino.bonusFiscaliIdonei.idrico) cittadino.risparmioBonusAccumulato += 30;

        console.log(`Idoneità bonus per ${cittadino.nome} ${cittadino.cognome}:`, cittadino.bonusFiscaliIdonei);
        console.log(`Risparmio bonus accumulato: ${cittadino.risparmioBonusAccumulato}€`);
    }

    /**
     * Gestisce la richiesta di un servizio aggiuntivo da parte di un cittadino.
     * @param cittadino Il cittadino che richiede il servizio.
     * @param servizio Il tipo di servizio richiesto ('ISEE' | '730').
     */
    gestisciRichiestaServizioAggiuntivo(cittadino: ICittadino, servizio: 'ISEE' | '730'): void {
        console.log(`Startup "${this.nome}" sta gestendo la richiesta di ${servizio} per ${cittadino.nome} ${cittadino.cognome}.`);
        // Qui andrebbe la logica reale per la gestione della richiesta
        // (es. inoltro a commercialista, generazione moduli, ecc.)
        if (servizio === 'ISEE') {
            cittadino.ISEEValue = cittadino.redditoAnnuale * 0.5; // Esempio semplificato di calcolo ISEE
            console.log(`ISEE calcolato per ${cittadino.nome} ${cittadino.cognome}: ${cittadino.ISEEValue}€`);
        }
    }

    /**
     * Registra l'investimento del risparmio di un cittadino in un'associazione sportiva.
     * @param cittadino Il cittadino che effettua l'investimento.
     * @param associazione Nome dell'associazione.
     * @param importo Importo investito.
     */
    registraInvestimentoInAssociazione(cittadino: ICittadino, associazione: string, importo: number): void {
        if (this.associazioniSportiveConvenzionate.includes(associazione)) {
            console.log(`Startup "${this.nome}" ha registrato l'investimento di ${importo}€ da parte di ${cittadino.nome} ${cittadino.cognome} nell'associazione "${associazione}".`);
        } else {
            console.warn(`L'associazione "${associazione}" non è convenzionata con "${this.nome}". Impossibile registrare l'investimento.`);
        }
    }
}

// classes.ts
import { ICittadino, IIncentivo, IStartup, Settore, ServizioAggiuntivo } from './interfaces'; // Importa le interfacce e gli enum

/**
 * Implementazione concreta della classe Cittadino.
 * Rappresenta i cittadini interessati a migliorare o mantenere uno stile di vita attivo,
 * facilitando la loro partecipazione alle iniziative sportive.
 */
export class Cittadino implements ICittadino {
    public codiceFiscale: string;
    public redditoAnnuale: number;
    public ISEEValue: number | null = null; // Inizializzato a null
    public bonusFiscaliIdonei: { isee: boolean; gas: boolean; elettrico: boolean; idrico: boolean; } = {
        isee: false,
        gas: false,
        elettrico: false,
        idrico: false
    };
    public risparmioBonusAccumulato: number = 0;

    constructor(
        public nome: string,
        public cognome: string,
        public eta: number,
        public interessiSportivi: string[],
        codiceFiscale: string,
        redditoAnnuale: number
    ) {
        this.codiceFiscale = codiceFiscale;
        this.redditoAnnuale = redditoAnnuale;
    }

    /**
     * Permette al cittadino di partecipare alle attività o utilizzare i prodotti/servizi
     * offerti da una startup. Questa è la logica di collegamento per la partecipazione.
     * @param startup La startup alle cui attività/servizi il cittadino partecipa.
     * @returns Un booleano che indica se la partecipazione è stata registrata.
     */
    partecipaAttivita(startup: IStartup): boolean {
        // La logica per la partecipazione effettiva (es. verifica idoneità, iscrizione)
        // sarebbe qui. Per questo esempio, la startup registra la partecipazione.
        return startup.registraPartecipazioneCittadino(this);
    }

    /**
     * Compila un questionario con i dati fiscali per la verifica dei bonus.
     * Questo metodo simula l'inserimento dei dati da parte del cittadino.
     * @param datiFisicali Oggetto contenente i dati fiscali del cittadino.
     */
    compilaQuestionarioFiscale(datiFisicali: { codiceFiscale: string; redditoAnnuale: number; }): void {
        this.codiceFiscale = datiFisicali.codiceFiscale;
        this.redditoAnnuale = datiFisicali.redditoAnnuale;
    }

    /**
     * Richiede un servizio aggiuntivo (es. calcolo ISEE, compilazione 730).
     * @param servizio Il tipo di servizio aggiuntivo richiesto.
     * @returns Un booleano che indica se la richiesta è stata inoltrata.
     */
    richiediServizioAggiuntivo(servizio: ServizioAggiuntivo): boolean {
        // In un'applicazione reale, questa richiesta verrebbe inoltrata alla Startup
        // o a un servizio esterno. Qui si limita a indicare che la richiesta è stata fatta.
        return true;
    }

    /**
     * Investe una parte del risparmio accumulato in un'associazione sportiva convenzionata.
     * @param associazione Nome dell'associazione sportiva.
     * @param importo Importo da investire.
     * @returns Un booleano che indica se l'investimento è andato a buon fine.
     */
    investiRisparmioInAssociazione(associazione: string, importo: number): boolean {
        if (importo <= 0) {
            console.warn(`Errore: L'importo da investire deve essere maggiore di zero.`);
            return false;
        }
        if (this.risparmioBonusAccumulato >= importo) {
            this.risparmioBonusAccumulato -= importo;
            return true;
        } else {
            return false;
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
        public settore: Settore, // Usa l'enum Settore
        public valoreIncentivo?: number
    ) {}

    /**
     * Assegna l'incentivo a una startup qualificata. Questa è la logica di collegamento per l'assegnazione.
     * @param startup La startup a cui assegnare l'incentivo.
     * @returns Un booleano che indica se l'assegnazione è stata registrata.
     */
    assegnaAStartup(startup: IStartup): boolean {
        // In un'applicazione reale, qui ci sarebbe una logica di verifica
        // per assicurarsi che la startup sia qualificata per ricevere l'incentivo.
        // Per questo esempio, chiamiamo il metodo `riceviIncentivo` della startup.
        return startup.riceviIncentivo(this);
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
    associazioniSportiveConvenzionate: string[] = [];

    constructor(
        public nome: string,
        public settoreDiFocus: string,
        public descrizione: string,
        public prodottiServiziOfferti: string[],
        associazioniSportiveConvenzionate: string[] = []
    ) {
        this.associazioniSportiveConvenzionate = associazioniSportiveConvenzionate;
    }

    /**
     * Permette alla startup di ricevere un incentivo statale specifico.
     * Questa è la logica di collegamento per la ricezione degli incentivi.
     * @param incentivo L'incentivo statale ricevuto.
     * @returns Un booleano che indica se l'incentivo è stato ricevuto con successo.
     */
    riceviIncentivo(incentivo: IIncentivo): boolean {
        const incentivoEsistente = this.incentiviRicevuti.find(i => i.codiceIdentificativo === incentivo.codiceIdentificativo);
        if (incentivoEsistente) {
            console.warn(`ATTENZIONE: La startup "${this.nome}" ha già ricevuto l'incentivo con codice identificativo ${incentivo.codiceIdentificativo}.`);
            return false;
        }
        this.incentiviRicevuti.push(incentivo);
        return true;
    }

    /**
     * Registra la partecipazione di un cittadino alle attività/servizi della startup.
     * Questo metodo è chiamato dal metodo `partecipaAttivita` del cittadino.
     * @param cittadino Il cittadino che partecipa.
     * @returns Un booleano che indica se la partecipazione è stata registrata.
     */
    registraPartecipazioneCittadino(cittadino: ICittadino): boolean {
        const partecipanteEsistente = this.cittadiniPartecipanti.find(c => c.codiceFiscale === cittadino.codiceFiscale); // Usa codice fiscale per unicità
        if (partecipanteEsistente) {
            console.warn(`ATTENZIONE: Il cittadino ${cittadino.nome} ${cittadino.cognome} sta già partecipando alle attività di "${this.nome}".`);
            return false;
        }
        this.cittadiniPartecipanti.push(cittadino);
        return true;
    }

    /**
     * Verifica l'idoneità di un cittadino per i bonus fiscali e aggiorna il suo stato.
     * Logica semplificata: basata sul reddito e sull'età.
     * @param cittadino Il cittadino da verificare.
     * @returns Un oggetto con l'idoneità ai bonus (isee, gas, elettrico, idrico).
     */
    verificaIdoneitaBonusFiscale(cittadino: ICittadino): { isee: boolean; gas: boolean; elettrico: boolean; idrico: boolean; } {
        // Logica di idoneità semplificata per l'esempio. In un contesto reale, sarebbe più complessa.
        const idoneita = {
            isee: cittadino.redditoAnnuale <= 20000 && cittadino.eta < 65,
            gas: cittadino.redditoAnnuale <= 15000,
            elettrico: cittadino.redditoAnnuale <= 18000,
            idrico: cittadino.redditoAnnuale <= 16000
        };

        cittadino.bonusFiscaliIdonei = idoneita; // Aggiorna lo stato del cittadino

        // Simula un guadagno dal bonus basato sull'idoneità
        if (cittadino.bonusFiscaliIdonei.isee) cittadino.risparmioBonusAccumulato += 100;
        if (cittadino.bonusFiscaliIdonei.gas) cittadino.risparmioBonusAccumulato += 50;
        if (cittadino.bonusFiscaliIdonei.elettrico) cittadino.risparmioBonusAccumulato += 70;
        if (cittadino.bonusFiscaliIdonei.idrico) cittadino.risparmioBonusAccumulato += 30;

        return idoneita;
    }

    /**
     * Gestisce la richiesta di un servizio aggiuntivo da parte di un cittadino.
     * @param cittadino Il cittadino che richiede il servizio.
     * @param servizio Il tipo di servizio richiesto.
     * @returns Un booleano che indica se il servizio è stato gestito.
     */
    gestisciRichiestaServizioAggiuntivo(cittadino: ICittadino, servizio: ServizioAggiuntivo): boolean {
        // Qui andrebbe la logica reale per la gestione della richiesta
        // (es. inoltro a commercialista, generazione moduli, ecc.)
        if (servizio === ServizioAggiuntivo.ISEE) {
            cittadino.ISEEValue = cittadino.redditoAnnuale * 0.5; // Esempio semplificato di calcolo ISEE
            // In un contesto reale, ISEEValue sarebbe calcolato con logiche più complesse
            return true;
        } else if (servizio === ServizioAggiuntivo.SETTE_TRE_ZERO) {
            // Logica per gestione 730
            return true;
        }
        return false;
    }

    /**
     * Registra l'investimento del risparmio di un cittadino in un'associazione sportiva.
     * @param cittadino Il cittadino che effettua l'investimento.
     * @param associazione Nome dell'associazione.
     * @param importo Importo investito.
     * @returns Un booleano che indica se l'investimento è stato registrato.
     */
    registraInvestimentoInAssociazione(cittadino: ICittadino, associazione: string, importo: number): boolean {
        if (!this.associazioniSportiveConvenzionate.includes(associazione)) {
            console.warn(`ATTENZIONE: L'associazione "${associazione}" non è convenzionata con "${this.nome}". Impossibile registrare l'investimento.`);
            return false;
        }
        // Assumiamo che la deduzione del risparmio sia già gestita dal metodo del cittadino
        return true; // Indica che la registrazione da parte della startup è avvenuta
    }
}

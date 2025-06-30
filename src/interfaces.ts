// interfaces.ts

/**
 * Enum per rappresentare i settori di applicazione degli incentivi.
 */
export enum Settore {
    SPORT = 'sport',
    CULTURA = 'cultura',
    AMBIENTE = 'ambiente',
    ENERGIA = 'energia',
    SALUTE = 'salute',
    ALTRO = 'altro'
}

/**
 * Enum per rappresentare i servizi aggiuntivi offerti.
 */
export enum ServizioAggiuntivo {
    ISEE = 'ISEE',
    SETTE_TRE_ZERO = '730'
}

/**
 * Rappresenta i cittadini che partecipano alle iniziative promosse dalle startup
 * attraverso gli incentivi statali, con nuove proprietà per la posizione fiscale e i bonus.
 */
export interface ICittadino {
    nome: string;
    cognome: string;
    eta: number; // Età del cittadino
    interessiSportivi: string[]; // Es. ["Calcio", "Nuoto", "Ciclismo"]
    codiceFiscale: string;
    redditoAnnuale: number;
    ISEEValue: number | null; // Valore ISEE del cittadino, inizializzato a null
    bonusFiscaliIdonei: { // Oggetto per tracciare l'idoneità ai vari bonus fiscali
        isee: boolean;
        gas: boolean;
        elettrico: boolean;
        idrico: boolean;
    };
    risparmioBonusAccumulato: number; // Risparmio ottenuto tramite i bonus, investibile nelle associazioni

    /**
     * Permette al cittadino di partecipare alle attività o utilizzare i prodotti/servizi
     * offerti da una startup.
     * @param startup La startup alle cui attività/servizi il cittadino partecipa.
     * @returns Un booleano che indica se la partecipazione è stata registrata.
     */
    partecipaAttivita(startup: IStartup): boolean;

    /**
     * Compila un questionario con i dati fiscali per la verifica dei bonus.
     * @param datiFisicali Oggetto contenente i dati fiscali del cittadino.
     */
    compilaQuestionarioFiscale(datiFisicali: { codiceFiscale: string; redditoAnnuale: number; }): void;

    /**
     * Richiede un servizio aggiuntivo (es. calcolo ISEE, compilazione 730).
     * @param servizio Il tipo di servizio aggiuntivo richiesto.
     * @returns Un booleano che indica se la richiesta è stata inoltrata.
     */
    richiediServizioAggiuntivo(servizio: ServizioAggiuntivo): boolean;

    /**
     * Investe una parte del risparmio accumulato in un'associazione sportiva convenzionata.
     * @param associazione Nome dell'associazione sportiva.
     * @param importo Importo da investire.
     * @returns Un booleano che indica se l'investimento è andato a buon fine.
     */
    investiRisparmioInAssociazione(associazione: string, importo: number): boolean;
}

/**
 * Rappresenta un incentivo statale destinato a promuovere l'attività fisica e lo sport.
 */
export interface IIncentivo {
    codiceIdentificativo: string;
    nome: string;
    descrizione: string;
    valoreIncentivo?: number;
    criteriEleggibilita: string[];
    enteErogatore: string;
    dataInizioValidita: Date;
    dataFineValidita: Date;
    settore: Settore; // Usa l'enum Settore

    /**
     * Assegna l'incentivo a una startup qualificata.
     * @param startup La startup a cui assegnare l'incentivo.
     * @returns Un booleano che indica se l'assegnazione è stata registrata.
     */
    assegnaAStartup(startup: IStartup): boolean;
}

/**
 * Rappresenta una startup innovativa nel settore dello sport,
 * con nuove proprietà per la gestione dei bonus fiscali e delle associazioni.
 */
export interface IStartup {
    nome: string;
    settoreDiFocus: string; // Es. "tecnologie wearable", "app per il fitness", "attrezzature sportive innovative"
    descrizione: string;
    prodottiServiziOfferti: string[]; // Elenco dei prodotti o servizi che la startup offre
    cittadiniPartecipanti: ICittadino[]; // Nuovo array per tenere traccia dei cittadini che partecipano
    associazioniSportiveConvenzionate: string[]; // Elenco delle associazioni sportive partner

    /**
     * Permette alla startup di ricevere un incentivo statale specifico.
     * @param incentivo L'incentivo statale ricevuto.
     * @returns Un booleano che indica se l'incentivo è stato ricevuto con successo.
     */
    riceviIncentivo(incentivo: IIncentivo): boolean;

    /**
     * Registra la partecipazione di un cittadino alle attività/servizi della startup.
     * @param cittadino Il cittadino che partecipa.
     * @returns Un booleano che indica se la partecipazione è stata registrata.
     */
    registraPartecipazioneCittadino(cittadino: ICittadino): boolean;

    /**
     * Verifica l'idoneità di un cittadino per i bonus fiscali e aggiorna il suo stato.
     * @param cittadino Il cittadino da verificare.
     * @returns Un oggetto con l'idoneità ai bonus (isee, gas, elettrico, idrico).
     */
    verificaIdoneitaBonusFiscale(cittadino: ICittadino): { isee: boolean; gas: boolean; elettrico: boolean; idrico: boolean; };

    /**
     * Gestisce la richiesta di un servizio aggiuntivo da parte di un cittadino.
     * @param cittadino Il cittadino che richiede il servizio.
     * @param servizio Il tipo di servizio richiesto.
     * @returns Un booleano che indica se il servizio è stato gestito.
     */
    gestisciRichiestaServizioAggiuntivo(cittadino: ICittadino, servizio: ServizioAggiuntivo): boolean;

    /**
     * Registra l'investimento del risparmio di un cittadino in un'associazione sportiva.
     * @param cittadino Il cittadino che effettua l'investimento.
     * @param associazione Nome dell'associazione.
     * @param importo Importo investito.
     * @returns Un booleano che indica se l'investimento è stato registrato.
     */
    registraInvestimentoInAssociazione(cittadino: ICittadino, associazione: string, importo: number): boolean;
}

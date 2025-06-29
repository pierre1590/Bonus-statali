# Progetto TypeScript: Bonny e gli incentivi
Questo progetto TypeScript modella la struttura operativa della piattaforma Bonny, che facilita l'accesso dei cittadini ai bonus statali e promuove l'attività fisica e lo sport. Si concentra sulle interazioni tra la startup (Bonny), gli incentivi statali e i cittadini partecipanti, inclusi servizi fiscali aggiuntivi e l'investimento dei bonus in associazioni sportive.

<details open='open'>
   <summary>Table of Contents</summary>
   <ol>
        <li>
            <a href='#introduzione'>
                Introduzione
            </a>
        </li>
        <li>
            <a href='#architettura-del-progetto'>
                Architettura del Progetto
            </a>
        </li>
        <li>
            <a href='#funzionalità'>
                Funzionalità
            </a>
        </li>
        <li>
            <a href='Come iniziare'>
                Come Iniziare
            </a>
            <ol>
                <li>
                    <a href='#prerequisiti'>
                        Prerequisiti
                    </a>
                </li>
                <li>
                    <a href='#installazione'>
                        Installazione
                    </a>
                </li>
                <li>
                    <a href='#configurazione'>
                        Configurazione
                    </a>
                </li>
                <li>
                    <a href='#esecuzione'>
                        Esecuzione
                    </a>
                </li>
                </ol>
        </li>
        <li>
            <a href='#contatti'>
                Contatti
            </a>


## Introduzione
Il progetto simula un sistema attraverso cui i cittadini possono verificare la propria idoneità a diversi bonus statali (es. ISEE, Gas, Elettrico, Idrico) compilando un questionario fiscale. La piattaforma Bonny funge da intermediario, fornendo non solo la verifica dei bonus, ma anche servizi aggiuntivi come la richiesta di ISEE e 730. Inoltre, promuove attivamente il benessere, permettendo agli utenti di investire i risparmi ottenuti dai bonus in associazioni sportive convenzionate.

## Architettura del Progetto
Il progetto è strutturato seguendo i principi della programmazione orientata agli oggetti con TypeScript, diviso in tre moduli principali per chiarezza e manutenibilità:

1. interfaces.ts: Contiene tutte le definizioni delle interfacce (ICittadino, IIncentivo, IStartup). Queste definiscono il "contratto" o lo schema delle proprietà e dei metodi che ogni entità deve possedere.

2. classes.ts: Contiene le implementazioni concrete delle classi (Cittadino, Incentivo, Startup). Queste classi "danno vita" alle interfacce, fornendo la logica operativa e il comportamento di ciascuna entità.

3. main.ts: È il file principale che funge da punto di avvio del programma. Importa le classi necessarie, crea istanze delle entità e simula un flusso di interazioni per dimostrare il funzionamento del sistema.

## Funzionalità
La piattaforma Bonny e le sue interazioni supportano le seguenti funzionalità:

Verifica Idoneità Bonus: I cittadini compilano un questionario fiscale per determinare l'idoneità a bonus come ISEE, Gas, Elettrico e Idrico.

Gestione Dati Fiscali: Il sistema elabora i dati forniti tramite il codice fiscale e altre informazioni richieste.

Servizi Aggiuntivi: Possibilità di richiedere assistenza per la compilazione di ISEE e Modello 730.

Promozione Sport e Benessere: Gli utenti possono investire il risparmio ottenuto dai bonus in associazioni sportive convenzionate, presenti su una lista gestita da Bonny.

Assegnazione Incentivi: Le startup (come Bonny stessa) possono ricevere incentivi statali per supportare i loro progetti.

## Come Iniziare
Segui questi passaggi per configurare ed eseguire il progetto sul tuo ambiente locale.

## Prerequisiti
Assicurati di avere installato:

- Node.js (versione 14 o superiore consigliata)

- npm (viene installato con Node.js)

- TypeScript (npm install -g typescript)

## Installazione
1. Clona il repository:
   ```bash
   git clone https://github.com/pierre1590/Bonus-statali.git
    ```

2. Naviga nella cartella del progetto:
   ```bash
   cd Bonus-statali
   ```

3. Installa le dipendenze:
   ```bash
    npm install
    ```

## Configurazione
Il progetto include un file tsconfig.json nella radice, che configura il compilatore TypeScript. Non sono richieste modifiche immediate per l'esecuzione base, ma puoi personalizzarlo in base alle tue esigenze.

Contenuto di esempio di tsconfig.json:
```
{
    "compilerOptions": {
        "target": "es2020",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

## Esecuzione
1. Compila il codice TypeScript:
Esegui il compilatore TypeScript dalla radice del progetto. Questo creerà i file JavaScript compilati nella cartella dist/.
```bash
tsc
```
2. Esegui il codice JavaScript compilato:
Lancia il file main.js generato. L'output del programma sarà visibile nella console.

```bash
node dist/main.js
``` 

## Contatti
Autore Piero Sabino
- Linkedin: [https://www.linkedin.com/in/pierosabino/](https://www.linkedin.com/in/pierosabino/)
- Email: [piero.sa@icloud.com](mailto:
    piero.sa@icloud.com)
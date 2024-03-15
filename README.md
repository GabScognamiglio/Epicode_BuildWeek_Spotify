# Ricreazione della piattaforma streaming "Spotify"

## Descrizione
La nostra piattaforma offre una vasta collezione dei brani musicali, artisti locali e internazionali. Grazie al interfaccia molto semplice e intuitiva puoi fare la ricerca dei tuoi brani preferiti  o scoprire nuovi artisti e i successi del momento, tutto con la massima qualita del audio.

- **Ascolto illimitato** : Accedi a milioni di brani da tutto il mondo senza limiti. Ascolta la musica ovunque tu sia.

- **Playlist personalizzate** (in fase di svilupppo): La nostra piattaforma ti offre i brani musicali in base alle tue preferenze e i brani che hai ascoltato in precedenza. 

- **Scoperta Musicale** : Scopri i nuovi artisti e brani proposti nella nostra sezione "Buongiorno"

- **Un Player "Accativante"** : Sappiamo che anche l'occhio fa la sua parte e proprio per questo ci siamo impegnati molto a creare un player con un design unico, potrai sciegliere se vuoi ascoltare i tuoi brani preferiti con il player a tutto schermo o nella sua versione ridotta. 

- **Interfaccia Intuitiva** : La nostra piattaforma permette di fare la ricerca dei vostri brani preferiti grazie ad una interfaccia molto intuitiva e facile da usare, la divisione in sezioni ti permette di navigare in modo veloce, senza il bisogno di staccarti dalla tua musica preferita.

## Descrizione Tecnica

- **FrontEnd** : 

- HTML per la struttura della pagina
- CSS per lo stile e il layout
- JavaScript per la logica di interazione e la gestione degli eventi
- Bootstrap e FontAwesome per lo stile e le icone
- Una piccola quantità di script personalizzato per la gestione della riproduzione audio e la manipolazione del DOM

- **Api Esterna** : La nostra piattaforma utilizza un API (non quelle che fanno il miele) Dezzer esterna per accedere a cataloghi grazie alla sua architettura modulare e alle technologie moderne utilizzate.

## Descrizione delle pagine 

- **Pagina principale** :

 La pagina principale è suddivisa in due sezioni principali:

 - La barra laterale sinistra contiene i pulsanti per la navigazione tra la home e la pagina di ricerca.
 - La sezione principale mostra le informazioni sui brani in riproduzione, insieme a suggerimenti e playlist raccomandate.


- **Pagina Del Artista** :

La pagina del artista ha la struttura simile alla pagina principale, ossia:

- La barra laterale sinistra che contiene i tasti per tornare alla home page o andare nella pagina di ricerca con sotto la Libreria degli album del'utente
- La colonna destra invece che mostra le informazioni sull'artista selezionato, inclusa la sua immagine, il nome, il numero di fan e i brani popolari. Inoltre, viene visualizzata una sezione dedicata ai brani che l'utente ha messo mi piace.


- **Pagina Del Album** :

La pagina del Album e dedicata alla visualizzazione di informazioni dettagliate su un singolo album, inclusi i suoi brani e le informazioni pertinenti.
Presenta i seguenti elementi principali: 

- La barra laterale
- Informazioni sull'album: copertina, titolo, artista e altre informazioni rilevanti
- elenco dei brani completo che sono contenuti nel Album
- possibilità di riprodure direttamente dalla pagina del Album

- **Pagina del Player**: 

La pagina del player a tutto schermo contiene:

- Interfaccia utente semplice e intuitiva che permette di controllare la riproduzione musicale. Include un immagine di copertina, il titolo e il nome del artista della traccia in riproduzione. E presente una barra di progresso per indicare la posizione attuale della traccia e controlli per la riproduzione. infine e presente una barra per lo scorimento che permette di regolare il volume audio. 

- **Player Ridotto** : 

Nella parte bassa di ogni pagina tranne quella del player (per ragioni logiche) e presente un versione ridotta del player con tutte le funzionalita della pagina del Player, in modo che l'utente possa ascoltare la musica senza necessariamente usare il player a tutto schermo.  

## Requisiti

Per utilizzare la piattaforma, e necessario un dispositivo con accesso a Internet. e compattibile con la maggior parte dei browser moderni e puo essere accessibile da qualsiasi dispositivo. 

## Installazione 

e una piattaforma basata sul web e quindi non richiede alcuna installazione, basta solo l'accesso al internet. 


## Utilizzo 

1.  Accedi a >>>>> dal tuo browser.
2. Cerca brani, artisti o album che desideri ascoltare.
3. Esplora le playlist consigliate.

### Contribuire 

Se vuoi contribuire allo sviluppo di MyMusic, sei il benvenuto! Siamo sempre alla ricerca di nuove idee e miglioramenti per rendere MyMusic ancora migliore. Segui questi passaggi per contribuire:

1. Fork del repository
2. Crea un branch per la tua modifica (`git checkout -b feature/nome_feature`)
3. Committa le tue modifiche (`git commit -am 'Aggiunta una nuova feature'`)
4. Pusha il branch (`git push origin feature/nome_feature`)
5. Apri una Pull Request

 ### Autori

 - [Enrico Cirotto](https://github.com/enricocirotto)
 - [Fabio Gallingani](https://github.com/fabiogalli95)
 - [Kevin Loffredi](https://github.com/Kevin-Lof)
 - [Gabriele Scognamiglio](https://github.com/GabScognamiglio)
 - [Pavlo Pastushenko](https://github.com/PavloPastushenkoo)

 ### Licenza 

 Non c'è alcuna licenza su questo progetto.





export class ComConst {
    readonly CHR_zero: number = 0x00;
    readonly CHR_SOH: number = 0x01;
    readonly CHR_STX: number = 0x02;
    readonly CHR_ETX: number = 0x03;
    readonly CHR_EOT: number = 0x04;
    readonly CHR_ENQ: number = 0x05;
    readonly CHR_ACK: number = 0x06;
    readonly CHR_DLE: number = 0x16;
    readonly CHR_NACK: number = 0x21;
    readonly CHR_EM: number = 0x25;
    readonly CHR_WAIT: number = 0x64;
    readonly CHR_LF: number = 0x10;
    readonly CHR_CR: number = 0x13;
    readonly CHR_FS: number = 0x28;
    readonly CHR_RS: number = 0x30;
    readonly CHR_NULL: number = 0x00;
    readonly MAX_RETRY: number = 3;
    readonly LTH_PREAMBOLO: number = 7;
    readonly LTH_POSTAMBOLO: number = 4;
    readonly CHR_NUOVOPROTOCOLLO: string = "N";
    readonly CHR_PROTOCOLLOVELOCE: string = "V";
    readonly OPOSERR: number = 100;
    readonly UPOS_E_SUCCESS: number = 0;
    readonly UPOS_E_FAILURE: number = 11 + this.OPOSERR;
    readonly UPOS_E_TIMEOUT: number = 12 + this.OPOSERR;
    readonly UPOS_E_BUSY: number = 13 + this.OPOSERR;
    readonly UPOS_E_EXTENDED: number = 14 + this.OPOSERR;
    readonly UPOS_E_CONTINUED: number = 50 + this.OPOSERR;
    readonly FPTR_SUE_COVER_OPEN: number = 20;
    readonly FPTR_SUE_COVER_OK: number = 21;
    readonly FPTR_SUE_JRN_EMPTY: number = 22;
    readonly FPTR_SUE_JRN_NEAREMPTY: number = 23;
    readonly FPTR_SUE_JRN_PAPEROK: number = 24;
    readonly FPTR_SUE_REC_EMPTY: number = 25;
    readonly FPTR_SUE_REC_NEAREMPTY: number = 26;
    readonly FPTR_SUE_REC_PAPEROK: number = 27;
    readonly FPTR_SUE_SLP_EMPTY: number = 28;
    readonly FPTR_SUE_SLP_NEAREMPTY: number = 29;
    readonly FPTR_SUE_SLP_PAPEROK: number = 30;
    readonly FPTR_SUE_JRN_COVER_OPEN: number = 31;
    readonly FPTR_SUE_JRN_COVER_OK: number = 32;
    readonly FPTR_SUE_REC_COVER_OPEN: number = 33;
    readonly FPTR_SUE_REC_COVER_OK: number = 34;
    readonly FPTR_SUE_SLP_COVER_OPEN: number = 35;
    readonly FPTR_SUE_SLP_COVER_OK: number = 36;
    readonly UPOSERREXT: number = 200;
    readonly EFPTR_COVER_OPEN: number = 1 + this.UPOSERREXT;
    readonly EFPTR_JRN_EMPTY: number = 2 + this.UPOSERREXT;
    readonly EFPTR_REC_EMPTY: number = 3 + this.UPOSERREXT;
    readonly Cmd_Timeout: number = 5000;
    readonly Cmd_LongTimeout: number = 30000;
    readonly Cmd_LongTimeout_x: number = 60000;
    readonly hashtableAPP: { [key: string]: number } = {};

    constructor() {
        this.hashtableAPP["=c"] = this.Cmd_LongTimeout;    //Fattura  -1
        this.hashtableAPP["=C450"] = -1;  //EG
        this.hashtableAPP["=C451"] = -1;  //EG
        this.hashtableAPP["=C452"] = -1;  //EG
        this.hashtableAPP["=C453"] = -1;  //EG
        this.hashtableAPP["=C454"] = -1;  //EG
        this.hashtableAPP["=C455"] = -1;  //EG
        this.hashtableAPP["=C462"] = -1;  //EG
        this.hashtableAPP["=C400"] = -1;  //MF
        this.hashtableAPP["=C401"] = -1;  //MF
        this.hashtableAPP["=C403"] = -1;  //MF
        this.hashtableAPP["=C411"] = -1;  //Scarico XML corrispettivi inviati ad AdE
        this.hashtableAPP["=C419"] = -1;  //RT rigenerazione di una chiusura nel formato XML 
        this.hashtableAPP["=C421"] = -1;  //RT Download Pendenze
        this.hashtableAPP["=C422"] = -1;  //RT Invio Pendenze RT
        this.hashtableAPP["=C481"] = -1;  //RT Download Pendenze Lotteria
        this.hashtableAPP["=C482"] = -1;  //RT Invio XML Lotteria
        this.hashtableAPP["=C483"] = -1; //Giornaliero LOG
        this.hashtableAPP["=C488"] = -1;  //RT Lotteria
        this.hashtableAPP["=C489"] = -1;  //RT Lotteria
        this.hashtableAPP["=C500"] = -1; //Giornaliero Completo
        this.hashtableAPP["=C501"] = this.Cmd_LongTimeout; //Giornaliero Reparti
        this.hashtableAPP["=C502"] = -1; //Giornaliero PLU            
        this.hashtableAPP["=C503"] = this.Cmd_LongTimeout; //Giornaliero Finanziari
        this.hashtableAPP["=C508"] = this.Cmd_LongTimeout; //Giornaliero Iva
        this.hashtableAPP["=C510"] = -1; //Periodico Completo
        this.hashtableAPP["=C513"] = this.Cmd_LongTimeout; //Periodico Finanziari               
        this.hashtableAPP["=C514"] = this.Cmd_LongTimeout; //Giornaliero operatori
        this.hashtableAPP["=C516"] = this.Cmd_LongTimeout; //Giornaliero Fasce Orarie                                
        this.hashtableAPP["=C518"] = this.Cmd_LongTimeout; //Periodico Finanziari
        this.hashtableAPP["=C521"] = this.Cmd_LongTimeout; //Periodico Reparti
        this.hashtableAPP["=C522"] = -1; //Periodico PLU                
        this.hashtableAPP["=C524"] = this.Cmd_LongTimeout; //Periodico Operatori            
        this.hashtableAPP["=C528"] = this.Cmd_LongTimeout; //Scarica gli importi dell’IVA di uno specifico documento
        this.hashtableAPP["=C10"] = -1;  //LETTURA
        this.hashtableAPP[">>"] = -1;  //MF                 
        this.hashtableAPP["<<"] = this.Cmd_LongTimeout;  //DUMP PROGRAMMAZIONI
        this.hashtableAPP["=T"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity
        this.hashtableAPP["=T1"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T2"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T3"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T4"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T5"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T6"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T7"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T8"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T9"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=T10"] = this.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        this.hashtableAPP["=\""] = -1;  //EG
        this.hashtableAPP["=x"] = this.Cmd_LongTimeout_x; //EG
        this.hashtableAPP["=r"] = 180000; //Reso in modalità RT 3 minuti
        this.hashtableAPP["=k"] = 180000; //Annullo documento commerciale in modalità RT
        this.hashtableAPP["=C807"] = this.Cmd_LongTimeout_x; //Messa in Servizio e Disattivazione RT
        this.hashtableAPP["=C802"] = this.Cmd_LongTimeout_x; //Attivazione RT
        this.hashtableAPP["=C900"] = -1;  //RT Reboot
        this.hashtableAPP["=K"] = this.Cmd_Timeout;
        this.hashtableAPP["=C0"] = this.Cmd_Timeout;
        this.hashtableAPP["=C1"] = this.Cmd_Timeout;
        this.hashtableAPP["=C2"] = this.Cmd_Timeout;
        this.hashtableAPP["=C3"] = this.Cmd_Timeout;
        this.hashtableAPP["=C4"] = this.Cmd_Timeout;
        this.hashtableAPP["=C5"] = this.Cmd_Timeout;
    }
}
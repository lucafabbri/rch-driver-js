
/**
 * Protocol constants
 * @date 1/11/2022 - 3:48:49 PM
 *
 * @export
 * @class ComConst
 * @typedef {ComConst}
 */
export class ComConst {
    static readonly CHR_zero: number = 0;
    static readonly CHR_SOH: number = 1;
    static readonly CHR_STX: number = 2;
    static readonly CHR_ETX: number = 3;
    static readonly CHR_EOT: number = 4;
    static readonly CHR_ENQ: number = 5;
    static readonly CHR_ACK: number = 6;
    static readonly CHR_DLE: number = 16;
    static readonly CHR_NACK: number = 21;
    static readonly CHR_EM: number = 25;
    static readonly CHR_WAIT: number = 64;
    static readonly CHR_LF: number = 10;
    static readonly CHR_CR: number = 13;
    static readonly CHR_FS: number = 28;
    static readonly CHR_RS: number = 30;
    static readonly CHR_NULL: number = 0;
    static readonly MAX_RETRY: number = 3;
    static readonly LTH_PREAMBOLO: number = 7;
    static readonly LTH_POSTAMBOLO: number = 4;
    static readonly CHR_NUOVOPROTOCOLLO: string = "N";
    static readonly CHR_PROTOCOLLOVELOCE: string = "V";
    static readonly OPOSERR: number = 100;
    static readonly UPOS_E_SUCCESS: number = 0;
    static readonly UPOS_E_FAILURE: number = 11 + ComConst.OPOSERR;
    static readonly UPOS_E_TIMEOUT: number = 12 + ComConst.OPOSERR;
    static readonly UPOS_E_BUSY: number = 13 + ComConst.OPOSERR;
    static readonly UPOS_E_EXTENDED: number = 14 + ComConst.OPOSERR;
    static readonly UPOS_E_CONTINUED: number = 50 + ComConst.OPOSERR;
    static readonly FPTR_SUE_COVER_OPEN: number = 20;
    static readonly FPTR_SUE_COVER_OK: number = 21;
    static readonly FPTR_SUE_JRN_EMPTY: number = 22;
    static readonly FPTR_SUE_JRN_NEAREMPTY: number = 23;
    static readonly FPTR_SUE_JRN_PAPEROK: number = 24;
    static readonly FPTR_SUE_REC_EMPTY: number = 25;
    static readonly FPTR_SUE_REC_NEAREMPTY: number = 26;
    static readonly FPTR_SUE_REC_PAPEROK: number = 27;
    static readonly FPTR_SUE_SLP_EMPTY: number = 28;
    static readonly FPTR_SUE_SLP_NEAREMPTY: number = 29;
    static readonly FPTR_SUE_SLP_PAPEROK: number = 30;
    static readonly FPTR_SUE_JRN_COVER_OPEN: number = 31;
    static readonly FPTR_SUE_JRN_COVER_OK: number = 32;
    static readonly FPTR_SUE_REC_COVER_OPEN: number = 33;
    static readonly FPTR_SUE_REC_COVER_OK: number = 34;
    static readonly FPTR_SUE_SLP_COVER_OPEN: number = 35;
    static readonly FPTR_SUE_SLP_COVER_OK: number = 36;
    static readonly UPOSERREXT: number = 200;
    static readonly EFPTR_COVER_OPEN: number = 1 + ComConst.UPOSERREXT;
    static readonly EFPTR_JRN_EMPTY: number = 2 + ComConst.UPOSERREXT;
    static readonly EFPTR_REC_EMPTY: number = 3 + ComConst.UPOSERREXT;
    static readonly Cmd_Timeout: number = 5000;
    static readonly Cmd_LongTimeout: number = 30000;
    static readonly Cmd_LongTimeout_x: number = 60000;
    static readonly hashtableAPP: { [key: string]: number } = {};

    /**
     * Creates an instance of ComConst.
     * @date 1/11/2022 - 3:48:57 PM
     *
     * @constructor
     */
    constructor() {
        ComConst.hashtableAPP["=c"] = ComConst.Cmd_LongTimeout;    //Fattura  -1
        ComConst.hashtableAPP["=C450"] = -1;  //EG
        ComConst.hashtableAPP["=C451"] = -1;  //EG
        ComConst.hashtableAPP["=C452"] = -1;  //EG
        ComConst.hashtableAPP["=C453"] = -1;  //EG
        ComConst.hashtableAPP["=C454"] = -1;  //EG
        ComConst.hashtableAPP["=C455"] = -1;  //EG
        ComConst.hashtableAPP["=C462"] = -1;  //EG
        ComConst.hashtableAPP["=C400"] = -1;  //MF
        ComConst.hashtableAPP["=C401"] = -1;  //MF
        ComConst.hashtableAPP["=C403"] = -1;  //MF
        ComConst.hashtableAPP["=C411"] = -1;  //Scarico XML corrispettivi inviati ad AdE
        ComConst.hashtableAPP["=C419"] = -1;  //RT rigenerazione di una chiusura nel formato XML 
        ComConst.hashtableAPP["=C421"] = -1;  //RT Download Pendenze
        ComConst.hashtableAPP["=C422"] = -1;  //RT Invio Pendenze RT
        ComConst.hashtableAPP["=C481"] = -1;  //RT Download Pendenze Lotteria
        ComConst.hashtableAPP["=C482"] = -1;  //RT Invio XML Lotteria
        ComConst.hashtableAPP["=C483"] = -1; //Giornaliero LOG
        ComConst.hashtableAPP["=C488"] = -1;  //RT Lotteria
        ComConst.hashtableAPP["=C489"] = -1;  //RT Lotteria
        ComConst.hashtableAPP["=C500"] = -1; //Giornaliero Completo
        ComConst.hashtableAPP["=C501"] = ComConst.Cmd_LongTimeout; //Giornaliero Reparti
        ComConst.hashtableAPP["=C502"] = -1; //Giornaliero PLU            
        ComConst.hashtableAPP["=C503"] = ComConst.Cmd_LongTimeout; //Giornaliero Finanziari
        ComConst.hashtableAPP["=C508"] = ComConst.Cmd_LongTimeout; //Giornaliero Iva
        ComConst.hashtableAPP["=C510"] = -1; //Periodico Completo
        ComConst.hashtableAPP["=C513"] = ComConst.Cmd_LongTimeout; //Periodico Finanziari               
        ComConst.hashtableAPP["=C514"] = ComConst.Cmd_LongTimeout; //Giornaliero operatori
        ComConst.hashtableAPP["=C516"] = ComConst.Cmd_LongTimeout; //Giornaliero Fasce Orarie                                
        ComConst.hashtableAPP["=C518"] = ComConst.Cmd_LongTimeout; //Periodico Finanziari
        ComConst.hashtableAPP["=C521"] = ComConst.Cmd_LongTimeout; //Periodico Reparti
        ComConst.hashtableAPP["=C522"] = -1; //Periodico PLU                
        ComConst.hashtableAPP["=C524"] = ComConst.Cmd_LongTimeout; //Periodico Operatori            
        ComConst.hashtableAPP["=C528"] = ComConst.Cmd_LongTimeout; //Scarica gli importi dell’IVA di uno specifico documento
        ComConst.hashtableAPP["=C10"] = -1;  //LETTURA
        ComConst.hashtableAPP[">>"] = -1;  //MF                 
        ComConst.hashtableAPP["<<"] = ComConst.Cmd_LongTimeout;  //DUMP PROGRAMMAZIONI
        ComConst.hashtableAPP["=T"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity
        ComConst.hashtableAPP["=T1"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T2"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T3"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T4"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T5"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T6"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T7"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T8"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T9"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T10"] = ComConst.Cmd_LongTimeout;  //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=\""] = -1;  //EG
        ComConst.hashtableAPP["=x"] = ComConst.Cmd_LongTimeout_x; //EG
        ComConst.hashtableAPP["=r"] = 180000; //Reso in modalità RT 3 minuti
        ComConst.hashtableAPP["=k"] = 180000; //Annullo documento commerciale in modalità RT
        ComConst.hashtableAPP["=C807"] = ComConst.Cmd_LongTimeout_x; //Messa in Servizio e Disattivazione RT
        ComConst.hashtableAPP["=C802"] = ComConst.Cmd_LongTimeout_x; //Attivazione RT
        ComConst.hashtableAPP["=C900"] = -1;  //RT Reboot
        ComConst.hashtableAPP["=K"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C0"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C1"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C2"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C3"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C4"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C5"] = ComConst.Cmd_Timeout;
    }
}
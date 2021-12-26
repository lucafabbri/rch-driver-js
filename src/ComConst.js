"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComConst = void 0;
class ComConst {
    constructor() {
        ComConst.hashtableAPP["=c"] = ComConst.Cmd_LongTimeout; //Fattura  -1
        ComConst.hashtableAPP["=C450"] = -1; //EG
        ComConst.hashtableAPP["=C451"] = -1; //EG
        ComConst.hashtableAPP["=C452"] = -1; //EG
        ComConst.hashtableAPP["=C453"] = -1; //EG
        ComConst.hashtableAPP["=C454"] = -1; //EG
        ComConst.hashtableAPP["=C455"] = -1; //EG
        ComConst.hashtableAPP["=C462"] = -1; //EG
        ComConst.hashtableAPP["=C400"] = -1; //MF
        ComConst.hashtableAPP["=C401"] = -1; //MF
        ComConst.hashtableAPP["=C403"] = -1; //MF
        ComConst.hashtableAPP["=C411"] = -1; //Scarico XML corrispettivi inviati ad AdE
        ComConst.hashtableAPP["=C419"] = -1; //RT rigenerazione di una chiusura nel formato XML 
        ComConst.hashtableAPP["=C421"] = -1; //RT Download Pendenze
        ComConst.hashtableAPP["=C422"] = -1; //RT Invio Pendenze RT
        ComConst.hashtableAPP["=C481"] = -1; //RT Download Pendenze Lotteria
        ComConst.hashtableAPP["=C482"] = -1; //RT Invio XML Lotteria
        ComConst.hashtableAPP["=C483"] = -1; //Giornaliero LOG
        ComConst.hashtableAPP["=C488"] = -1; //RT Lotteria
        ComConst.hashtableAPP["=C489"] = -1; //RT Lotteria
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
        ComConst.hashtableAPP["=C10"] = -1; //LETTURA
        ComConst.hashtableAPP[">>"] = -1; //MF                 
        ComConst.hashtableAPP["<<"] = ComConst.Cmd_LongTimeout; //DUMP PROGRAMMAZIONI
        ComConst.hashtableAPP["=T"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity
        ComConst.hashtableAPP["=T1"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T2"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T3"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T4"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T5"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T6"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T7"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T8"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T9"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=T10"] = ComConst.Cmd_LongTimeout; //Gestione caso assenza opzione fidelity 
        ComConst.hashtableAPP["=\""] = -1; //EG
        ComConst.hashtableAPP["=x"] = ComConst.Cmd_LongTimeout_x; //EG
        ComConst.hashtableAPP["=r"] = 180000; //Reso in modalità RT 3 minuti
        ComConst.hashtableAPP["=k"] = 180000; //Annullo documento commerciale in modalità RT
        ComConst.hashtableAPP["=C807"] = ComConst.Cmd_LongTimeout_x; //Messa in Servizio e Disattivazione RT
        ComConst.hashtableAPP["=C802"] = ComConst.Cmd_LongTimeout_x; //Attivazione RT
        ComConst.hashtableAPP["=C900"] = -1; //RT Reboot
        ComConst.hashtableAPP["=K"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C0"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C1"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C2"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C3"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C4"] = ComConst.Cmd_Timeout;
        ComConst.hashtableAPP["=C5"] = ComConst.Cmd_Timeout;
    }
}
exports.ComConst = ComConst;
ComConst.CHR_zero = 0x00;
ComConst.CHR_SOH = 0x01;
ComConst.CHR_STX = 0x02;
ComConst.CHR_ETX = 0x03;
ComConst.CHR_EOT = 0x04;
ComConst.CHR_ENQ = 0x05;
ComConst.CHR_ACK = 0x06;
ComConst.CHR_DLE = 0x16;
ComConst.CHR_NACK = 0x21;
ComConst.CHR_EM = 0x25;
ComConst.CHR_WAIT = 0x64;
ComConst.CHR_LF = 0x10;
ComConst.CHR_CR = 0x13;
ComConst.CHR_FS = 0x28;
ComConst.CHR_RS = 0x30;
ComConst.CHR_NULL = 0x00;
ComConst.MAX_RETRY = 3;
ComConst.LTH_PREAMBOLO = 7;
ComConst.LTH_POSTAMBOLO = 4;
ComConst.CHR_NUOVOPROTOCOLLO = "N";
ComConst.CHR_PROTOCOLLOVELOCE = "V";
ComConst.OPOSERR = 100;
ComConst.UPOS_E_SUCCESS = 0;
ComConst.UPOS_E_FAILURE = 11 + ComConst.OPOSERR;
ComConst.UPOS_E_TIMEOUT = 12 + ComConst.OPOSERR;
ComConst.UPOS_E_BUSY = 13 + ComConst.OPOSERR;
ComConst.UPOS_E_EXTENDED = 14 + ComConst.OPOSERR;
ComConst.UPOS_E_CONTINUED = 50 + ComConst.OPOSERR;
ComConst.FPTR_SUE_COVER_OPEN = 20;
ComConst.FPTR_SUE_COVER_OK = 21;
ComConst.FPTR_SUE_JRN_EMPTY = 22;
ComConst.FPTR_SUE_JRN_NEAREMPTY = 23;
ComConst.FPTR_SUE_JRN_PAPEROK = 24;
ComConst.FPTR_SUE_REC_EMPTY = 25;
ComConst.FPTR_SUE_REC_NEAREMPTY = 26;
ComConst.FPTR_SUE_REC_PAPEROK = 27;
ComConst.FPTR_SUE_SLP_EMPTY = 28;
ComConst.FPTR_SUE_SLP_NEAREMPTY = 29;
ComConst.FPTR_SUE_SLP_PAPEROK = 30;
ComConst.FPTR_SUE_JRN_COVER_OPEN = 31;
ComConst.FPTR_SUE_JRN_COVER_OK = 32;
ComConst.FPTR_SUE_REC_COVER_OPEN = 33;
ComConst.FPTR_SUE_REC_COVER_OK = 34;
ComConst.FPTR_SUE_SLP_COVER_OPEN = 35;
ComConst.FPTR_SUE_SLP_COVER_OK = 36;
ComConst.UPOSERREXT = 200;
ComConst.EFPTR_COVER_OPEN = 1 + ComConst.UPOSERREXT;
ComConst.EFPTR_JRN_EMPTY = 2 + ComConst.UPOSERREXT;
ComConst.EFPTR_REC_EMPTY = 3 + ComConst.UPOSERREXT;
ComConst.Cmd_Timeout = 5000;
ComConst.Cmd_LongTimeout = 30000;
ComConst.Cmd_LongTimeout_x = 60000;
ComConst.hashtableAPP = {};

import { User } from "./user";

export interface Commande {
    idCommande?: number
    dateCommande: Date
    statutCommande: string
    utilisateurId: number
}

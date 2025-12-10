import { Vinyle } from "../components/catalogue/catalogue"
import { Commande } from "./commande"

export interface LigneCommande {
    idLigne?: number
    idCommande: number
    idVinyle: number
    quantite: number
}

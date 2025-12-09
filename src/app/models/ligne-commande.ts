import { Vinyle } from "../components/catalogue/catalogue"
import { Commande } from "./commande"

export interface LigneCommande {
    idLigne?: number
    quantite: number
    commande: Commande | null
    vinyle: Vinyle
}

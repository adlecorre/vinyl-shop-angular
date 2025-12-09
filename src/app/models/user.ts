export interface User {
    id?: number
    email:string
    motDePasse: string
    prenom?: string
    nom?: string
    adresse?: string
    dateNaissance?: Date
    numTel?: string
    role: string
}

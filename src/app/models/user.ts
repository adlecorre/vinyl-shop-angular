export interface User {
    email:string
    motDePasse: string
    prenom?: string
    nom?: string
    adresse?: string
    dateNaissance?: Date
    numTel?: string
    role: string
}

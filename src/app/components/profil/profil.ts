import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class ProfilComponent implements OnInit {
  profilForm!: FormGroup; 
  currentUser!: User;
  
  constructor(private fb: FormBuilder, private userService: UserService) {}
  
  ngOnInit() {
  // FormGroup vide
  this.profilForm = this.fb.group({
    nom: [''],
    prenom: [''],
    email: [''],
    motDePasse: [''],
    adresse: [''],
    telephone: [''],
    date_naissance: [''],
    role: ['']
  });

  // Charger l'utilisateur depuis le service
  this.userService.getCurrentUser().subscribe({
    next: (user) => {
      this.currentUser = user;
      this.profilForm.patchValue({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        motDePasse: user.motDePasse,
        role: user.role,
        adresse: user.adresse,
        telephone: user.numTel,
        date_naissance: user.dateNaissance
      });
    },
    error: (err) => console.error('Erreur récupération utilisateur :', err)
  });
}


  onSubmit() {
    if (this.profilForm.invalid) return;

    const updatedUser = this.profilForm.getRawValue();
    // this.userService.updateUser(this.currentUser.id, updatedUser).subscribe({
    //   next: (res) => {
    //     console.log('Utilisateur mis à jour', res);
    //   },
    //   error: (err) => console.error('Erreur update :', err)
    // });
  }
}

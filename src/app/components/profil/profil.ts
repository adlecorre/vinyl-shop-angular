// profil.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class ProfilComponent implements OnInit {
  profilForm!: FormGroup;
  currentUser!: User;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.profilForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [{ value: '', disabled: true }],
      motDePasse: [''],
      adresse: [''],
      telephone: [''],
      date_naissance: [''],
      role: [{ value: '', disabled: true }]
    });

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profilForm.patchValue({
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          motDePasse: '',
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

    const formValues = this.profilForm.getRawValue();
    const updatedUser: User = {
      ...this.currentUser,
      nom: formValues.nom,
      prenom: formValues.prenom,
      adresse: formValues.adresse,
      numTel: formValues.telephone,
      dateNaissance: formValues.date_naissance
    };

    if (formValues.motDePasse) {
      updatedUser.motDePasse = formValues.motDePasse;
    }

    this.userService.updateUser(this.currentUser.id!, updatedUser).subscribe({
      next: (res) => {
        this.currentUser = res;
        this.successMessage = 'Profil mis à jour avec succès !';
        this.cdr.detectChanges(); 
        
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges(); 
        }, 4000);
      },
      error: (err) => console.error('Erreur update :', err)
    });
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class ProfilComponent {

  profilForm: FormGroup;

  constructor(private fb: FormBuilder) {

    // Simuler un utilisateur connecté
    const user = {
      id: 1,
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@example.com',
      telephone: '0123456789',
      adresse: '12 rue de Paris, Paris',
      date_naissance: '1985-04-12',
      role: 'CLIENT',
      password: 'pass123'
    };

    this.profilForm = this.fb.group({
      nom: [user.nom, Validators.required],
      prenom: [user.prenom, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      telephone: [user.telephone],
      adresse: [user.adresse],
      date_naissance: [user.date_naissance, Validators.required],
      password: [user.password, Validators.required], 
      role: [{ value: user.role, disabled: true }] // non modifiable
    });
  }

  onSubmit() {
    if (this.profilForm.invalid) return;

    const updatedUser = this.profilForm.getRawValue();
    console.log('Profil modifié :', updatedUser);

    // this.userService.update(updatedUser).subscribe(...)
  }
}

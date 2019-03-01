import { InjectionToken } from "@angular/core";


export interface NavigationData {
    logoUrl: string,
    tabs: Array<{ text: string, href: string, id: string }>,
 }

export const navigationData: NavigationData = {
    logoUrl: 'assets/images/icon.jpg',
    tabs: [{
        text: "¿Quiénes somos?",
        href: '/about',
        id: 'about',
     }, {
        text: "¿Qué ofrecemos?",
        href: '/store',
        id: 'store',
     }, {
        text: "Únete",
        href: '/join',
        id: 'join',
     }],
};

export const navigationDataToken = new InjectionToken('navigationDataToken');

export interface SessionData {
    defaults: {
      sessionType: string,
      userType: string,
   },
}

export const sessionData: SessionData = {
    defaults: {
       sessionType: 'signup',
       userType: 'psicontacto',
    },
};

export const sessionDataToken = new InjectionToken('sessionDataToken');

export interface FormData {
   validation: {
      duplicateEmail: string,
      duplicateUsername: string,
      email: string,
      name: string,
      password: string,
      username: string,
   }
 }

export const formData: FormData = {
   validation: {
      duplicateEmail: 'Correo electrónico ya existe.',
      duplicateUsername: 'Usuario ya existe.',
      email: 'Correo electrónico inválido.',
      name: 'Sólo \'a-Z\' y \'-\'.',
      password: 'Contraseñas no coinciden.',
      username: 'Sólo \'a-Z\', \'0-9\' y \'-_\'.',
   },
};

export const formDataToken = new InjectionToken('FormDataToken');
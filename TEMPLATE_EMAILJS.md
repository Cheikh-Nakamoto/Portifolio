# 📧 Template EmailJS - Configuration

## 🎨 Template HTML fourni

Tu as un super template HTML ! Voici comment le configurer dans EmailJS.

## 📋 Configuration du Template EmailJS

### 1. Aller dans Email Templates

1. Connecte-toi sur https://dashboard.emailjs.com
2. Clique sur **Email Templates** dans le menu
3. Clique sur **Create New Template**

### 2. Configurer le template

#### **Template Name** (nom interne)
```
Portfolio Contact Form
```

#### **Subject** (sujet de l'email)
```
Nouveau message de {{name}} - Portfolio
```

#### **Content** (corps de l'email)

Colle exactement ce HTML :

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div>A message by {{name}} has been received. Kindly respond at your earliest convenience.</div>
  <div
    style="
      margin-top: 20px;
      padding: 15px 0;
      border-width: 1px 0;
      border-style: dashed;
      border-color: lightgrey;
    "
  >
    <table role="presentation">
      <tr>
        <td style="vertical-align: top">
          <div
            style="
              padding: 6px 10px;
              margin: 0 10px;
              background-color: aliceblue;
              border-radius: 5px;
              font-size: 26px;
            "
            role="img"
          >
            👤
          </div>
        </td>
        <td style="vertical-align: top">
          <div style="color: #2c3e50; font-size: 16px">
            <strong>{{name}}</strong>
          </div>
          <div style="color: #cccccc; font-size: 13px">{{time}}</div>
          <p style="font-size: 16px">{{message}}</p>
        </td>
      </tr>
    </table>
  </div>
  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed lightgrey;">
    <p style="font-size: 14px; color: #666;">
      <strong>Email de contact :</strong> {{email}}
    </p>
    <p style="font-size: 12px; color: #999;">
      Message envoyé depuis le portfolio de Cheikh Mounirou Coly Diouf
    </p>
  </div>
</div>
```

#### **Reply-To** (email de réponse)
```
{{email}}
```

Cela permet de répondre directement à la personne qui t'a contacté.

#### **From Name** (nom de l'expéditeur)
```
Portfolio - {{name}}
```

### 3. Tester le template

1. Clique sur **Test It** dans EmailJS
2. Remplis les variables de test :
   - `name`: John Doe
   - `email`: john@example.com
   - `message`: Ceci est un message de test
   - `time`: 12/10/2024, 15:30
3. Clique sur **Send Test Email**
4. Vérifie ta boîte email !

### 4. Sauvegarder

1. Clique sur **Save** en haut
2. **Copie le Template ID** (ex: `template_abc123`)

## ✅ Variables utilisées

Le code envoie automatiquement ces variables :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `{{name}}` | Nom complet de l'expéditeur | "John Doe" |
| `{{email}}` | Email de l'expéditeur | "john@example.com" |
| `{{message}}` | Message complet | "Bonjour, j'aimerais..." |
| `{{time}}` | Date et heure d'envoi | "12/10/2024, 15:30" |

## 📧 Aperçu de l'email reçu

Quand quelqu'un t'envoie un message, tu recevras un email comme :

```
Sujet : Nouveau message de John Doe - Portfolio

┌────────────────────────────────────────────┐
│ A message by John Doe has been received.  │
│ Kindly respond at your earliest            │
│ convenience.                               │
├────────────────────────────────────────────┤
│                                            │
│  👤   John Doe                             │
│      12/10/2024, 15:30                     │
│                                            │
│      Bonjour,                              │
│      J'aimerais discuter d'un projet...    │
│                                            │
├────────────────────────────────────────────┤
│ Email de contact : john@example.com        │
│ Message envoyé depuis le portfolio de      │
│ Cheikh Mounirou Coly Diouf                 │
└────────────────────────────────────────────┘
```

## 🎨 Personnalisation

Tu peux modifier le template pour :

### Changer l'emoji
```html
<div role="img">
  💌  <!-- Au lieu de 👤 -->
</div>
```

### Ajouter des couleurs
```html
<div style="background-color: #00ff87; color: white; padding: 20px;">
  Nouveau message reçu !
</div>
```

### Ajouter des champs

Si tu veux ajouter un champ "Téléphone" ou "Entreprise" :

1. Ajoute dans le template :
```html
<p><strong>Téléphone :</strong> {{phone}}</p>
<p><strong>Entreprise :</strong> {{company}}</p>
```

2. Mets à jour le formulaire dans `Contact.tsx`

## 🔧 Configuration finale

Après avoir créé le template :

1. **Copie le Template ID** dans EmailJS
2. **Ouvre `.env.local`** dans ton projet
3. **Remplace** :
```env
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=ton_template_id_ici
```

4. **Redémarre** le serveur :
```bash
npm run dev
```

## ✅ Test final

1. Va sur http://localhost:3000/#contact
2. Remplis le formulaire
3. Envoie
4. Vérifie ton email → Tu devrais recevoir le message avec le beau template !

---

**Ton formulaire de contact est maintenant professionnel et élégant ! 🎉**

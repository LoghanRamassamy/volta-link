export type Language = "en" | "fr";

export const translations = {
  en: {
    errors: {
      defaultGatewayError: "An error occurred while communicating with the server.",
    },
    form: {
      copied: "Copied! ✅",
      copy: "Copy",
      customCodeLabel: "Custom Code (Optional)",
      customCodePlaceholder: "Ex: my-code",
      expiresLabel: "Expiration Date (Optional)",
      resultLabel: "Your short link is ready:",
      submit: "Shorten URL",
      submitLoading: "Generating short link...",
      urlLabel: "URL to shorten",
      urlPlaceholder: "https://example.com/a/very/long/link/to/shorten",
    },
    header: {
      subtitle: "Shorten your links instantly with enhanced security",
      title: "⚡ VOLTA LINK",
    },
    history: {
      action: "Action",
      copied: "Copied!",
      copy: "Copy",
      created: "Created",
      expPrefix: "Exp:",
      expiration: "Expiration",
      expired: "Expired",
      never: "Never",
      originalUrl: "Original URL",
      shortCode: "Short Code",
      title: "📋 Recent Links",
    },
    toast: {
      success: "Link copied successfully!",
    },
  },
  fr: {
    errors: {
      defaultGatewayError: "Une erreur est survenue lors de la communication avec le serveur.",
    },
    form: {
      copied: "Copié ! ✅",
      copy: "Copier",
      customCodeLabel: "Code Personnalisé (Optionnel)",
      customCodePlaceholder: "Ex: mon-code",
      expiresLabel: "Date d'Expiration (Optionnelle)",
      resultLabel: "Votre lien raccourci est prêt :",
      submit: "Raccourcir l'URL",
      submitLoading: "Génération du lien en cours...",
      urlLabel: "Adresse URL à réduire",
      urlPlaceholder: "https://example.com/un/lien/tres/long/a/reduire",
    },
    header: {
      subtitle: "Raccourcissez vos liens instantanément avec une sécurité renforcée",
      title: "⚡ VOLTA LINK",
    },
    history: {
      action: "Action",
      copied: "Copié !",
      copy: "Copier",
      created: "Création",
      expPrefix: "Exp :",
      expiration: "Expiration",
      expired: "Expiré",
      never: "Jamais",
      originalUrl: "URL Originale",
      shortCode: "Code Court",
      title: "📋 Liens Récents",
    },
    toast: {
      success: "Lien copié avec succès !",
    },
  },
};

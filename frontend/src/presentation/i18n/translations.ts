export type Language = 'en' | 'fr';

export const translations = {
  en: {
    header: {
      title: '⚡ VOLTA LINK',
      subtitle: 'Shorten your links instantly with enhanced security',
    },
    form: {
      urlLabel: 'URL to shorten',
      urlPlaceholder: 'https://example.com/a/very/long/link/to/shorten',
      customCodeLabel: 'Custom Code (Optional)',
      customCodePlaceholder: 'Ex: my-code',
      expiresLabel: 'Expiration Date (Optional)',
      submitLoading: 'Generating short link...',
      submit: 'Shorten URL',
      resultLabel: 'Your short link is ready:',
      copied: 'Copied! ✅',
      copy: 'Copy',
    },
    history: {
      title: '📋 Recent Links',
      originalUrl: 'Original URL',
      shortCode: 'Short Code',
      created: 'Created',
      expiration: 'Expiration',
      action: 'Action',
      expired: 'Expired',
      expPrefix: 'Exp:',
      never: 'Never',
      copied: 'Copied!',
      copy: 'Copy',
    },
    toast: {
      success: 'Link copied successfully!',
    },
    errors: {
      defaultGatewayError: 'An error occurred while communicating with the server.',
    }
  },
  fr: {
    header: {
      title: '⚡ VOLTA LINK',
      subtitle: 'Raccourcissez vos liens instantanément avec une sécurité renforcée',
    },
    form: {
      urlLabel: 'Adresse URL à réduire',
      urlPlaceholder: 'https://example.com/un/lien/tres/long/a/reduire',
      customCodeLabel: 'Code Personnalisé (Optionnel)',
      customCodePlaceholder: 'Ex: mon-code',
      expiresLabel: 'Date d\'Expiration (Optionnelle)',
      submitLoading: 'Génération du lien en cours...',
      submit: 'Raccourcir l\'URL',
      resultLabel: 'Votre lien raccourci est prêt :',
      copied: 'Copié ! ✅',
      copy: 'Copier',
    },
    history: {
      title: '📋 Liens Récents',
      originalUrl: 'URL Originale',
      shortCode: 'Code Court',
      created: 'Création',
      expiration: 'Expiration',
      action: 'Action',
      expired: 'Expiré',
      expPrefix: 'Exp :',
      never: 'Jamais',
      copied: 'Copié !',
      copy: 'Copier',
    },
    toast: {
      success: 'Lien copié avec succès !',
    },
    errors: {
      defaultGatewayError: 'Une erreur est survenue lors de la communication avec le serveur.',
    }
  }
};

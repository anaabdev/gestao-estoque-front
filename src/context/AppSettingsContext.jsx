import { useEffect, useMemo, useState } from "react";
import { AppSettingsContext } from "./AppSettingsContext.js";

const SETTINGS_KEY = "gestao-estoque-preferencias";

const messages = {
  en: {
    "brand.logo": "Site logo",
    "nav.home": "Home",
    "nav.profile": "Profile",
    "nav.settings": "Settings",
    "nav.logout": "Log out",
    "nav.mainNavigation": "Main navigation",
    "common.close": "Close",
    "common.cancel": "Cancel",
    "common.save": "Save changes",
    "home.eyebrow": "STOCK MANAGEMENT",
    "home.title": "Inventory",
    "home.add": "Add a product",
    "home.welcome": "Welcome to your inventory",
    "home.welcomeText": "Keep track of your products and stock levels.",
    "home.productCount": "Products in inventory",
    "home.lowStock": "Low stock",
    "home.lessThan": "less than {limit} available",
    "home.products": "Products",
    "home.manageProducts": "Manage the items you have in stock.",
    "home.selected": "selected",
    "home.removeSelected": "Remove selected",
    "home.allProducts": "All products",
    "home.product": "Product",
    "home.category": "Category",
    "home.uncategorized": "Uncategorized",
    "home.price": "Price",
    "home.quantity": "Quantity",
    "home.status": "Status",
    "home.active": "Active",
    "home.inactive": "Inactive",
    "home.filterProducts": "Filter products",
    "home.selectAll": "Select all visible products",
    "home.selectProduct": "Select {name}",
    "home.actions": "Actions",
    "home.edit": "Edit",
    "home.editProduct": "Edit {name}",
    "home.removeProduct": "Remove {name}",
    "home.noLowStock": "No products with low stock",
    "home.everythingStocked": "Everything is sufficiently stocked.",
    "home.inventoryEmpty": "Your inventory is empty",
    "home.addFirstProduct": "Add your first product to get started.",
    "home.modalTitle": "Add a product",
    "home.editModalTitle": "Edit product",
    "home.name": "name:",
    "home.namePlaceholder": "Product name",
    "home.description": "Description",
    "home.descriptionPlaceholder": "Product details",
    "home.descriptionLimit": "{count}/{max} characters",
    "home.categoryPlaceholder": "Choose a category",
    "home.manageCategories": "Categories",
    "home.addCategory": "Add category",
    "home.categoryName": "Category name",
    "home.categoryNamePlaceholder": "Enter a category name",
    "home.categoryNameRequired": "Enter a category name.",
    "home.categoriesEmpty": "No categories yet.",
    "home.categorySaveFailed": "Could not save the category.",
    "home.saveProduct": "Save product",
    "home.updateProduct": "Save changes",
    "home.loading": "Loading products…",
    "home.loadError": "Could not load inventory.",
    "home.productSaveFailed": "Could not save the product.",
    "home.quantitySaveFailed": "Could not update the quantity.",
    "home.quantitySaved": "Quantity saved",
    "home.nameRequired": "Enter a product name.",
    "home.priceInvalid": "Enter a valid price (zero or more).",
    "home.quantityInvalid": "Enter a whole quantity (zero or more).",
    "home.productFieldsRequired": "Enter a valid price and a whole stock quantity of zero or more.",
    "home.updateCategory": "Update category",
    "home.categoryDeleteFailed": "Could not delete the category.",
    "home.editCategory": "Edit {name}",
    "home.removeCategory": "Remove {name}",
    "profile.eyebrow": "ACCOUNT SETTINGS",
    "profile.title": "My profile",
    "profile.yourAccount": "Your account",
    "profile.intro": "Manage your personal details and keep your account up to date.",
    "profile.personalData": "Personal data",
    "profile.personalHelp": "These details help identify your account.",
    "profile.fullName": "Full name",
    "profile.fullNamePlaceholder": "Enter your full name",
    "profile.birthday": "Birthday",
    "profile.saved": "Personal data saved in this browser.",
    "profile.saveFailed": "Could not save your details in this browser.",
    "profile.passwordTitle": "Change password",
    "profile.passwordHelp": "Choose a new password to protect your account.",
    "profile.currentPassword": "Current password",
    "profile.currentPasswordPlaceholder": "Enter your current password",
    "profile.newPassword": "New password",
    "profile.newPasswordPlaceholder": "At least 8 characters",
    "profile.passwordMinLength": "Use at least 8 characters for the new password.",
    "profile.passwordUnavailable": "Password changes need a connected account service.",
    "profile.changePassword": "Change password",
    "settings.eyebrow": "PREFERENCES",
    "settings.title": "Settings",
    "settings.introTitle": "Make the app yours",
    "settings.intro": "Choose how the inventory looks and which language it uses.",
    "settings.appearance": "Appearance",
    "settings.appearanceHelp": "Choose the color theme for the whole app.",
    "settings.dark": "Dark",
    "settings.darkDescription": "Easy on the eyes in low light.",
    "settings.light": "Light",
    "settings.lightDescription": "A bright, clear workspace.",
    "settings.language": "Language",
    "settings.languageHelp": "Choose the language used throughout the app.",
    "settings.english": "English",
    "settings.portuguese": "Português",
    "settings.appliedImmediately": "Your preferences are saved on this browser and apply immediately.",
    "settings.reset": "Restore defaults",
    "settings.resetDone": "Default preferences restored.",
    "settings.resetHelp": "Return to English and the dark theme.",
    "login.title": "Sign in with email",
    "login.email": "Email",
    "login.password": "Password",
    "login.showPassword": "Show password",
    "login.forgot": "Forgot password?",
    "login.getStarted": "Get Started",
    "login.createAccount": "Create an account",
    "login.footer": "All rights reserved 2026",
  },
  pt: {
    "brand.logo": "Logo do site",
    "nav.home": "Início",
    "nav.profile": "Perfil",
    "nav.settings": "Configurações",
    "nav.logout": "Sair",
    "nav.mainNavigation": "Navegação principal",
    "common.close": "Fechar",
    "common.cancel": "Cancelar",
    "common.save": "Salvar alterações",
    "home.eyebrow": "GESTÃO DE ESTOQUE",
    "home.title": "Estoque",
    "home.add": "Adicionar produto",
    "home.welcome": "Bem-vindo ao seu estoque",
    "home.welcomeText": "Acompanhe seus produtos e níveis de estoque.",
    "home.productCount": "Produtos no estoque",
    "home.lowStock": "Estoque baixo",
    "home.lessThan": "menos de {limit} disponíveis",
    "home.products": "Produtos",
    "home.manageProducts": "Gerencie os itens que você tem em estoque.",
    "home.selected": "selecionado(s)",
    "home.removeSelected": "Remover selecionados",
    "home.allProducts": "Todos os produtos",
    "home.product": "Produto",
    "home.category": "Categoria",
    "home.uncategorized": "Sem categoria",
    "home.price": "Preço",
    "home.quantity": "Quantidade",
    "home.status": "Status",
    "home.active": "Ativo",
    "home.inactive": "Inativo",
    "home.filterProducts": "Filtrar produtos",
    "home.selectAll": "Selecionar todos os produtos visíveis",
    "home.selectProduct": "Selecionar {name}",
    "home.actions": "Ações",
    "home.edit": "Editar",
    "home.editProduct": "Editar {name}",
    "home.removeProduct": "Remover {name}",
    "home.noLowStock": "Nenhum produto com estoque baixo",
    "home.everythingStocked": "Todos os produtos têm estoque suficiente.",
    "home.inventoryEmpty": "Seu estoque está vazio",
    "home.addFirstProduct": "Adicione seu primeiro produto para começar.",
    "home.modalTitle": "Adicionar produto",
    "home.editModalTitle": "Editar produto",
    "home.name": "nome:",
    "home.namePlaceholder": "Nome do produto",
    "home.description": "Descrição",
    "home.descriptionPlaceholder": "Detalhes do produto",
    "home.descriptionLimit": "{count}/{max} caracteres",
    "home.categoryPlaceholder": "Escolha uma categoria",
    "home.manageCategories": "Categorias",
    "home.addCategory": "Adicionar categoria",
    "home.categoryName": "Nome da categoria",
    "home.categoryNamePlaceholder": "Digite o nome da categoria",
    "home.categoryNameRequired": "Informe o nome da categoria.",
    "home.categoriesEmpty": "Nenhuma categoria cadastrada.",
    "home.categorySaveFailed": "Não foi possível salvar a categoria.",
    "home.saveProduct": "Salvar produto",
    "home.updateProduct": "Salvar alterações",
    "home.loading": "Carregando produtos…",
    "home.loadError": "Não foi possível carregar o estoque.",
    "home.productSaveFailed": "Não foi possível salvar o produto.",
    "home.quantitySaveFailed": "Não foi possível atualizar a quantidade.",
    "home.quantitySaved": "Quantidade salva",
    "home.nameRequired": "Informe o nome do produto.",
    "home.priceInvalid": "Informe um preço válido (zero ou mais).",
    "home.quantityInvalid": "Informe uma quantidade inteira (zero ou mais).",
    "home.productFieldsRequired": "Informe um preço válido e uma quantidade inteira igual ou maior que zero.",
    "home.updateCategory": "Atualizar categoria",
    "home.categoryDeleteFailed": "Não foi possível excluir a categoria.",
    "home.editCategory": "Editar {name}",
    "home.removeCategory": "Remover {name}",
    "profile.eyebrow": "CONFIGURAÇÕES DA CONTA",
    "profile.title": "Meu perfil",
    "profile.yourAccount": "Sua conta",
    "profile.intro": "Gerencie seus dados pessoais e mantenha sua conta atualizada.",
    "profile.personalData": "Dados pessoais",
    "profile.personalHelp": "Esses dados ajudam a identificar sua conta.",
    "profile.fullName": "Nome completo",
    "profile.fullNamePlaceholder": "Digite seu nome completo",
    "profile.birthday": "Data de nascimento",
    "profile.saved": "Dados pessoais salvos neste navegador.",
    "profile.saveFailed": "Não foi possível salvar seus dados neste navegador.",
    "profile.passwordTitle": "Alterar senha",
    "profile.passwordHelp": "Escolha uma nova senha para proteger sua conta.",
    "profile.currentPassword": "Senha atual",
    "profile.currentPasswordPlaceholder": "Digite sua senha atual",
    "profile.newPassword": "Nova senha",
    "profile.newPasswordPlaceholder": "Pelo menos 8 caracteres",
    "profile.passwordMinLength": "Use pelo menos 8 caracteres na nova senha.",
    "profile.passwordUnavailable": "A troca de senha precisa de um serviço de conta conectado.",
    "profile.changePassword": "Alterar senha",
    "settings.eyebrow": "PREFERÊNCIAS",
    "settings.title": "Configurações",
    "settings.introTitle": "Personalize o aplicativo",
    "settings.intro": "Escolha a aparência e o idioma usados no estoque.",
    "settings.appearance": "Aparência",
    "settings.appearanceHelp": "Escolha o tema de cores para todo o aplicativo.",
    "settings.dark": "Escuro",
    "settings.darkDescription": "Confortável para ambientes com pouca luz.",
    "settings.light": "Claro",
    "settings.lightDescription": "Um espaço de trabalho claro e iluminado.",
    "settings.language": "Idioma",
    "settings.languageHelp": "Escolha o idioma usado em todo o aplicativo.",
    "settings.english": "English",
    "settings.portuguese": "Português",
    "settings.appliedImmediately": "As preferências ficam salvas neste navegador e são aplicadas na hora.",
    "settings.reset": "Restaurar padrão",
    "settings.resetDone": "Preferências padrão restauradas.",
    "settings.resetHelp": "Voltar para inglês e tema escuro.",
    "login.title": "Entrar com e-mail",
    "login.email": "E-mail",
    "login.password": "Senha",
    "login.showPassword": "Mostrar senha",
    "login.forgot": "Esqueceu a senha?",
    "login.getStarted": "Entrar",
    "login.createAccount": "Criar uma conta",
    "login.footer": "Todos os direitos reservados 2026",
  },
};

function detectInitialSettings() {
  // Language: navigator.language (ex: "pt-BR", "en-US")
  const navLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  const language = navLang.startsWith("pt") ? "pt" : "en";

  // Theme: prefers-color-scheme media query
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = prefersDark ? "dark" : "light";

  return { language, theme };
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "null");
    if (saved) {
      return {
        language: saved.language === "pt" ? "pt" : "en",
        theme: saved.theme === "light" ? "light" : "dark",
      };
    }
  } catch {
    // Ignore parse errors
  }
  // First visit: detect from browser/OS
  return detectInitialSettings();
}

export function AppSettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.lang = settings.language === "pt" ? "pt-BR" : "en";
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Settings still work for the current session if storage is unavailable.
    }
  }, [settings]);

  const value = useMemo(() => ({
    ...settings,
    setLanguage: (language) => setSettings((current) => ({ ...current, language })),
    setTheme: (theme) => setSettings((current) => ({ ...current, theme })),
    resetSettings: () => setSettings({ language: "en", theme: "dark" }),
    t: (key, values = {}) => {
      let message = messages[settings.language][key] ?? messages.en[key] ?? key;
      for (const [name, replacement] of Object.entries(values)) {
        message = message.replaceAll(`{${name}}`, String(replacement));
      }
      return message;
    },
  }), [settings]);

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}


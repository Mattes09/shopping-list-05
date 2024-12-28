import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Add: "Add",
      "Add Item": "Add Item",
      "Add User": "Add User",
      "Add a new item": "Add a new item",
      "Add a new user": "Add a new user",
      "Add New List": "Add a new list",
      "Active Lists": "Active Lists",
      Archive: "Archive",
      Cancel: "Cancel",
      Close: "Close",
      "Current User": "Current User",
      Delete: "Delete",
      "Delete List": "Delete List",
      "Delete Shopping List": "Delete Shopping List",
      "Delete User": "Delete User",
      "Enter user name": "Enter user name",
      "Hide Resolved Items": "Hide Resolved Items",
      Items: "Items",
      Manage: "Manage",
      "Manage List": "Manage List",
      "Manage Members": "Manage Members",
      "No users in the list.": "No users in the list.",
      Owner: "Owner",
      "Show Resolved Items": "Show Resolved Items",
      "Shopping List": "Shopping List",
      "Shopping Lists": "Shopping Lists",
      View: "View",
      "Are you sure you want to delete the shopping list":
        "Are you sure you want to delete the shopping list",
    },
  },
  sk: {
    translation: {
      Add: "Pridať",
      "Add Item": "Pridať položku",
      "Add User": "Pridať používateľa",
      "Add a new item": "Pridať novú položku",
      "Add New List": "Vytvoriť nový zoznam",
      "Add a new user": "Pridať nového používateľa",
      "Active Lists": "Aktívne Zoznamy",
      Archive: "Archivovať",
      "Archived List": "Archivované zoznamy",
      Cancel: "Zrušiť",
      Close: "Zavrieť",
      "Current User": "Aktuálny Používateľ",
      Delete: "Zmazať",
      "Delete List": "Vymazať zoznam",
      "Delete Shopping List": "Vymazať zoznam nákupov",
      "Delete User": "Vymazať používateľa",
      "Enter user name": "Zadajte meno používateľa",
      "Hide Resolved Items": "Skryť vyriešené položky",
      Items: "Položky",
      Manage: "Spravovať",
      "Manage List": "Spravovať zoznam",
      "Manage Members": "Spravovať členov",
      "No users in the list.": "Žiadni používatelia v zozname.",
      Owner: "Vlastník",
      "Show Resolved Items": "Zobraziť vyriešené položky",
      "Shopping List": "Zoznam Nákupov",
      "Shopping Lists": "Zoznamy Nákupov",
      View: "Zobraziť",
      "Are you sure you want to delete the shopping list":
        "Ste si istí, že chcete vymazať zoznam nákupov",
    },
  },
};

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;

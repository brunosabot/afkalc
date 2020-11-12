# Afkalc

## Usage

```shell
yarn
yarn start
```

## Dev guide

### Add a translation

#### Step 1: Configure the new language

In `main.tsx`, you need to activate the language for two concepts :

- The date library `dayjs`
- The app i18n with `i18next`

To add a language for `dayjs`, you just need to add the language import at the top of the document. Exemple adding french:

```javascript
import "dayjs/locale/fr";
```

To add a language for `i18next`, you need to update the arrays in the `whitelist` feature of the configuration.

Exemple adding french:

```diff
-const languages = ["en"];
+const languages = ["en", "fr"];
```

#### Step 2: Add the quick language change

In both `Menu.tsx` and `Home.tsx`, you need to add a new quick language change button.

Simply add a new `<LangButton>` component with a `lang` attribute corresponding to the code and an `emoji` flag for the country.

Exemple adding french:

```jsx
<LangButton lang="fr" emoji="🇫🇷" />
```

#### Step 3: Add the translations

In the `public/locales` folder, add a new folder with you new langage.

Then, copy all the files from the `en` folder into you newly created file and update them with the proper translated strings

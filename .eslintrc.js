module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "prettier",
    "plugin:prettier/recommended",
    "standard-with-typescript",
    "plugin:react/recommended"
  ],
  "ignorePatterns": ['dist', '.eslintrc.js', 'node_modules'],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": './tsconfig.json',
    "tsconfigRootDir": __dirname,
  },
  "plugins": [
    "react",
    "prettier",
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/member-delimiter-style": [
      "warn",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        }
      }
    ]
  },
  "settings": {
    "react": {
      "version": "detect",
    },
  },
}

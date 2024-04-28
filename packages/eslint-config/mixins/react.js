module.exports = {
  // 플러그인 문서:
  // https://www.npmjs.com/package/eslint-plugin-react
  // https://github.com/ArnaudBarre/eslint-plugin-react-refresh
  plugins: ["react", "react-refresh"],
  // 추천 규칙
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],

  settings: {
    react: {
      // 현재 React 버전을 명시합니다.
      // 명시하지 않을 경우(기본값 'detect') React 라이브러리 전체를 불러오므로
      // 린트 과정에서 속도가 느려질 수 있습니다.
      version: "18.2",
    },
  },

  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      rules: {
        "react-refresh/only-export-components": "off",
      },
    },
  ],

  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    // DOM에 정의되지 않은 속성을 사용했는지 체크 (emotion css 속성 등 예외 케이스가 있으므로 기본은 off)
    "react/no-unknown-property": "off",
    // 정의한 props 중에 빠진게 있는지 체크 (NextPage 등 일부 추상화 컴포넌트에서 복잡해지므로 기본은 off)
    "react/prop-types": "off",
  },
};

module.exports = {
  extends: [
    // ✅ (필수) rushstack 컨피그를 가져옵니다.
    '@rushstack/eslint-config/profile/web-app',
  ],
  rules: {
    // 필요한 커스텀 규칙을 여기에 정의합니다.
    '@typescript-eslint/explicit-function-return-type': 'off',
    // any 허용
    '@typescript-eslint/no-explicit-any': 'off',
    // 타입 추론 허용
    '@rushstack/typedef-var': 'off',
    // 선언전에 사용가능
    '@typescript-eslint/no-use-before-define': 'off',
  },
  settings: {
    // 공통으로 넣고 싶은 설정이 있으면 추가합니다.
  },
};

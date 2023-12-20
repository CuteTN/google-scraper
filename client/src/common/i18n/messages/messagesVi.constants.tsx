import { TranslationMap } from "./TranslationMap.model";

export const messagesVi: TranslationMap = {
  languageName: "Tiếng Việt",
  languageImgSrc: "https://cdn.ipregistry.co/flags/noto/vn.png",
  common: {
    language: "ngôn ngữ",
    theme: "giao diện",
    lightTheme: "Giao diện Sáng",
    darkTheme: "Giao diện Tối",
    msgThemeName: "Giao diện {name}",
    please: "vui lòng",
    signIn: "đăng nhập",
    signUp: "đăng ký",
    toContinue: "để tiếp tục",
    password: "mật khẩu",
    username: "tên đăng nhập",
    alreadyHaveAccount: "Đã có tài khoản đăng nhập",
    createNewAccount: "Tạo tài khoản mới",
    ok: "OK",
    error: "lỗi",
  },
  errorMessages: {
    usernameIsRequired: "Vui lòng điền tên đăng nhập.",
    passwordIsRequired: "Vui lòng điền mật khẩu.",
  },
};

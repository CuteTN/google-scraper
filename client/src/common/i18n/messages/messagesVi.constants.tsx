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
    signOut: "đăng xuất",
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
  searchResult: {
    keyword: "từ khoá",
    adwordsCount: "tổng số quảng cáo",
    linksCount: "tổng số liên kết",
    resultsCount: "tổng số kết quả",
    pending: "đang chờ",
    viewHtml: "xem HTML",
    searchByKeyword: "Tìm kiếm từ khoá",
    rowPerPage: "Giới hạn số dòng",
  }
};

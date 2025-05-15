// Auth.js
const handleSubmit = async () => {
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (isLogin) {
    // ↓ 将来的にサーバーに送信してログイン認証
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password: pass }),
    // });
    // const result = await res.json();
    // if (result.success) onLogin(email);

    // 今はローカル確認
    if (users[email] && users[email] === pass) {
      onLogin(email);
    } else {
      alert("ログイン失敗：メールアドレスまたはパスワードが間違っています");
    }
  } else {
    if (users[email]) {
      alert("すでに登録されています");
    } else {
      // ↓ 将来的にサーバーに送信してユーザー登録
      // await fetch("/api/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password: pass }),
      // });

      // 今はローカル登録
      users[email] = pass;
      localStorage.setItem("users", JSON.stringify(users));
      alert("登録完了！ログインしてください");
      setIsLogin(true);
    }
  }
};

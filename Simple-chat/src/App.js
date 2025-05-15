import React, { useState } from "react";
import Auth from "./Auth";
import Chat from "./Chat";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user ? <Chat user={user} /> : <Auth onLogin={setUser} />}
    </div>
  );
}

export default App;

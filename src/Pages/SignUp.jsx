import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/app/");
  }

  return (
    <div className="flex justify-center items-center bg-[#f5f5f5] min-h-screen">
      <div className="p-10 bg-white">
        <p className="text-center mb-6 font-semibold text-[#333333] text-2xl">Sign up</p>
        <p className="mb-4 text-lg text-[#333333]">
          Create your account by selecting a username and <br />password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <p className="mb-1 text-xl text-[#333333]">Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-5 px-4 w-full border rounded bg-transparent"
            />
          </div>
          <div className="form-group relative">
            <p className="mb-1 text-xl text-[#333333]">Choose password</p>
            <input
              type={type}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-5 px-4 w-full border rounded bg-transparent"
            />
            {type === "password" ? <BiShow onClick={() => setType("text")} className="absolute top-[3.6rem] right-4 cursor-pointer"/> : <BiHide onClick={() => setType("password")} className="absolute top-[3.6rem] right-4 cursor-pointer"/>}
          </div>
          <div className="text-center mt-12">
            <button className="px-10 py-2 text-base bg-[#25D366] rounded text-white">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

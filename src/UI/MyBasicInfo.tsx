import { FormEvent, useState } from "react";

const MyBasicInfo = (user: User) => {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address ?? "");

  const [nameButton, setNameButton] = useState(false);
  const [addressChange, setAddressChange] = useState(false);

  const FormHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="">
      {!nameButton ? (
        <div
          className="font-bold text-2xl bg-transparent text-black "
          onClick={() => setNameButton(true)}
        >
          Hi, {user.name}
        </div>
      ) : (
        <form action="" onSubmit={FormHandler}>
          <label htmlFor="">이름</label>
          <div className="flex gap-x-2.5">
            <input
              type="text"
              className="max-w-60"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user.name}
            />
            <button
              className="text-sm bg-gray-50 text-black  "
              onClick={() => setNameButton(false)}
            >
              취소
            </button>
          </div>
        </form>
      )}
      <p>{user.email}</p>
      <p>{user.uid}</p>
    </div>
  );
};
export default MyBasicInfo;

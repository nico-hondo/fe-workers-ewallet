import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  LuMail,
  LuPhone,
  LuSquarePen,
  LuTrash2,
  LuUser,
  LuUsersRound,
} from "react-icons/lu";
import ChangePinModal from "../modals/ChangePinModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import {
  deleteAvatar,
  getProfile,
  updateProfile,
} from "../redux/slice/userSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [changePassModal, setChangePassModal] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleInput = (event) => {
    const { name, value, files } = event.target;
    if (name === "avatar_url") {
      const file = files?.[0];
      if (!file) return;
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewAvatar(reader.result);
      reader.readAsDataURL(file);
      return;
    }
    setFormData((current) => ({
      fullname: current?.fullname ?? profile?.fullName ?? "",
      phone: current?.phone ?? profile?.phone ?? "",
      email: current?.email ?? profile?.email ?? "",
      [name]: value,
    }));
  };

  const handleDeleteAvatar = async () => {
    if (avatarFile) {
      setAvatarFile(null);
      setPreviewAvatar(null);
      const input = document.getElementById("avatar");
      if (input) input.value = "";
      return;
    }

    if (profile?.avatar) {
      try {
        await dispatch(deleteAvatar()).unwrap();
        toast.success("Avatar berhasil dihapus.");
      } catch (requestError) {
        toast.error(requestError || "Gagal menghapus avatar.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentFormData = formData || {
      fullname: profile?.fullName || "",
      phone: profile?.phone || "",
      email: profile?.email || "",
    };
    const payload = new FormData();
    payload.append("fullname", currentFormData.fullname.trim());
    payload.append("phone", currentFormData.phone.trim());
    payload.append("email", currentFormData.email.trim());
    if (avatarFile) payload.append("avatar_url", avatarFile);

    try {
      await dispatch(updateProfile(payload)).unwrap();
      await dispatch(getProfile()).unwrap();
      setAvatarFile(null);
      setPreviewAvatar(null);
      toast.success("Profil berhasil diperbarui.");
    } catch (requestError) {
      toast.error(requestError || "Gagal memperbarui profil.");
    }
  };

  const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const storedAvatar = profile?.avatar
    ? `${apiBaseUrl}/${profile.avatar.replace(/^\/+/, "")}`
    : null;

  return (
    <main className="flex flex-col md:gap-6 md:px-10 md:py-7">
      <div className="hidden md:flex gap-3 items-center">
        <LuUsersRound className="text-xl text-blue-500" />
        <p className="text-lg font-montserrat font-bold">Profile</p>
      </div>
      <header className="shrink-0 bg-brand-primary p-3 text-white lg:hidden">
        Profile
      </header>
      <div className="flex flex-col gap-5 p-6 md:border border-gray-200">
        <h2 className="font-montserrat font-medium lg:font-semibold text-lg">
          Profile Picture
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="border rounded-lg border-gray-300">
              <img
                className="w-30 h-20 md:w-40 md:h-30 lg:w-50 lg:h-40"
                src={previewAvatar || storedAvatar || "/profile-default.svg"}
                alt="default user"
              />
            </div>
            <div className="w-full flex flex-col gap-2 sm:max-w-3xs">
              <label
                htmlFor="avatar"
                className="font-montserrat flex items-center justify-center gap-2 cursor-pointer px-4 py-2 md:py-2.5 border w-full rounded-lg text-white bg-blue-700"
              >
                <LuSquarePen className="text-sm" />
                <span className="text-sm font-montserrat">Change Image</span>
                <input
                  hidden
                  onChange={handleInput}
                  type="file"
                  id="avatar"
                  name="avatar_url"
                  accept="image/jpeg,image/png"
                />
              </label>
              <button
                type="button"
                onClick={handleDeleteAvatar}
                className="font-montserrat flex items-center justify-center gap-2 cursor-pointer px-4 py-1 md:py-2.5  border w-full rounded-lg border-brand-red text-brand-red"
              >
                <LuTrash2 className="text-sm" />
                <span className="text-sm font-montserrat">Delete Image</span>
              </button>
            </div>
          </div>
          <p className="text-sm py-2 text-gray-500 font-montserrat ">
            The Profile Picture must be 512 x 512 pixels or less
          </p>
          <div className="relative flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium font-montserrat"
            >
              Full Name
            </label>

            <div className="relative">
              <LuUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3.5 placeholder:text-gray-300"
                type="text"
                id="fullName"
                placeholder="Enter Full Name"
                name="fullname"
                value={formData?.fullname ?? profile?.fullName ?? ""}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="relative flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium font-montserrat"
            >
              Phone
            </label>
            <div className="relative">
              <LuPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3.5 placeholder:text-gray-300"
                type="tel"
                id="phone"
                placeholder="Include 62, ex: 6281374890022"
                name="phone"
                value={formData?.phone ?? profile?.phone ?? ""}
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="relative flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium font-montserrat"
            >
              Email
            </label>

            <div className="relative">
              <LuMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                className={`w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3.5 placeholder:text-gray-300 ${
                  profile?.email
                    ? "cursor-not-allowed bg-gray-100 text-gray-500"
                    : ""
                }`}
                type="email"
                id="email"
                placeholder="Enter Email"
                name="email"
                value={formData?.email ?? profile?.email ?? ""}
                onChange={handleInput}
                disabled={Boolean(profile?.email)}
              />
            </div>
          </div>
          <div className="py-2">
            <p>Password</p>
            <button
              type="button"
              onClick={() => setChangePassModal(true)}
              className="text-blue-800 pt-2 cursor-pointer hover:text-blue-500"
            >
              Change Password
            </button>
          </div>
          <div className="py-2">
            <p>Pin</p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setShow("change")}
                className="text-blue-800 pt-2 cursor-pointer hover:text-blue-500"
              >
                Change PIN
              </button>
            </div>
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 w-full text-white rounded-md px-4 py-1.5 cursor-pointer disabled:opacity-60"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
        <ChangePasswordModal
          isShowModal={changePassModal}
          setShowModal={setChangePassModal}
        />
        <ChangePinModal
          isShowModal={Boolean(show)}
          setIsShowModal={(isOpen) => setShow(isOpen ? show : false)}
          mode={show || "change"}
        />
      </div>
    </main>
  );
}

export default EditProfile;
